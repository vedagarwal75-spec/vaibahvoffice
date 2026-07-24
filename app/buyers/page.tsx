import type { Metadata } from 'next';
import Link from 'next/link';
import { BUYERS } from '@/lib/buyers';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbLd } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Who We Supply — HORECA, Hospitals, Canteens, Distributors & Export',
  description:
    'Shubham Trading Company supplies bulk food raw materials to HORECA, hospitals, army & BSF canteens, distributors, government tenders and export buyers across India. Find the supply approach built for your business.',
  alternates: { canonical: '/buyers' },
};

export default function BuyersPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Who We Supply', path: '/buyers' }])} />
      <section className="page-hero">
        <div className="container">
          <span className="section-tag">Built Around Your Business</span>
          <h1>Who We <em>Supply</em></h1>
          <p>Different buyers need different things. Choose your segment to see how we structure bulk supply for you.</p>
        </div>
      </section>

      <section className="section ivory">
        <div className="container">
          <div className="card-grid">
            {BUYERS.map((b) => (
              <Link key={b.slug} href={`/buyers/${b.slug}`} className="why-card" style={{ display: 'block' }}>
                <div className="why-icon">{b.points[0]?.icon || '📦'}</div>
                <h4>{b.name}</h4>
                <p>{b.metaDescription}</p>
                <span style={{ color: 'var(--green-700)', fontWeight: 600, fontSize: '0.85rem', display: 'inline-block', marginTop: '0.75rem' }}>
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
