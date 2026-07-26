import type { Metadata } from 'next';
import { FeedbackForm } from '@/components/FeedbackForm';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbLd, reviewsLd } from '@/lib/seo';
import { getApprovedReviews, getReviewSummary } from '@/lib/products';
import { SITE } from '@/lib/site';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Client Feedback & Reviews',
  description:
    'Read client feedback for Shubham Trading Company and share your own experience with our bulk supply, sourcing and logistics. Reviews from institutional and wholesale buyers across India.',
  alternates: { canonical: '/feedback' },
};

function Stars({ n }: { n: number }) {
  return <span aria-label={`${n} out of 5`}>{'★'.repeat(Math.round(n))}{'☆'.repeat(5 - Math.round(n))}</span>;
}

export default async function FeedbackPage() {
  const [reviews, summary] = await Promise.all([getApprovedReviews(), getReviewSummary()]);

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Feedback', path: '/feedback' }])} />
      {summary && reviews.length > 0 && <JsonLd data={reviewsLd(summary, reviews)} />}

      <section className="page-hero">
        <div className="container">
          <span className="section-tag" style={{ color: 'var(--gold)' }}>Client Relations</span>
          <h1>Client <em>Feedback</em></h1>
          <p>What institutional and wholesale buyers say about working with us — and a place to share your own experience.</p>
        </div>
      </section>

      <section className="section ivory">
        <div className="container">
          {summary && (
            <div className="rating-banner fade-up">
              <h2>{summary.average.toFixed(1)} / 5</h2>
              <p><Stars n={summary.average} /> &nbsp;— based on {summary.count} client review{summary.count === 1 ? '' : 's'}</p>
            </div>
          )}

          {reviews.length > 0 && (
            <div className="card-grid" style={{ marginBottom: '3rem' }}>
              {reviews.slice(0, 9).map((r, i) => (
                <div className="why-card fade-up" key={i}>
                  <div style={{ color: 'var(--gold)', fontSize: '1.1rem', marginBottom: '0.5rem' }}><Stars n={r.rating} /></div>
                  <p style={{ color: 'var(--text-mid)', fontStyle: 'italic', marginBottom: '0.75rem' }}>&ldquo;{r.comment}&rdquo;</p>
                  <h4 style={{ color: 'var(--green-deep)', fontSize: '0.95rem' }}>
                    {r.name}{r.company ? <span style={{ color: 'var(--text-light)', fontWeight: 400 }}> · {r.company}</span> : null}
                  </h4>
                </div>
              ))}
            </div>
          )}

          {(SITE.googleReviewUrl || SITE.googleProfileUrl) && (
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <p style={{ color: 'var(--ink-soft)', marginBottom: '1rem' }}>
                Worked with us? A public review helps other buyers find us.
              </p>
              {SITE.googleReviewUrl && (
                <a className="btn-primary" href={SITE.googleReviewUrl} target="_blank" rel="noopener">
                  ⭐ Rate us on Google
                </a>
              )}
              {SITE.googleProfileUrl && (
                <a
                  className="btn-outline"
                  href={SITE.googleProfileUrl}
                  target="_blank"
                  rel="noopener"
                  style={{ marginLeft: '0.75rem' }}
                >
                  View our Google profile
                </a>
              )}
            </div>
          )}

          <FeedbackForm />
        </div>
      </section>
    </>
  );
}
