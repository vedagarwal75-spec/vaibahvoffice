import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbLd } from '@/lib/seo';
import { getCategoriesInUse } from '@/lib/products';
import { BUYERS } from '@/lib/buyers';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Pan-India Bulk Delivery — Nationwide Dispatch Network',
  description:
    'Shubham Trading Company dispatches bulk food raw materials nationwide from Kolkata — to Delhi, Mumbai, Bengaluru, Hyderabad, Chennai and across India via an established transporter network.',
  alternates: { canonical: '/pan-india-delivery' },
};

const REGIONS = [
  { name: 'Eastern India', text: 'Kolkata, West Bengal, the North-East, Odisha & Bihar — our home region with the fastest coordination.' },
  { name: 'Northern India', text: 'Delhi NCR and the northern belt, close to our Basmati, wheat and Rajasthan spice sourcing.' },
  { name: 'Western India', text: 'Mumbai, Pune, Ahmedabad and Gujarat — a major hub for pulses, oilseeds and dry fruits.' },
  { name: 'Southern India', text: 'Bengaluru, Hyderabad and Chennai — close to our rice, chilli and coastal spice origins.' },
];

export default async function PanIndiaPage() {
  const categories = await getCategoriesInUse();
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Pan-India Delivery', path: '/pan-india-delivery' }])} />

      <section className="page-hero">
        <div className="container">
          <span className="section-tag">Nationwide Dispatch</span>
          <h1>Pan-India <em>Bulk Delivery</em></h1>
          <p>Two decades of transporter and freight relationships mean the same reliable bulk supply reaches your warehouse, kitchen or camp — anywhere in India.</p>
        </div>
      </section>

      <section className="section ivory">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
            <span className="section-tag">Where We Deliver</span>
            <h2>Coverage by Region</h2>
          </div>
          <div className="card-grid">
            {REGIONS.map((r) => (
              <div className="why-card" key={r.name}>
                <div className="why-icon">📍</div>
                <h4>{r.name}</h4>
                <p>{r.text}</p>
              </div>
            ))}
          </div>

          <p style={{ color: 'var(--ink-soft)', maxWidth: 820, margin: '2.5rem 0 1rem', lineHeight: 1.8 }}>
            Dispatched from our Kolkata base, orders move by road freight through partners we&rsquo;ve worked with for years.
            Delivery timelines and freight are confirmed at the time of quoting, based on destination and order size.
            For city-specific supply in our home market, see our{' '}
            <Link href="/locations/kolkata" style={{ color: 'var(--green-700)', fontWeight: 600 }}>Kolkata page</Link>.
          </p>
        </div>
      </section>

      <section className="section ivory-dark">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <span className="section-tag">Explore</span>
            <h2>Range &amp; Buyer Segments</h2>
          </div>
          <div className="cat-chip-grid" style={{ marginBottom: '2rem' }}>
            {categories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="cat-chip">
                <span className="icon">{c.icon}</span>
                <h4>{c.title}</h4>
                <span className="count">{c.count} products</span>
              </Link>
            ))}
          </div>
          <div className="card-grid">
            {BUYERS.map((b) => (
              <Link key={b.slug} href={`/buyers/${b.slug}`} className="why-card" style={{ display: 'block' }}>
                <div className="why-icon">{b.points[0]?.icon || '📦'}</div>
                <h4>{b.name}</h4>
                <span style={{ color: 'var(--green-700)', fontWeight: 600, fontSize: '0.85rem' }}>Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>Need Bulk Supply <em>Anywhere in India</em>?</h2>
          <p>Tell us your destination and requirement — we&rsquo;ll confirm availability, freight and pricing.</p>
          <Link className="btn-primary btn-gold" href="/quote" style={{ padding: '0.9rem 2rem' }}>Request a Quote</Link>
        </div>
      </section>
    </>
  );
}
