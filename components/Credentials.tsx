import { SITE } from '@/lib/site';

/**
 * Statutory registrations (GST / FSSAI / Udyam). These are strong trust
 * signals for institutional, tender and export buyers — and are picked up
 * as Organization identifiers in structured data.
 */
export function Credentials({
  heading = 'Our Credentials',
  tag = 'Registered & Compliant',
  compact = false,
}: {
  heading?: string;
  tag?: string;
  compact?: boolean;
}) {
  return (
    <div>
      {!compact && (
        <div className="section-header">
          <span className="section-tag">{tag}</span>
          <h2>{heading}</h2>
          <div className="divider" />
        </div>
      )}
      <div className="cred-grid">
        {SITE.credentials.map((c) => (
          <div className="cred-card" key={c.label}>
            <span className="cred-icon" aria-hidden="true">{c.icon}</span>
            <div className="cred-label">{c.label}</div>
            <div className="cred-value">{c.value}</div>
            {!compact && <p className="cred-note">{c.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
