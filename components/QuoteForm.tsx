'use client';

import { useState } from 'react';
import { SITE } from '@/lib/site';
import { sendClientEmail } from '@/lib/sendClientEmail';

export function QuoteForm({ initialProduct = '' }: { initialProduct?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [form, setForm] = useState({
    name: '', phone: '', company: '', email: '', volume: '',
    message: initialProduct ? `I would like a bulk quote for: ${initialProduct}.\n\nEstimated requirement: ` : '',
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const waLink = () => {
    const text = encodeURIComponent(
      `Hello ${SITE.shortName}! I'd like a bulk quote.\n\n` +
        `Name: ${form.name}\nPhone: ${form.phone}\n` +
        `${form.company ? `Company: ${form.company}\n` : ''}` +
        `${form.email ? `Email: ${form.email}\n` : ''}` +
        `${form.volume ? `Volume: ${form.volume}\n` : ''}` +
        `${initialProduct ? `Product: ${initialProduct}\n` : ''}` +
        `${form.message ? `Requirement: ${form.message}` : ''}`,
    );
    return `${SITE.whatsappHref}?text=${text}`;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setStatus('sending');

    // Log to the Sheet (server) and email the team (Web3Forms, client-side)
    // in parallel. Email must be client-side — Web3Forms blocks server calls.
    const [sheetOk] = await Promise.all([
      fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Quote', name: form.name, phone: form.phone, company: form.company,
          email: form.email, volume: form.volume, product: initialProduct,
          message: form.message, source: 'Quote page',
        }),
      }).then((r) => r.ok).catch(() => false),
      sendClientEmail(`New Bulk Quote Request${form.company ? ` from ${form.company}` : ''}`, {
        Name: form.name,
        Phone: form.phone,
        Company: form.company,
        email: form.email, // Web3Forms uses this as the reply-to address
        Volume: form.volume,
        Product: initialProduct,
        Requirement: form.message,
      }),
    ]);

    setStatus(sheetOk ? 'ok' : 'err');
  }

  if (status === 'ok') {
    return (
      <div className="form-wrapper" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✅</div>
        <h2>Enquiry Received</h2>
        <p style={{ maxWidth: 460, margin: '0.5rem auto 1.75rem' }}>
          Thank you, {form.name.split(' ')[0] || 'there'}. Our team will get back to you shortly with
          availability and pricing. Want a faster reply? Continue the conversation on WhatsApp.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a className="btn-primary" style={{ background: '#25D366' }} href={waLink()} target="_blank" rel="noopener">
            Continue on WhatsApp
          </a>
          <button className="btn-outline" onClick={() => { setForm({ name: '', phone: '', company: '', email: '', volume: '', message: '' }); setStatus('idle'); }}>
            Send Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="form-wrapper" onSubmit={onSubmit}>
      <h2>Submit Your Requirement</h2>
      <p>Share your details and we&rsquo;ll respond with availability, specifications and competitive bulk pricing. Only your name and mobile number are required.</p>

      {status === 'err' && (
        <div className="form-status err">Something went wrong saving your enquiry. Please try again, or reach us directly on {SITE.phone}.</div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="q-name">Full Name <span style={{ color: 'var(--terra)' }}>*</span></label>
          <input id="q-name" value={form.name} onChange={update('name')} required />
        </div>
        <div className="form-group">
          <label htmlFor="q-phone">Mobile Number <span style={{ color: 'var(--terra)' }}>*</span></label>
          <input id="q-phone" type="tel" value={form.phone} onChange={update('phone')} required />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="q-company">Company / Institution</label>
          <input id="q-company" value={form.company} onChange={update('company')} />
        </div>
        <div className="form-group">
          <label htmlFor="q-email">Email Address</label>
          <input id="q-email" type="email" value={form.email} onChange={update('email')} />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="q-volume">Estimated Monthly Volume (Kg / Tons)</label>
        <input id="q-volume" value={form.volume} onChange={update('volume')} placeholder="Optional" />
      </div>
      <div className="form-group">
        <label htmlFor="q-message">Message / Product Requirements</label>
        <textarea id="q-message" placeholder="Specify products, grades, and delivery locations…" value={form.message} onChange={update('message')} />
      </div>
      <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Submit Enquiry'}
      </button>
      <p className="form-note">Prefer WhatsApp? Submit above and you&rsquo;ll get a one-tap WhatsApp option next.</p>
    </form>
  );
}
