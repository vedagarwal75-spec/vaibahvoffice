/*
 * Sets up the "Shubham Trading Company — Website Data" sheet (idempotent).
 *   npm run sheet:setup
 *
 * Tabs created/formatted:
 *   Products   — Name | Category(dropdown) | Origin | Description | Photo URL |
 *                Keywords | Show on website(✓) | Feature on homepage(✓)
 *   Categories — Category | Description   (drives the Products dropdown)
 *   Enquiries  — Date | Type | Name | Company | Phone | Email | Volume |
 *                Product | Message | Reverted(✓)   (clean, no stray colour)
 *   Reviews    — Date | Name | Company | Rating(1-5) | Comment | Approved(✓)
 */
const fs = require('fs');
const path = require('path');
const { JWT } = require('google-auth-library');

function loadEnv(file) {
  const out = {}; if (!fs.existsSync(file)) return out;
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  let key = null, val = '', q = false;
  for (const line of lines) {
    if (!q) { const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/); if (!m) continue; key = m[1]; let v = m[2];
      if (v.startsWith('"') && !(v.endsWith('"') && v.length > 1)) { q = true; val = v.slice(1); } else out[key] = v.replace(/^"|"$/g, ''); }
    else if (line.endsWith('"')) { val += '\n' + line.slice(0, -1); out[key] = val; q = false; } else val += '\n' + line;
  }
  return out;
}
const env = loadEnv(path.join(__dirname, '..', '.env.local'));
const SHEET_ID = env.GOOGLE_SHEET_ID, EMAIL = env.GOOGLE_CLIENT_EMAIL, KEY = (env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
if (!SHEET_ID || !EMAIL || !KEY) { console.error('Missing GOOGLE_* in .env.local'); process.exit(1); }

const CATEGORIES = [
  ['Rice', 'Bulk & wholesale rice — Basmati, Sona Masuri, Govindbhog, Joha and regional varieties.'],
  ['Grains', 'Wholesale food grains — Sharbati wheat, maize (makki), buckwheat.'],
  ['Millets', 'Bulk millets — Bajra, Jowar, Ragi and other ancient grains.'],
  ['Whole Spices', 'Whole spices (sabut masala) — pepper, cardamom, cloves, saffron and more.'],
  ['Ground Spices & Powders', 'Ground masala powders — turmeric, cumin, coriander, chilli powders.'],
  ['Pulses & Legumes', 'Dals and legumes — toor, chana, moong, urad, masoor, rajma, chana.'],
  ['Seeds & Superfoods', 'Edible seeds & superfoods — chia, sesame, makhana, magaz, kalonji.'],
  ['Dried Herbs & Seasonings', 'Dried herbs — oregano, parsley, basil, chilli flakes.'],
  ['Dried Chillies & Regional Specialities', 'Dried chillies & specialities — bhut jolokia, mathania, kokum, ker sangri.'],
  ['Dry Fruits & Nuts', 'Dry fruits & nuts — almonds, cashews, walnuts, pistachios, raisins, figs.'],
];

const PRODUCT_HEADERS = ['Name', 'Category', 'Origin', 'Description', 'Photo URL', 'Keywords', 'Show on website', 'Feature on homepage'];
const ENQ_HEADERS = ['Date', 'Type', 'Name', 'Company', 'Phone', 'Email', 'Volume', 'Product', 'Message', 'Reverted'];
const REVIEW_HEADERS = ['Date', 'Name', 'Company', 'Rating', 'Comment', 'Approved'];

// Header notes (help text) shown when you hover a column header.
const PRODUCT_NOTES = [
  'The product name. This becomes the product page title and web address.',
  'Pick from the dropdown. The list comes from the "Categories" tab.',
  'State / region the item is sourced from (shown as the origin tag).',
  'One-line description shown on the product card and page.',
  'OPTIONAL. Paste an image link or a Google Drive share link to set the photo. Leave blank to use the built-in photo.',
  'Extra words people might search on Google for this item (e.g. "haldi, turmeric powder wholesale"). Separate with commas. Helps the page get found.',
  'Tick = the product shows on the website. Untick = hidden (without deleting it).',
  'Tick = also featured on the homepage.',
];

const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf8'));
const productRows = products.map((p) => [
  p.name, p.category, p.origin, p.description || '', p.photoUrl || '',
  Array.isArray(p.keywords) ? p.keywords.join(', ') : (p.keywords || ''),
  p.showOnWebsite === false ? 'FALSE' : 'TRUE', p.featured ? 'TRUE' : 'FALSE',
]);

const API = 'https://sheets.googleapis.com/v4/spreadsheets';
const GREEN = { red: 0.086, green: 0.176, blue: 0.122 };
const WHITE = { red: 1, green: 1, blue: 1 };

(async () => {
  const auth = new JWT({ email: EMAIL, key: KEY, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const { token } = await auth.getAccessToken();
  const H = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const j = async (r) => { const t = await r.text(); if (!r.ok) throw new Error(`${r.status} ${t}`); return t ? JSON.parse(t) : {}; };
  const put = async (range, values) => j(await fetch(`${API}/${SHEET_ID}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`, { method: 'PUT', headers: H, body: JSON.stringify({ values }) }));

  // 1. ensure tabs
  let meta = await j(await fetch(`${API}/${SHEET_ID}?fields=sheets(properties(sheetId,title))`, { headers: H }));
  const titles = new Set(meta.sheets.map((s) => s.properties.title));
  const reqs = [];
  const want = ['Products', 'Categories', 'Enquiries', 'Reviews'];
  if (!titles.has('Products')) {
    const s1 = meta.sheets.find((s) => /^Sheet1$/i.test(s.properties.title));
    if (s1) reqs.push({ updateSheetProperties: { properties: { sheetId: s1.properties.sheetId, title: 'Products' }, fields: 'title' } });
    else reqs.push({ addSheet: { properties: { title: 'Products' } } });
  }
  for (const t of want) if (t !== 'Products' && !titles.has(t)) reqs.push({ addSheet: { properties: { title: t } } });
  if (reqs.length) { await j(await fetch(`${API}/${SHEET_ID}:batchUpdate`, { method: 'POST', headers: H, body: JSON.stringify({ requests: reqs }) }));
    meta = await j(await fetch(`${API}/${SHEET_ID}?fields=sheets(properties(sheetId,title))`, { headers: H })); }
  const id = Object.fromEntries(meta.sheets.map((s) => [s.properties.title, s.properties.sheetId]));

  // 1b. fully clear the Products tab (it is regenerated) — wipes the old
  // columns, checkboxes and any stray formatting/colour from earlier runs.
  await j(await fetch(`${API}/${SHEET_ID}:batchUpdate`, { method: 'POST', headers: H, body: JSON.stringify({ requests: [
    { updateCells: { range: { sheetId: id.Products, startRowIndex: 0, endRowIndex: 1000, startColumnIndex: 0, endColumnIndex: 26 }, fields: 'userEnteredValue,dataValidation,userEnteredFormat' } },
  ] }) }));

  // 1c. If Enquiries/Reviews have no real data yet, wipe any stray rows /
  // validation left by earlier runs (never touches real logged data).
  for (const tab of ['Enquiries', 'Reviews']) {
    const chk = await j(await fetch(`${API}/${SHEET_ID}/values/${encodeURIComponent(`${tab}!C2:C1000`)}`, { headers: H }));
    const hasData = (chk.values || []).some((r) => (r[0] || '').trim());
    if (!hasData) {
      await j(await fetch(`${API}/${SHEET_ID}:batchUpdate`, { method: 'POST', headers: H, body: JSON.stringify({ requests: [
        { updateCells: { range: { sheetId: id[tab], startRowIndex: 1, endRowIndex: 1000, startColumnIndex: 0, endColumnIndex: 26 }, fields: 'userEnteredValue,dataValidation,userEnteredFormat' } },
      ] }) }));
    }
  }

  // 2. write values
  await put('Categories!A1', [['Category', 'Description'], ...CATEGORIES]);
  await put('Products!A1', [PRODUCT_HEADERS, ...productRows]);
  await put('Enquiries!A1', [ENQ_HEADERS]);
  await put('Reviews!A1', [REVIEW_HEADERS]);
  // clear any stale rows below the product list
  await j(await fetch(`${API}/${SHEET_ID}/values/${encodeURIComponent(`Products!A${productRows.length + 2}:H2000`)}:clear`, { method: 'POST', headers: H, body: '{}' }));

  const lastProd = productRows.length + 1; // 1-based last product row
  const headerFmt = (sid, cols) => ({ repeatCell: { range: { sheetId: sid, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: cols }, cell: { userEnteredFormat: { backgroundColor: GREEN, textFormat: { bold: true, foregroundColor: WHITE }, verticalAlignment: 'MIDDLE' } }, fields: 'userEnteredFormat(backgroundColor,textFormat,verticalAlignment)' } });
  const freeze = (sid) => ({ updateSheetProperties: { properties: { sheetId: sid, gridProperties: { frozenRowCount: 1 } }, fields: 'gridProperties.frozenRowCount' } });
  const whiteRows = (sid, cols, from = 1, to = 1000) => ({ repeatCell: { range: { sheetId: sid, startRowIndex: from, endRowIndex: to, startColumnIndex: 0, endColumnIndex: cols }, cell: { userEnteredFormat: { backgroundColor: WHITE, textFormat: { foregroundColor: { red: 0.1, green: 0.1, blue: 0.1 }, bold: false } } }, fields: 'userEnteredFormat(backgroundColor,textFormat)' } });
  const checkbox = (sid, col, from, to) => ({ setDataValidation: { range: { sheetId: sid, startRowIndex: from, endRowIndex: to, startColumnIndex: col, endColumnIndex: col + 1 }, rule: { condition: { type: 'BOOLEAN' }, strict: true } } });
  const clearValidation = (sid, col, from, to) => ({ setDataValidation: { range: { sheetId: sid, startRowIndex: from, endRowIndex: to, startColumnIndex: col, endColumnIndex: col + 1 } } });
  const listRange = (sid, col, from, to, ref) => ({ setDataValidation: { range: { sheetId: sid, startRowIndex: from, endRowIndex: to, startColumnIndex: col, endColumnIndex: col + 1 }, rule: { condition: { type: 'ONE_OF_RANGE', values: [{ userEnteredValue: ref }] }, showCustomUi: true, strict: false } } });
  const listVals = (sid, col, from, to, vals) => ({ setDataValidation: { range: { sheetId: sid, startRowIndex: from, endRowIndex: to, startColumnIndex: col, endColumnIndex: col + 1 }, rule: { condition: { type: 'ONE_OF_LIST', values: vals.map((v) => ({ userEnteredValue: v })) }, showCustomUi: true, strict: false } } });
  const notes = (sid, arr) => ({ updateCells: { rows: [{ values: arr.map((n) => ({ note: n })) }], fields: 'note', start: { sheetId: sid, rowIndex: 0, columnIndex: 0 } } });
  const width = (sid, col, px) => ({ updateDimensionProperties: { range: { sheetId: sid, dimension: 'COLUMNS', startIndex: col, endIndex: col + 1 }, properties: { pixelSize: px }, fields: 'pixelSize' } });

  const requests = [
    // Products
    headerFmt(id.Products, 8), freeze(id.Products),
    { repeatCell: { range: { sheetId: id.Products, startRowIndex: lastProd, startColumnIndex: 0, endColumnIndex: 8 }, cell: {}, fields: 'userEnteredValue,dataValidation,userEnteredFormat' } },
    listRange(id.Products, 1, 1, 1000, '=Categories!$A$2:$A$100'),
    checkbox(id.Products, 6, 1, lastProd), checkbox(id.Products, 7, 1, lastProd),
    notes(id.Products, PRODUCT_NOTES),
    width(id.Products, 3, 320), width(id.Products, 4, 240), width(id.Products, 5, 300),
    // Categories
    headerFmt(id.Categories, 2), freeze(id.Categories), width(id.Categories, 1, 480),
    // Enquiries — clean white data rows so appended enquiries have no stray
    // colour. The "Reverted" checkbox is attached per-row by the app on append.
    headerFmt(id.Enquiries, 10), freeze(id.Enquiries), whiteRows(id.Enquiries, 10),
    width(id.Enquiries, 7, 160), width(id.Enquiries, 8, 320),
    notes(id.Enquiries, ['When the enquiry arrived (IST).', 'Quote or Contact.', '', '', '', '', 'Estimated monthly volume.', 'Product they asked about.', 'Their message.', 'Tick once you have replied / reverted to this enquiry.']),
    // Reviews — Rating dropdown + Approved checkbox are attached per-row on append.
    headerFmt(id.Reviews, 6), freeze(id.Reviews), whiteRows(id.Reviews, 6),
    width(id.Reviews, 4, 380),
    notes(id.Reviews, ['When the feedback arrived.', '', '', 'Star rating 1-5.', 'Their comment.', 'Tick to publish this review on the website (with star ratings for Google).']),
  ];
  await j(await fetch(`${API}/${SHEET_ID}:batchUpdate`, { method: 'POST', headers: H, body: JSON.stringify({ requests }) }));

  console.log(`✅ Sheet ready: ${products.length} products, ${CATEGORIES.length} categories, clean Enquiries + Reviews tabs.`);
  console.log(`   https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`);
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
