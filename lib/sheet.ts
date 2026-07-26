// ─────────────────────────────────────────────────────────────
//  Backend: Google Sheet ("Shubham Trading Company — Website Data")
//  read/written directly via a dedicated service account.
//
//  Tabs:
//    Products  — Name | Category | Origin | Description | Photo URL |
//                Keywords | Show on website | Feature on homepage
//    Enquiries — Date | Type | Name | Company | Phone | Email |
//                Volume | Product | Message | Reverted
//    Reviews   — Date | Name | Company | Rating | Comment | Approved
//
//  Missing creds ⇒ callers fall back to bundled data/products.json.
// ─────────────────────────────────────────────────────────────

import { JWT } from 'google-auth-library';
import type { Enquiry, Product, Review } from './types';
import { normaliseCategory } from './categories';

const SHEET_ID = process.env.GOOGLE_SHEET_ID || '';
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || '';
const PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

export const PRODUCTS_TAB = 'Products';
export const ENQUIRIES_TAB = 'Enquiries';
export const REVIEWS_TAB = 'Reviews';

export const ENQUIRY_HEADERS = ['Date', 'Type', 'Name', 'Company', 'Phone', 'Email', 'Volume', 'Product', 'Message', 'Reverted'] as const;
export const REVIEW_HEADERS = ['Date', 'Name', 'Company', 'Rating', 'Comment', 'Approved'] as const;
export const PRODUCT_HEADERS = ['Name', 'Category', 'Origin', 'Description', 'Photo URL', 'Keywords', 'Show on website', 'Feature on homepage'] as const;

export const PRODUCTS_REVALIDATE = 300;
export const BACKEND_CONFIGURED = Boolean(SHEET_ID && CLIENT_EMAIL && PRIVATE_KEY);

let _client: JWT | null = null;
function getClient(): JWT {
  if (!_client) _client = new JWT({ email: CLIENT_EMAIL, key: PRIVATE_KEY, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  return _client;
}
async function accessToken(): Promise<string> {
  const { token } = await getClient().getAccessToken();
  if (!token) throw new Error('No access token');
  return token;
}
const SHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets';

// ── helpers ──
function toBool(v: unknown): boolean {
  if (typeof v === 'boolean') return v;
  const s = String(v ?? '').trim().toLowerCase();
  return s === 'true' || s === 'yes' || s === '1' || s === 'y' || s === '✓';
}
function toKeywords(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
  return String(v ?? '').split(/[,;\n|]/).map((x) => x.trim()).filter(Boolean);
}
export function slugify(name: string): string {
  return name.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
/** Case-insensitive header lookup. */
function pick(obj: Record<string, unknown>, ...names: string[]): string {
  for (const n of names) {
    for (const k of Object.keys(obj)) {
      if (k.trim().toLowerCase() === n.toLowerCase()) return String(obj[k] ?? '').trim();
    }
  }
  return '';
}

export function normaliseRow(row: Record<string, unknown>): Product {
  const name = pick(row, 'Name');
  const showRaw = pick(row, 'Show on website', 'Show', 'Visible');
  return {
    slug: slugify(name),
    name,
    category: normaliseCategory(pick(row, 'Category')),
    origin: pick(row, 'Origin'),
    shortDescription: pick(row, 'Description', 'shortDescription', 'desc'),
    keywords: toKeywords(pick(row, 'Keywords')),
    image: pick(row, 'Photo URL', 'photoUrl', 'image'),
    featured: toBool(pick(row, 'Feature on homepage', 'featured')),
    visible: showRaw === '' ? true : toBool(showRaw),
    longDescription: '',
    packaging: 'Available in bulk quantities',
  };
}

async function readRange(range: string): Promise<Record<string, unknown>[] | null> {
  if (!BACKEND_CONFIGURED) return null;
  try {
    const token = await accessToken();
    const res = await fetch(`${SHEETS_API}/${SHEET_ID}/values/${encodeURIComponent(range)}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: PRODUCTS_REVALIDATE },
    });
    if (!res.ok) return null;
    const values: string[][] = (await res.json()).values || [];
    if (values.length < 2) return values.length === 1 ? [] : null;
    const headers = values[0].map((h) => String(h).trim());
    return values.slice(1).map((r) => {
      const obj: Record<string, unknown> = {};
      headers.forEach((h, i) => (obj[h] = r[i]));
      return obj;
    });
  } catch (e) {
    console.error('[sheet] read failed:', range, (e as Error).message);
    return null;
  }
}

export async function fetchProductsFromSheet(): Promise<Product[] | null> {
  const rows = await readRange(`${PRODUCTS_TAB}!A1:Z2000`);
  if (!rows) return null;
  return rows.map(normaliseRow).filter((p) => p.name);
}

export async function fetchReviewsFromSheet(): Promise<Review[] | null> {
  const rows = await readRange(`${REVIEWS_TAB}!A1:Z1000`);
  if (!rows) return null;
  return rows
    .map((r) => ({
      date: pick(r, 'Date'),
      name: pick(r, 'Name'),
      company: pick(r, 'Company'),
      rating: Number(pick(r, 'Rating')) || 0,
      comment: pick(r, 'Comment', 'Comments', 'Message'),
      approved: toBool(pick(r, 'Approved')),
    }))
    .filter((r) => r.name && r.comment);
}

let _sheetIds: Record<string, number> | null = null;
async function sheetIds(token: string): Promise<Record<string, number>> {
  if (_sheetIds) return _sheetIds;
  const res = await fetch(`${SHEETS_API}/${SHEET_ID}?fields=sheets(properties(sheetId,title))`, { headers: { Authorization: `Bearer ${token}` } });
  const data = await res.json();
  _sheetIds = Object.fromEntries((data.sheets || []).map((s: any) => [s.properties.title, s.properties.sheetId]));
  return _sheetIds!;
}

interface Validator { col: number; rule: object }

/** Append a row and (optionally) attach data-validation to that new row only. */
async function appendRow(tab: string, values: string[], validators: Validator[] = []): Promise<boolean> {
  if (!BACKEND_CONFIGURED) return false;
  try {
    const token = await accessToken();
    const res = await fetch(
      `${SHEETS_API}/${SHEET_ID}/values/${encodeURIComponent(`${tab}!A1`)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ values: [values] }) },
    );
    if (!res.ok) { console.error('[sheet] append failed:', tab, res.status, await res.text()); return false; }

    if (validators.length) {
      const data = await res.json().catch(() => ({}));
      const updated: string = data.updates?.updatedRange || '';
      const rowMatch = updated.match(/![A-Z]+(\d+)/);
      const row0 = rowMatch ? parseInt(rowMatch[1], 10) - 1 : null;
      if (row0 != null) {
        const sid = (await sheetIds(token))[tab];
        const requests = validators.map((v) => ({
          setDataValidation: { range: { sheetId: sid, startRowIndex: row0, endRowIndex: row0 + 1, startColumnIndex: v.col, endColumnIndex: v.col + 1 }, rule: v.rule },
        }));
        await fetch(`${SHEETS_API}/${SHEET_ID}:batchUpdate`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ requests }) });
      }
    }
    return true;
  } catch (e) {
    console.error('[sheet] append error:', tab, (e as Error).message);
    return false;
  }
}

const nowIST = () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
const BOOLEAN_RULE = { condition: { type: 'BOOLEAN' }, strict: true };
const RATING_RULE = { condition: { type: 'ONE_OF_LIST', values: ['1', '2', '3', '4', '5'].map((v) => ({ userEnteredValue: v })) }, showCustomUi: true, strict: false };

export async function appendEnquiryToSheet(e: Enquiry): Promise<boolean> {
  const row: Record<string, string> = {
    Date: nowIST(), Type: e.type, Name: e.name || '', Company: e.company || '', Phone: e.phone || '',
    Email: e.email || '', Volume: e.volume || '', Product: e.product || '', Message: e.message || '', Reverted: 'FALSE',
  };
  return appendRow(ENQUIRIES_TAB, ENQUIRY_HEADERS.map((h) => row[h] ?? ''), [{ col: 9, rule: BOOLEAN_RULE }]);
}

export async function appendReviewToSheet(e: Enquiry): Promise<boolean> {
  const row: Record<string, string> = {
    Date: nowIST(), Name: e.name || '', Company: e.company || '',
    Rating: (e.rating || '').replace(/[^0-9]/g, '') || '5', Comment: e.message || '', Approved: 'FALSE',
  };
  return appendRow(REVIEWS_TAB, REVIEW_HEADERS.map((h) => row[h] ?? ''), [{ col: 3, rule: RATING_RULE }, { col: 5, rule: BOOLEAN_RULE }]);
}
