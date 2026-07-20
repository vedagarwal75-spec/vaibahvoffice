/*
 * One-time (idempotent) setup for the "Shubham Trading Company — Website Data" sheet.
 *
 *   npm run sheet:setup
 *
 * Reads creds + sheet id from .env.local, then:
 *   • ensures a "Products" and an "Enquiries" tab exist
 *   • writes the column headers + all products from data/products.json
 *   • formats the header rows and adds TRUE/FALSE checkboxes for featured/visible
 *
 * Safe to re-run: it overwrites the Products/Enquiries header + product rows,
 * but never touches the Enquiries data rows.
 */
const fs = require('fs');
const path = require('path');
const { JWT } = require('google-auth-library');

// ── load .env.local ──
function loadEnv(file) {
  const out = {};
  if (!fs.existsSync(file)) return out;
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  let key = null, val = '', inQuote = false;
  for (const line of lines) {
    if (!inQuote) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
      if (!m) continue;
      key = m[1];
      let v = m[2];
      if (v.startsWith('"') && !(v.endsWith('"') && v.length > 1)) { inQuote = true; val = v.slice(1); }
      else out[key] = v.replace(/^"|"$/g, '');
    } else if (line.endsWith('"')) { val += '\n' + line.slice(0, -1); out[key] = val; inQuote = false; }
    else val += '\n' + line;
  }
  return out;
}

const env = loadEnv(path.join(__dirname, '..', '.env.local'));
const SHEET_ID = env.GOOGLE_SHEET_ID;
const CLIENT_EMAIL = env.GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = (env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
if (!SHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
  console.error('Missing GOOGLE_SHEET_ID / GOOGLE_CLIENT_EMAIL / GOOGLE_PRIVATE_KEY in .env.local');
  process.exit(1);
}

const HEADERS = ['slug', 'name', 'category', 'origin', 'shortDescription', 'keywords', 'longDescription', 'packaging', 'image', 'featured', 'visible', 'order'];
const ENQ_HEADERS = ['Timestamp', 'Type', 'Name', 'Company', 'Phone', 'Email', 'Volume', 'Product', 'Message', 'Rating', 'Source', 'Status'];

const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf8'));
const rows = products.map((p, i) => [
  p.slug, p.name, p.category, p.origin, p.shortDescription,
  (p.keywords || []).join(', '), p.longDescription || '',
  p.packaging || 'Available in bulk (25kg / 50kg)', p.image || '',
  i < 8 ? 'TRUE' : 'FALSE', 'TRUE', String(i + 1),
]);

const API = 'https://sheets.googleapis.com/v4/spreadsheets';

async function main() {
  const auth = new JWT({ email: CLIENT_EMAIL, key: PRIVATE_KEY, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const { token } = await auth.getAccessToken();
  const H = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const j = async (r) => { const t = await r.text(); if (!r.ok) throw new Error(`${r.status} ${t}`); return t ? JSON.parse(t) : {}; };

  // 1. inspect tabs
  let meta = await j(await fetch(`${API}/${SHEET_ID}?fields=sheets(properties(sheetId,title,index))`, { headers: H }));
  const byTitle = new Map(meta.sheets.map((s) => [s.properties.title, s.properties]));

  const requests = [];
  if (!byTitle.has('Products')) {
    const sheet1 = meta.sheets.find((s) => /^Sheet1$/i.test(s.properties.title));
    if (sheet1) requests.push({ updateSheetProperties: { properties: { sheetId: sheet1.properties.sheetId, title: 'Products' }, fields: 'title' } });
    else requests.push({ addSheet: { properties: { title: 'Products' } } });
  }
  if (!byTitle.has('Enquiries')) requests.push({ addSheet: { properties: { title: 'Enquiries' } } });
  if (requests.length) {
    await j(await fetch(`${API}/${SHEET_ID}:batchUpdate`, { method: 'POST', headers: H, body: JSON.stringify({ requests }) }));
    meta = await j(await fetch(`${API}/${SHEET_ID}?fields=sheets(properties(sheetId,title))`, { headers: H }));
  }
  const ids = new Map(meta.sheets.map((s) => [s.properties.title, s.properties.sheetId]));
  const prodId = ids.get('Products'), enqId = ids.get('Enquiries');

  // 2. write values
  await j(await fetch(`${API}/${SHEET_ID}/values/${encodeURIComponent('Products!A1')}?valueInputOption=USER_ENTERED`, {
    method: 'PUT', headers: H, body: JSON.stringify({ values: [HEADERS, ...rows] }),
  }));
  // only write Enquiries header if the tab is empty
  const enqVals = await j(await fetch(`${API}/${SHEET_ID}/values/${encodeURIComponent('Enquiries!A1:L1')}`, { headers: H }));
  if (!enqVals.values || enqVals.values.length === 0) {
    await j(await fetch(`${API}/${SHEET_ID}/values/${encodeURIComponent('Enquiries!A1')}?valueInputOption=USER_ENTERED`, {
      method: 'PUT', headers: H, body: JSON.stringify({ values: [ENQ_HEADERS] }),
    }));
  }

  // 3. formatting
  const headerFmt = (sid) => ({
    repeatCell: {
      range: { sheetId: sid, startRowIndex: 0, endRowIndex: 1 },
      cell: { userEnteredFormat: { backgroundColor: { red: 0.086, green: 0.176, blue: 0.122 }, textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } } } },
      fields: 'userEnteredFormat(backgroundColor,textFormat)',
    },
  });
  const freeze = (sid) => ({ updateSheetProperties: { properties: { sheetId: sid, gridProperties: { frozenRowCount: 1 } }, fields: 'gridProperties.frozenRowCount' } });
  const checkbox = (sid, colIdx) => ({
    setDataValidation: {
      range: { sheetId: sid, startRowIndex: 1, startColumnIndex: colIdx, endColumnIndex: colIdx + 1 },
      rule: { condition: { type: 'BOOLEAN' }, strict: true },
    },
  });
  await j(await fetch(`${API}/${SHEET_ID}:batchUpdate`, {
    method: 'POST', headers: H,
    body: JSON.stringify({ requests: [headerFmt(prodId), freeze(prodId), headerFmt(enqId), freeze(enqId), checkbox(prodId, 9), checkbox(prodId, 10)] }),
  }));

  console.log(`✅ Sheet ready: ${products.length} products written to "Products", "Enquiries" tab prepared.`);
  console.log(`   https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`);
}
main().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
