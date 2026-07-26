import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbLd, faqLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'FAQ — Bulk Ordering, Packaging & Delivery',
  description:
    'Answers to common questions about buying bulk food raw materials from Shubham Trading Company — ordering, packaging, pan-India delivery, payment terms, samples and export supply.',
  alternates: { canonical: '/faq' },
};

const FAQS = [
  { q: 'What quantities do you supply?', a: 'We are a bulk / wholesale supplier serving institutional and trade buyers rather than retail customers. Quantities are confirmed against your specific requirement — share your item list and estimated monthly volume, and we will revert with what we can supply and at what price.' },
  { q: 'What packaging options do you offer?', a: 'Most institutional supply goes out in standard bulk sacks, with jumbo bags and container-load packing available for very large or export orders. Tell us your storage and handling setup and we will recommend a format.' },
  { q: 'Do you deliver across India?', a: 'Yes. We dispatch pan-India through an established network of transporters and freight partners. Delivery timelines depend on the destination and order size — we confirm these when we quote.' },
  { q: 'Do you sell retail or small quantities?', a: 'No. Shubham Trading Company is a B2B bulk supplier serving HORECA, hospitals, canteens, distributors and wholesalers. We do not make retail sales.' },
  { q: 'Which products do you supply?', a: 'Rice, grains, millets, whole spices, ground spices & powders, pulses & dals, seeds & superfoods, dried herbs, dried chillies & regional specialities, and dry fruits & nuts — plus other daily-use commodities on request. Our inventory is not limited to the items shown in the catalogue.' },
  { q: 'Can I get a sample or specifications before ordering?', a: 'For genuine bulk enquiries we are happy to discuss grades, specifications and samples. Send us your requirement via the quote form or WhatsApp and our team will respond.' },
  { q: 'What are your payment terms?', a: 'Payment terms are discussed per order and relationship. For export orders we work with standard trade instruments such as LC / TT. Contact us to discuss terms for your requirement.' },
  { q: 'Do you supply to overseas / export buyers?', a: 'Yes. We support overseas buyers sourcing authentic Indian-origin ingredients with container-load bulk supply, export packaging and coordination on the documentation your import process requires.' },
  { q: 'Do you provide compliance documentation (FSSAI, GST, etc.)?', a: 'Tell us what your procurement or import process requires and we will coordinate the necessary trade and compliance documentation for your order.' },
  { q: 'How do I get pricing or place an order?', a: 'Use the Request a Quote form with your product list and estimated monthly volume, or message us on WhatsApp. We revert promptly with availability, specifications and competitive bulk pricing.' },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }])} />
      <JsonLd data={faqLd(FAQS)} />

      <section className="page-hero">
        <div className="container">
          <span className="section-tag">Bulk Buying, Answered</span>
          <h1>Frequently Asked <em>Questions</em></h1>
          <p>Ordering, packaging, delivery, payment and export — the essentials for buying bulk food raw materials from us.</p>
        </div>
      </section>

      <section className="section ivory">
        <div className="container" style={{ maxWidth: 860 }}>
          {FAQS.map((f, i) => (
            <details key={i} style={{ borderBottom: '1px solid var(--line)', padding: '1.4rem 0' }} open={i === 0}>
              <summary style={{ cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--green-900)', listStyle: 'none' }}>
                {f.q}
              </summary>
              <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, marginTop: '0.75rem' }}>{f.a}</p>
            </details>
          ))}

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p style={{ color: 'var(--ink-soft)', marginBottom: '1.25rem' }}>Still have a question? We&rsquo;re happy to help.</p>
            <Link className="btn-primary" href="/quote">Ask Us / Request a Quote</Link>
            <span style={{ margin: '0 0.75rem', color: 'var(--ink-faint)' }}>or</span>
            <a className="btn-outline" href={SITE.whatsappHref} target="_blank" rel="noopener">WhatsApp Us</a>
          </div>
        </div>
      </section>
    </>
  );
}
