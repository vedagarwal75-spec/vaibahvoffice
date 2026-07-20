import type { Metadata } from 'next';
import { QuoteForm } from '@/components/QuoteForm';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Request a Quote — Bulk & Wholesale Pricing',
  description:
    'Request a bulk quote from Shubham Trading Company. Share your product requirements and monthly volume — we respond with availability, specifications and competitive wholesale pricing for delivery across India.',
  alternates: { canonical: '/quote' },
};

export default function QuotePage({ searchParams }: { searchParams: { product?: string } }) {
  const product = searchParams.product || '';
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Request a Quote', path: '/quote' }])} />

      <section className="page-hero">
        <div className="container">
          <span className="section-tag" style={{ color: 'var(--gold)' }}>
            Wholesale Sourcing
          </span>
          <h1>
            Request a <em>Quote</em>
          </h1>
          <p>Tell us what you need and at what volume — we&rsquo;ll get back with the details that matter.</p>
        </div>
      </section>

      <section className="section ivory">
        <div className="container">
          <QuoteForm initialProduct={product} />
        </div>
      </section>
    </>
  );
}
