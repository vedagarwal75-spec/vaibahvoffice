import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDES } from '@/lib/guides';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Buying Guides — Bulk Food Raw Material Resources',
  description:
    'Practical guides for bulk food buyers: the ordering process, packaging options, choosing rice varieties for commercial kitchens, spice sourcing by origin state, and storage & shelf-life.',
  alternates: { canonical: '/guides' },
};

export default function GuidesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Buying Guides', path: '/guides' }])} />

      <section className="page-hero">
        <div className="container">
          <span className="section-tag">Resource Hub</span>
          <h1>Buying <em>Guides</em></h1>
          <p>Practical reference material for institutional and wholesale buyers — written from two decades of supplying bulk food raw materials.</p>
        </div>
      </section>

      <section className="section ivory">
        <div className="container">
          <div className="card-grid">
            {GUIDES.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="why-card" style={{ display: 'block' }}>
                <div className="why-icon">{g.icon}</div>
                <h4>{g.title}</h4>
                <p>{g.summary}</p>
                <span style={{ color: 'var(--green-700)', fontWeight: 600, fontSize: '0.85rem', display: 'inline-block', marginTop: '0.75rem' }}>
                  {g.readingTime} · Read guide →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
