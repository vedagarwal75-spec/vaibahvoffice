// ─────────────────────────────────────────────────────────────
//  Backend: Google Sheet ("Shubham Trading Company — Website Data")
//  accessed directly via a DEDICATED service account (separate from
//  anything else). Reads the "Products" tab, appends to "Enquiries".
//
//  Required env vars (see .env.example):
//    GOOGLE_SHEET_ID        – the spreadsheet id
//    GOOGLE_CLIENT_EMAIL    – service-account email (shared as Editor)
//    GOOGLE_PRIVATE_KEY     – service-account private key
//
//  If creds are missing, callers fall back to the bundled products.json
//  so the site always renders during setup.
// ─────────────────────────────────────────────────────────────

import { JWT } from 'google-auth-library';
import type { Enquiry, Product } from './types';

const SHEET_ID = process.env.GOOGLE_SHEET_ID || '';
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || '';
const PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

export const PRODUCTS_TAB = 'Products';
export const ENQUIRIES_TAB = 'Enquiries';
// Fixed column order for the Enquiries tab (see scripts/setup-sheet.js).
export const ENQUIRY_HEADERS = [
  'Timestamp', 'Type', 'Name', 'Company', 'Phone', 'Email',
  'Volume', 'Product', 'Message', 'Rating', 'Source', 'Status',
] as const;

/** How long (seconds) Next.js may cache the product list before re-fetching. */
export const PRODUCTS_REVALIDATE = 300;

export const BACKEND_CONFIGURED = Boolean(SHEET_ID && CLIENT_EMAIL && PRIVATE_KEY);

let _client: JWT | null = null;
function getClient(): JWT {
  if (!_client) {
    _client = new JWT({
      email: CLIENT_EMAIL,
      key: PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  }
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
  return s === 'true' || s === 'yes' || s === '1' || s === 'y';
}
function toKeywords(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
  return String(v ?? '').split(/[,;\n|]/).map((x) => x.trim()).filter(Boolean);
}
export function slugify(name: string): string {
  return name.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/** Normalise one raw row (object keyed by sheet header) into a Product. */
export function normaliseRow(row: Record<string, unknown>, i: number): Product {
  const name = String(row.name ?? '').trim();
  return {
    slug: String(row.slug ?? '').trim() || slugify(name),
    name,
    category: String(row.category ?? '').trim(),
    origin: String(row.origin ?? '').trim(),
    shortDescription: String(row.shortDescription ?? row.desc ?? '').trim(),
    keywords: toKeywords(row.keywords),
    longDescription: String(row.longDescription ?? '').trim(),
    packaging: String(row.packaging ?? '').trim() || 'Available in bulk (25kg / 50kg)',
    image: String(row.image ?? '').trim(),
    featured: toBool(row.featured),
    visible: row.visible === undefined || String(row.visible).trim() === '' ? true : toBool(row.visible),
    order: Number(row.order ?? i + 1) || i + 1,
  };
}

/** Fetch products from the Sheet's "Products" tab. Returns null on any failure. */
export async function fetchProductsFromSheet(): Promise<Product[] | null> {
  if (!BACKEND_CONFIGURED) return null;
  try {
    const token = await accessToken();
    const range = encodeURIComponent(`${PRODUCTS_TAB}!A1:Z2000`);
    const res = await fetch(`${SHEETS_API}/${SHEET_ID}/values/${range}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: PRODUCTS_REVALIDATE },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const values: string[][] = data.values || [];
    if (values.length < 2) return null;
    const headers = values[0].map((h) => String(h).trim());
    const rows = values.slice(1).map((r) => {
      const obj: Record<string, unknown> = {};
      headers.forEach((h, i) => (obj[h] = r[i]));
      return obj;
    });
    return rows.map(normaliseRow).filter((p) => p.name);
  } catch (e) {
    console.error('[sheet] fetchProducts failed:', (e as Error).message);
    return null;
  }
}

/** Append an enquiry as a new row in the "Enquiries" tab. */
export async function appendEnquiryToSheet(enquiry: Enquiry): Promise<boolean> {
  if (!BACKEND_CONFIGURED) return false;
  try {
    const token = await accessToken();
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const record: Record<string, string> = {
      Timestamp: timestamp,
      Type: enquiry.type,
      Name: enquiry.name || '',
      Company: enquiry.company || '',
      Phone: enquiry.phone || '',
      Email: enquiry.email || '',
      Volume: enquiry.volume || '',
      Product: enquiry.product || '',
      Message: enquiry.message || '',
      Rating: enquiry.rating || '',
      Source: enquiry.source || '',
      Status: 'New',
    };
    const row = ENQUIRY_HEADERS.map((h) => record[h] ?? '');
    const range = encodeURIComponent(`${ENQUIRIES_TAB}!A1`);
    const res = await fetch(
      `${SHEETS_API}/${SHEET_ID}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [row] }),
      },
    );
    if (!res.ok) {
      console.error('[sheet] appendEnquiry failed:', res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error('[sheet] appendEnquiry error:', (e as Error).message);
    return false;
  }
}
