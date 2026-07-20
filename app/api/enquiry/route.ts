import { NextResponse } from 'next/server';
import { appendEnquiryToSheet, BACKEND_CONFIGURED } from '@/lib/sheet';
import type { Enquiry } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const WEB3FORMS_KEY = process.env.WEB3FORMS_KEY || '';

function clean(v: unknown, max = 4000): string {
  return String(v ?? '').slice(0, max).trim();
}

/** Fire the email copy via Web3Forms (best-effort; never blocks the response). */
async function sendEmail(e: Enquiry): Promise<boolean> {
  if (!WEB3FORMS_KEY) return false;
  try {
    const subject =
      e.type === 'Feedback'
        ? `New Client Feedback${e.name ? ` from ${e.name}` : ''}`
        : `New Bulk Quote Request${e.company ? ` from ${e.company}` : ''}`;
    const fd = new FormData();
    fd.append('access_key', WEB3FORMS_KEY);
    fd.append('subject', subject);
    fd.append('from_name', e.name || 'Website Enquiry');
    fd.append('Type', e.type);
    if (e.name) fd.append('Name', e.name);
    if (e.company) fd.append('Company', e.company);
    if (e.phone) fd.append('Phone', e.phone);
    if (e.email) fd.append('Email', e.email);
    if (e.volume) fd.append('Volume', e.volume);
    if (e.product) fd.append('Product', e.product);
    if (e.rating) fd.append('Rating', e.rating);
    if (e.message) fd.append('Message', e.message);
    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const typeRaw = clean(body.type) || 'Quote';
  const type = (['Quote', 'Feedback', 'Contact'].includes(typeRaw) ? typeRaw : 'Quote') as Enquiry['type'];

  const enquiry: Enquiry = {
    type,
    name: clean(body.name, 200),
    company: clean(body.company, 200),
    phone: clean(body.phone, 60),
    email: clean(body.email, 200),
    volume: clean(body.volume, 200),
    product: clean(body.product, 300),
    message: clean(body.message, 4000),
    rating: clean(body.rating, 40),
    source: clean(body.source, 120),
  };

  if (!enquiry.name && !enquiry.phone && !enquiry.email) {
    return NextResponse.json({ ok: false, error: 'Missing contact details' }, { status: 400 });
  }

  const [logged, emailed] = await Promise.all([appendEnquiryToSheet(enquiry), sendEmail(enquiry)]);

  // Success if the enquiry reached at least one channel (or backend not yet set up).
  const ok = logged || emailed || !BACKEND_CONFIGURED;
  return NextResponse.json({ ok, logged, emailed });
}
