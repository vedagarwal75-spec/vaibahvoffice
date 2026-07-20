import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <span className="section-tag" style={{ color: 'var(--gold)' }}>
          404
        </span>
        <h1 style={{ marginBottom: '1rem' }}>
          Page <em>Not Found</em>
        </h1>
        <p style={{ margin: '0 auto 2rem', maxWidth: 520 }}>
          The page you&rsquo;re looking for doesn&rsquo;t exist. Browse our catalogue or get in touch
          with your requirement.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link className="btn-primary btn-gold" href="/products">
            View Catalogue
          </Link>
          <Link className="btn-outline" href="/" style={{ borderColor: 'var(--gold)', color: 'var(--ivory)' }}>
            Back Home
          </Link>
        </div>
      </div>
    </section>
  );
}
