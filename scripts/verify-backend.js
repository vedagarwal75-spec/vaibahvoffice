/* One-off backend check: read Products, append+read+delete a test Enquiry. */
const fs = require('fs');
const path = require('path');
const { JWT } = require('google-auth-library');

function loadEnv(file) {
  const out = {}; const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  let key = null, val = '', q = false;
  for (const line of lines) {
    if (!q) { const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/); if (!m) continue; key = m[1]; let v = m[2];
      if (v.startsWith('"') && !(v.endsWith('"') && v.length > 1)) { q = true; val = v.slice(1); } else out[key] = v.replace(/^"|"$/g, ''); }
    else if (line.endsWith('"')) { val += '\n' + line.slice(0, -1); out[key] = val; q = false; } else val += '\n' + line;
  }
  return out;
}
const env = loadEnv(path.join(__dirname, '..', '.env.local'));
const ID = env.GOOGLE_SHEET_ID, EMAIL = env.GOOGLE_CLIENT_EMAIL, KEY = (env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
const API = 'https://sheets.googleapis.com/v4/spreadsheets';

(async () => {
  const auth = new JWT({ email: EMAIL, key: KEY, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const { token } = await auth.getAccessToken();
  const H = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const j = async (r) => { const t = await r.text(); if (!r.ok) throw new Error(`${r.status} ${t}`); return t ? JSON.parse(t) : {}; };

  // READ products
  const pv = await j(await fetch(`${API}/${ID}/values/${encodeURIComponent('Products!A1:L2000')}`, { headers: H }));
  const rows = pv.values || [];
  console.log(`READ  Products: ${rows.length - 1} product rows (header: ${rows[0].slice(0, 5).join(', ')} …)`);
  console.log(`      sample: ${rows[1][1]} | ${rows[1][2]} | ${rows[1][3]}`);

  // WRITE a test enquiry
  const testRow = [new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }), 'Quote', 'BACKEND TEST — safe to ignore', 'Test Co', '9999999999', 'test@example.com', '500 kg', 'Basmati Rice', 'Automated connectivity test', '', 'verify-script', 'New'];
  const before = (await j(await fetch(`${API}/${ID}/values/${encodeURIComponent('Enquiries!A:A')}`, { headers: H }))).values?.length || 0;
  await j(await fetch(`${API}/${ID}/values/${encodeURIComponent('Enquiries!A1')}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, { method: 'POST', headers: H, body: JSON.stringify({ values: [testRow] }) }));
  const enq = await j(await fetch(`${API}/${ID}/values/${encodeURIComponent('Enquiries!A1:L1000')}`, { headers: H }));
  const written = enq.values[enq.values.length - 1];
  console.log(`WRITE Enquiries: appended row ${enq.values.length} -> [${written[1]}] ${written[2]} @ ${written[0]}`);

  // DELETE the test row to keep the sheet clean
  const meta = await j(await fetch(`${API}/${ID}?fields=sheets(properties(sheetId,title))`, { headers: H }));
  const enqId = meta.sheets.find((s) => s.properties.title === 'Enquiries').properties.sheetId;
  const rowIndex = enq.values.length - 1; // 0-based
  await j(await fetch(`${API}/${ID}:batchUpdate`, { method: 'POST', headers: H, body: JSON.stringify({ requests: [{ deleteDimension: { range: { sheetId: enqId, dimension: 'ROWS', startIndex: rowIndex, endIndex: rowIndex + 1 } } }] }) }));
  console.log('CLEAN Enquiries: test row deleted — sheet left clean.');
  console.log('\n✅ Backend verified: products read + enquiries write both work with the dedicated service account.');
})().catch((e) => { console.error('VERIFY FAILED:', e.message); process.exit(1); });
