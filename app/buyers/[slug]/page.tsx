import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BUYERS, buyerBySlug } from '@/lib/buyers';
import { categorySlug } from '@/lib/categories';
import { getProductsByCategory } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbLd } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const revalidate = 300;

export async function generateStaticParams() {
  return BUYERS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const b = buyerBySlug(params.slug);
  if (!b) return { title: 'Not Found' };
  return {
    title: b.metaTitle,
    description: b.metaDescription,
    keywords: b.keywords,
    alternates: { canonical: `/buyers/${b.slug}` },
    openGraph: { title: b.metaTitle, description: b.metaDescription, url: `${SITE.url}/buyers/${b.slug}` },
  };
}

export default async function BuyerPage({ params }: { params: { slug: string } }) {
  const b = buyerBySlug(params.slug);
  if (!b) notFound();

  // A few sample products from the first relevant category.
  const sample = (await getProductsByCategory(b.supplies[0])).slice(0, 4);

  return (
    <>
      <JsonLd data={breadcrumbLd([
        { name: 'Home', path: '/' },
        { name: 'Who We Supply', path: '/buyers' },
        { name: b.name, path: `/buyers/${b.slug}` },
      ])} />
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'Service',
        serviceType: b.name, provider: { '@id': `${SITE.url}/#organization` },
        areaServed: { '@type': 'Country', name: 'India' }, description: b.metaDescription,
      }} />

      <section className="page-hero">
        <div className="container">
          <span className="section-tag">{b.eyebrow}</span>
          <h1>{b.h1}</h1>
          <p>{b.intro[0]}</p>
        </div>
      </section>

      <section className="section ivory">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb" style={{ marginTop: '-2rem' }}>
            <Link href="/">Home</Link><span className="sep">/</span>
            <Link href="/buyers">Who We Supply</Link><span className="sep">/</span>
            <span>{b.name}</span>
          </nav>

          {b.intro.slice(1).map((p, i) => (
            <p key={i} style={{ color: 'var(--ink-soft)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 820, marginBottom: '1rem' }}>{p}</p>
          ))}

          {(() => {
            // Named clients for this segment. Still gated by the SITE flags,
            // so a group only renders once it has been approved.
            const group = b.clientGroup;
            const allowed =
              group === 'hospitality'
                ? SITE.publishHospitalityClients
                : group === 'defence'
                ? SITE.publishDefenceClients
                : false;
            const names = group && allowed ? SITE.namedClients[group] : [];
            if (!names.length) return null;
            return (
              <div style={{ margin: '2rem 0 0', paddingTop: '1.75rem', borderTop: '1px solid var(--line)', maxWidth: 820 }}>
                <span className="section-tag" style={{ marginBottom: '0.25rem' }}>Our clients include</span>
                <div className="client-names">
                  {names.map((n) => (
                    <span className="client-name" key={n}>{n}</span>
                  ))}
                </div>
                <p style={{ color: 'var(--ink-faint)', fontSize: '0.82rem', marginTop: '1rem' }}>
                  All brand names and trademarks are the property of their respective owners.
                </p>
              </div>
            );
          })()}

          <div className="card-grid" style={{ margin: '2.5rem 0' }}>
            {b.points.map((pt) => (
              <div className="why-card" key={pt.title}>
                <div className="why-icon">{pt.icon}</div>
                <h4>{pt.title}</h4>
                <p>{pt.text}</p>
              </div>
            ))}
          </div>

          <h2 style={{ marginTop: '1rem', marginBottom: '0.75rem' }}>What We Supply You</h2>
          <div className="divider" />
          <div className="cat-chip-grid" style={{ marginBottom: '1rem' }}>
            {b.supplies.map((key) => (
              <Link key={key} href={`/category/${categorySlug(key)}`} className="cat-chip">
                <h4>{key}</h4>
                <span className="count">View range →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {sample.length > 0 && (
        <section className="section ivory-dark">
          <div className="container">
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <span className="section-tag">Popular with {b.name.split('—')[0].trim()}</span>
              <h2>From Our Catalogue</h2>
            </div>
            <div className="product-grid">
              {sample.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        </section>
      )}

      <section className="cta-band">
        <div className="container">
          <h2>Supplying <em>{b.name.split('—')[0].trim()}</em>? Let&rsquo;s Talk.</h2>
          <p>Share your requirement and volumes — we&rsquo;ll respond with availability, grades and competitive bulk pricing.</p>
          <Link className="btn-primary btn-gold" href="/quote" style={{ padding: '0.9rem 2rem' }}>Request a Quote</Link>
        </div>
      </section>
    </>
  );
}
