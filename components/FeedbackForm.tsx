'use client';

import { useState } from 'react';
import { SITE } from '@/lib/site';
import { sendClientEmail } from '@/lib/sendClientEmail';

const RATINGS = [
  { value: '5 Stars', label: '⭐⭐⭐⭐⭐ — Excellent' },
  { value: '4 Stars', label: '⭐⭐⭐⭐ — Very Good' },
  { value: '3 Stars', label: '⭐⭐⭐ — Average' },
  { value: '2 Stars', label: '⭐⭐ — Poor' },
  { value: '1 Star', label: '⭐ — Unacceptable' },
];

export function FeedbackForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [form, setForm] = useState({ name: '', rating: RATINGS[0].value, message: '' });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');

    const [sheetOk] = await Promise.all([
      fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Feedback',
          name: form.name,
          rating: form.rating,
          message: form.message,
          source: 'Feedback page',
        }),
      }).then((r) => r.ok).catch(() => false),
      sendClientEmail(`New Client Feedback${form.name ? ` from ${form.name}` : ''}`, {
        Name: form.name,
        Rating: form.rating,
        Comments: form.message,
      }),
    ]);

    setStatus(sheetOk ? 'ok' : 'err');
    if (sheetOk) setForm({ name: '', rating: RATINGS[0].value, message: '' });
  }

  return (
    <form className="form-wrapper" onSubmit={onSubmit}>
      <h2>Rate Our Supply</h2>
      <p>Your feedback helps us maintain our sourcing and logistics standards.</p>

      {status === 'ok' && (
        <div className="form-status ok">✅ Thank you for your feedback — it&rsquo;s been recorded.</div>
      )}
      {status === 'err' && (
        <div className="form-status err">
          Something went wrong. Please try again, or call us on {SITE.phone}.
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="f-name">Your Name / Company</label>
          <input
            id="f-name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="f-rating">Service Rating</label>
          <select
            id="f-rating"
            value={form.rating}
            onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
            required
          >
            {RATINGS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="f-message">Comments</label>
        <textarea
          id="f-message"
          placeholder={`How was your experience with ${SITE.shortName}?`}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          required
        />
      </div>
      <button
        type="submit"
        className="btn-primary"
        style={{ width: '100%', justifyContent: 'center' }}
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Submitting…' : 'Submit Feedback'}
      </button>
    </form>
  );
}
