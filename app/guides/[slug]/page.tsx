import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GUIDES, guideBySlug } from '@/lib/guides';
import { categorySlug, categoryTitle } from '@/lib/categories';
import { SITE } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbLd, faqLd } from '@/lib/seo';

export const revalidate = 3600;

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const g = guideBySlug(params.slug);
  if (!g) return { title: 'Not Found' };
  return {
    title: g.metaTitle,
    description: g.metaDescription,
    keywords: g.keywords,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { type: 'article', title: g.metaTitle, description: g.metaDescription, url: `${SITE.url}/guides/${g.slug}` },
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = guideBySlug(params.slug);
  if (!g) notFound();

  const others = GUIDES.filter((x) => x.slug !== g.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={breadcrumbLd([
        { name: 'Home', path: '/' },
        { name: 'Buying Guides', path: '/guides' },
        { name: g.title, path: `/guides/${g.slug}` },
      ])} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: g.title,
        description: g.metaDescription,
        author: { '@id': `${SITE.url}/#organization` },
        publisher: { '@id': `${SITE.url}/#organization` },
        mainEntityOfPage: `${SITE.url}/guides/${g.slug}`,
      }} />
      {g.faqs && g.faqs.length > 0 && <JsonLd data={faqLd(g.faqs)} />}

      <section className="page-hero">
        <div className="container">
          <span className="section-tag">Buying Guide · {g.readingTime}</span>
          <h1>{g.title}</h1>
          <p>{g.summary}</p>
        </div>
      </section>

      <section className="section ivory">
        <div className="container" style={{ maxWidth: 820 }}>
          <nav className="breadcrumbs" aria-label="Breadcrumb" style={{ marginTop: '-2rem' }}>
            <Link href="/">Home</Link><span className="sep">/</span>
            <Link href="/guides">Buying Guides</Link><span className="sep">/</span>
            <span>{g.title}</span>
          </nav>

          <article className="guide-body">
            {g.sections.map((s) => (
              <section key={s.heading} style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i} style={{ color: 'var(--ink-soft)', lineHeight: 1.85, marginBottom: '1rem' }}>{p}</p>
                ))}
                {s.bullets && (
                  <ul style={{ display: 'grid', gap: '0.9rem', marginTop: '1rem' }}>
                    {s.bullets.map((b) => (
                      <li key={b.term} style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '1.1rem 1.25rem' }}>
                        <strong style={{ color: 'var(--green-900)' }}>{b.term}</strong>
                        <span style={{ color: 'var(--ink-soft)' }}> — {b.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>

          {g.faqs && g.faqs.length > 0 && (
            <section style={{ marginTop: '3rem' }}>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>Common Questions</h2>
              {g.faqs.map((f, i) => (
                <details key={i} style={{ borderBottom: '1px solid var(--line)', padding: '1.1rem 0' }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--green-900)', listStyle: 'none' }}>{f.q}</summary>
                  <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, marginTop: '0.6rem' }}>{f.a}</p>
                </details>
              ))}
            </section>
          )}

          {g.related && g.related.length > 0 && (
            <section style={{ marginTop: '2.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Related Product Ranges</h3>
              <div className="clients-row" style={{ justifyContent: 'flex-start' }}>
                {g.related.map((key) => (
                  <Link key={key} href={`/category/${categorySlug(key)}`} className="client-pill">
                    {categoryTitle(key)} →
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--line)' }}>
            <p style={{ color: 'var(--ink-soft)', marginBottom: '1.25rem' }}>Have a bulk requirement? We&rsquo;ll quote availability, grades and pricing.</p>
            <Link className="btn-primary" href="/quote">Request a Quote</Link>
          </div>
        </div>
      </section>

      <section className="section ivory-dark">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <span className="section-tag">Keep Reading</span>
            <h2>More Buying Guides</h2>
          </div>
          <div className="card-grid">
            {others.map((o) => (
              <Link key={o.slug} href={`/guides/${o.slug}`} className="why-card" style={{ display: 'block' }}>
                <div className="why-icon">{o.icon}</div>
                <h4>{o.title}</h4>
                <p>{o.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
