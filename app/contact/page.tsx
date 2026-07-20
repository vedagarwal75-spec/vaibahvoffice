import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact — Bulk & Wholesale Enquiries',
  description: `Contact ${SITE.name}, Kolkata. Phone ${SITE.phone}, WhatsApp ${SITE.whatsapp}, email ${SITE.email}. Bulk food raw material supply for HORECA, hospitals, canteens and distributors across India.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])} />

      <section className="page-hero">
        <div className="container">
          <span className="section-tag" style={{ color: 'var(--gold)' }}>
            We are here to help
          </span>
          <h1>
            Contact <em>Us</em>
          </h1>
          <p>Reach our sourcing desk for bulk availability, specifications and competitive wholesale pricing.</p>
        </div>
      </section>

      <section className="section ivory">
        <div className="container">
          <div className="contact-info-grid">
            <div className="info-block fade-up">
              <span className="info-icon">📍</span>
              <h4>Corporate Office</h4>
              <p>
                {SITE.address.street}
                <br />
                {SITE.address.locality} – {SITE.address.postalCode}
                <br />
                {SITE.address.region}, {SITE.address.countryName}
              </p>
            </div>
            <div className="info-block fade-up">
              <span className="info-icon">📞</span>
              <h4>Direct Lines</h4>
              <p>
                Phone:{' '}
                <a href={SITE.phoneHref} style={{ textDecoration: 'underline' }}>
                  {SITE.phone}
                </a>
              </p>
              <p>
                WhatsApp:{' '}
                <a href={SITE.whatsappHref} target="_blank" rel="noopener" style={{ textDecoration: 'underline' }}>
                  {SITE.whatsapp}
                </a>
              </p>
              <p>
                Email:{' '}
                <a href={SITE.emailComposeHref} target="_blank" rel="noopener" style={{ textDecoration: 'underline' }}>
                  {SITE.email}
                </a>
              </p>
            </div>
            <div className="info-block fade-up">
              <span className="info-icon">🕐</span>
              <h4>Business Hours</h4>
              <p>{SITE.hours}</p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--terra)' }}>
                *Use WhatsApp for urgent BSF/Army dispatch enquiries.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
