'use client';

import { useState } from 'react';
import { SITE } from '@/lib/site';

export function QuoteForm({ initialProduct = '' }: { initialProduct?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    volume: '',
    message: initialProduct
      ? `Hello, I would like a bulk quote for: ${initialProduct}.\n\nEstimated requirement: `
      : '',
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');

    const payload = {
      type: 'Quote' as const,
      name: form.name,
      company: form.company,
      phone: form.phone,
      email: form.email,
      volume: form.volume,
      product: initialProduct,
      message: form.message,
      source: 'Quote page',
    };

    // Record the enquiry in the Sheet + email relay.
    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setStatus('ok');
    } catch {
      setStatus('err');
    }

    // Also open WhatsApp with the requirement pre-filled.
    const waText = encodeURIComponent(
      `Hello ${SITE.shortName}! I'd like a bulk quote.\n\n` +
        `Name: ${form.name}\nCompany: ${form.company}\nPhone: ${form.phone}\n` +
        `Email: ${form.email}\nVolume: ${form.volume}\n` +
        `${initialProduct ? `Product: ${initialProduct}\n` : ''}` +
        `Requirement: ${form.message}`,
    );
    window.open(`${SITE.whatsappHref}?text=${waText}`, '_blank', 'noopener');

    if (status !== 'err') {
      setForm({ name: '', company: '', phone: '', email: '', volume: '', message: '' });
    }
  }

  return (
    <form className="form-wrapper" onSubmit={onSubmit}>
      <h2>Submit Your Requirement</h2>
      <p>
        Share your institutional details and we&rsquo;ll respond with availability, specifications and
        competitive bulk pricing. Submitting also opens WhatsApp so you can reach us instantly.
      </p>

      {status === 'ok' && (
        <div className="form-status ok">
          ✅ Thank you — your enquiry has been received. We&rsquo;ll be in touch shortly.
        </div>
      )}
      {status === 'err' && (
        <div className="form-status err">
          Your WhatsApp message is ready. If the email copy didn&rsquo;t send, please reach us on{' '}
          {SITE.phone}.
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="q-name">Full Name</label>
          <input id="q-name" value={form.name} onChange={update('name')} required />
        </div>
        <div className="form-group">
          <label htmlFor="q-company">Company / Institution</label>
          <input id="q-company" value={form.company} onChange={update('company')} required />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="q-phone">Phone Number</label>
          <input id="q-phone" type="tel" value={form.phone} onChange={update('phone')} required />
        </div>
        <div className="form-group">
          <label htmlFor="q-email">Email Address</label>
          <input id="q-email" type="email" value={form.email} onChange={update('email')} required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="q-volume">Estimated Monthly Volume (Kg / Tons)</label>
        <input id="q-volume" value={form.volume} onChange={update('volume')} required />
      </div>
      <div className="form-group">
        <label htmlFor="q-message">Message / Product Requirements</label>
        <textarea
          id="q-message"
          placeholder="Specify products, grades, and delivery locations…"
          value={form.message}
          onChange={update('message')}
          required
        />
      </div>
      <button
        type="submit"
        className="btn-primary"
        style={{ width: '100%', justifyContent: 'center' }}
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending…' : 'Send via Email & WhatsApp'}
      </button>
      <p className="form-note">Every enquiry is logged for our team — we typically reply within one business day.</p>
    </form>
  );
}
