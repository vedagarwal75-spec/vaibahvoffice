import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbLd, localBusinessLd } from '@/lib/seo';
import { getCategoriesInUse } from '@/lib/products';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Bulk Food Raw Material Supplier in Kolkata | Wholesale',
  description:
    'Kolkata-based bulk food raw material supplier since 2004. Wholesale rice, spices, pulses, grains and dry fruits for HORECA, hospitals, canteens and distributors across Kolkata, West Bengal and pan-India.',
  alternates: { canonical: '/locations/kolkata' },
};

export default async function KolkataPage() {
  const categories = await getCategoriesInUse();
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Kolkata', path: '/locations/kolkata' }])} />
      <JsonLd data={localBusinessLd()} />

      <section className="page-hero">
        <div className="container">
          <span className="section-tag">Our Home Base · Est. 2004</span>
          <h1>Bulk Food Raw Material Supplier in <em>Kolkata</em></h1>
          <p>Headquartered in Kolkata since 2004 — supplying wholesale rice, spices, pulses, grains and dry fruits to institutional and trade buyers across the city, West Bengal and all of India.</p>
        </div>
      </section>

      <section className="section ivory">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <span className="section-tag">Rooted in Kolkata</span>
              <h2>Two Decades on the Ground in Eastern India</h2>
              <div className="divider" />
              <p>
                From our base at {SITE.address.street}, {SITE.address.locality} – {SITE.address.postalCode}, we have
                supplied Kolkata&rsquo;s hotels, restaurants, caterers, hospitals, canteens and wholesale distributors since
                2004. Being local means faster coordination for city buyers and deep familiarity with the regional
                ingredients Bengali kitchens rely on.
              </p>
              <p>
                We stock authentic Bengal specialities — <strong>Govindbhog rice</strong>, <strong>Radhuni</strong>,{' '}
                <strong>Kalonji</strong> and mustard — alongside the full national range of rice, dals, spices and dry
                fruits. And because our sourcing network spans 18+ states, Kolkata buyers get genuine origin produce, not
                repackaged substitutes.
              </p>
              <p>
                Beyond Kolkata, our transporter network dispatches bulk orders across West Bengal, the North-East and the
                rest of India — so the same reliable supply reaches you wherever you operate.
              </p>
              <Link className="btn-primary" href="/quote">Request a Quote in Kolkata</Link>
            </div>
            <div className="about-sidebar">
              <div className="stat-card">
                <div className="label">Corporate Office</div>
                <p>{SITE.address.street}<br />{SITE.address.locality} – {SITE.address.postalCode}<br />{SITE.address.region}, India</p>
              </div>
              <div className="stat-card">
                <div className="label">Contact</div>
                <p>
                  Phone: <a href={SITE.phoneHref} style={{ color: 'var(--green-700)' }}>{SITE.phone}</a><br />
                  WhatsApp: <a href={SITE.whatsappHref} style={{ color: 'var(--green-700)' }}>{SITE.whatsapp}</a>
                </p>
              </div>
              <div className="stat-card">
                <div className="label">Business Hours</div>
                <p>{SITE.hours}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section ivory-dark">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <span className="section-tag">What Kolkata Buyers Order</span>
            <h2>Our Full Range, Supplied Locally</h2>
          </div>
          <div className="cat-chip-grid">
            {categories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="cat-chip">
                <span className="icon">{c.icon}</span>
                <h4>{c.title}</h4>
                <span className="count">{c.count} products</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
