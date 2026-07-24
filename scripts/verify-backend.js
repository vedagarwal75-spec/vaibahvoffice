/* Backend check for the new schema: read Products, write+read+delete a test
 * Enquiry and a test Review. No emails are sent. Leaves the sheet clean. */
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
  const read = async (range) => (await j(await fetch(`${API}/${ID}/values/${encodeURIComponent(range)}`, { headers: H }))).values || [];
  const append = async (tab, row) => j(await fetch(`${API}/${ID}/values/${encodeURIComponent(tab + '!A1')}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, { method: 'POST', headers: H, body: JSON.stringify({ values: [row] }) }));
  const meta = await j(await fetch(`${API}/${ID}?fields=sheets(properties(sheetId,title))`, { headers: H }));
  const sid = Object.fromEntries(meta.sheets.map((s) => [s.properties.title, s.properties.sheetId]));
  const delRow = async (tab, idx0) => j(await fetch(`${API}/${ID}:batchUpdate`, { method: 'POST', headers: H, body: JSON.stringify({ requests: [{ deleteDimension: { range: { sheetId: sid[tab], dimension: 'ROWS', startIndex: idx0, endIndex: idx0 + 1 } } }] }) }));

  const prod = await read('Products!A1:H2000');
  console.log(`READ  Products: ${prod.length - 1} rows | headers: ${prod[0].join(' · ')}`);
  console.log(`      sample: ${prod[1][0]} → category "${prod[1][1]}"`);

  await (append('Enquiries', [new Date().toISOString(), 'Quote', 'BACKEND TEST', 'Test Co', '9999999999', '', '500 kg', 'Basmati Rice', 'ignore', 'FALSE']));
  let enq = await read('Enquiries!A1:J1000');
  console.log(`WRITE Enquiries: row ${enq.length} → [${enq[enq.length - 1][1]}] ${enq[enq.length - 1][2]}`);
  await delRow('Enquiries', enq.length - 1);

  await (append('Reviews', [new Date().toISOString(), 'BACKEND TEST', 'Test Co', '5', 'ignore', 'FALSE']));
  let rev = await read('Reviews!A1:F1000');
  console.log(`WRITE Reviews: row ${rev.length} → ${rev[rev.length - 1][1]} (${rev[rev.length - 1][3]}★)`);
  await delRow('Reviews', rev.length - 1);

  console.log('CLEAN test rows deleted.\n✅ New schema verified: Products read + Enquiries/Reviews write all work.');
})().catch((e) => { console.error('VERIFY FAILED:', e.message); process.exit(1); });
