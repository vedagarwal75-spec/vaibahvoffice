import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LOCATIONS, locationBySlug } from '@/lib/locations';
import { categorySlug } from '@/lib/categories';
import { getCategoriesInUse } from '@/lib/products';
import { SITE } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbLd, localBusinessLd } from '@/lib/seo';
import { Credentials } from '@/components/Credentials';

export const revalidate = 3600;

export async function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const l = locationBySlug(params.slug);
  if (!l) return { title: 'Not Found' };
  return {
    title: l.metaTitle,
    description: l.metaDescription,
    keywords: l.keywords,
    alternates: { canonical: `/locations/${l.slug}` },
    openGraph: { title: l.metaTitle, description: l.metaDescription, url: `${SITE.url}/locations/${l.slug}` },
  };
}

export default async function LocationPage({ params }: { params: { slug: string } }) {
  const l = locationBySlug(params.slug);
  if (!l) notFound();

  const categories = await getCategoriesInUse();
  const focus = categories.filter((c) => l.focusCategories.includes(c.key));

  return (
    <>
      <JsonLd data={breadcrumbLd([
        { name: 'Home', path: '/' },
        { name: 'Delivery Locations', path: '/pan-india-delivery' },
        { name: l.city, path: `/locations/${l.slug}` },
      ])} />
      {/* Only our actual physical premises carries LocalBusiness schema. */}
      {l.isHeadOffice && <JsonLd data={localBusinessLd()} />}

      <section className="page-hero">
        <div className="container">
          <span className="section-tag">{l.eyebrow}</span>
          <h1>
            Bulk Food Raw Material Supplier in <em>{l.city}</em>
          </h1>
          <p>{l.metaDescription}</p>
        </div>
      </section>

      <section className="section ivory">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb" style={{ marginTop: '-2rem' }}>
            <Link href="/">Home</Link><span className="sep">/</span>
            <Link href="/pan-india-delivery">Delivery Locations</Link><span className="sep">/</span>
            <span>{l.city}</span>
          </nav>

          <div className="about-grid">
            <div className="about-text">
              <span className="section-tag">{l.city} · {l.region}</span>
              <h2>Supplying {l.city} Kitchens &amp; Trade Buyers</h2>
              <div className="divider" />
              {l.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p>
                <strong>Dispatch:</strong> {l.logistics}
              </p>
              <Link className="btn-primary" href="/quote">
                Request a Quote for {l.city}
              </Link>
            </div>

            <div className="about-sidebar">
              {l.isHeadOffice ? (
                <>
                  <div className="stat-card">
                    <div className="label">Corporate Office</div>
                    <p>
                      {SITE.address.street}<br />
                      {SITE.address.locality} – {SITE.address.postalCode}<br />
                      {SITE.address.region}, India
                    </p>
                  </div>
                  <div className="stat-card">
                    <div className="label">Contact</div>
                    <p>
                      Phone: <a href={SITE.phoneHref} style={{ color: 'var(--green-700)' }}>{SITE.phone}</a><br />
                      WhatsApp: <a href={SITE.whatsappHref} style={{ color: 'var(--green-700)' }}>{SITE.whatsapp}</a>
                    </p>
                  </div>
                </>
              ) : (
                <div className="stat-card">
                  <div className="label">Dispatched From</div>
                  <p>
                    Kolkata, West Bengal — our head office and dispatch base, serving {l.city} through
                    established road-freight partners.
                  </p>
                  <p style={{ marginTop: '0.75rem' }}>
                    Phone: <a href={SITE.phoneHref} style={{ color: 'var(--green-700)' }}>{SITE.phone}</a><br />
                    WhatsApp: <a href={SITE.whatsappHref} style={{ color: 'var(--green-700)' }}>{SITE.whatsapp}</a>
                  </p>
                </div>
              )}
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
            <span className="section-tag">What {l.city} Buys</span>
            <h2>Demand in This Market</h2>
          </div>
          <div className="card-grid">
            {l.demand.map((d) => (
              <div className="why-card" key={d.title}>
                <div className="why-icon">📦</div>
                <h4>{d.title}</h4>
                <p>{d.text}</p>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: '3rem', marginBottom: '1.25rem' }}>Most-Ordered Categories</h3>
          <div className="cat-chip-grid">
            {(focus.length ? focus : categories).map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="cat-chip">
                <span className="icon">{c.icon}</span>
                <h4>{c.title}</h4>
                <span className="count">{c.count} products</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section ivory">
        <div className="container">
          <Credentials />
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>
            Bulk Supply to <em>{l.city}</em>
          </h2>
          <p>Share your requirement and volumes — we&rsquo;ll confirm availability, freight and pricing for {l.city}.</p>
          <Link className="btn-primary btn-gold" href="/quote" style={{ padding: '0.9rem 2rem' }}>
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
