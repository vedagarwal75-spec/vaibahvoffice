import type { Metadata } from 'next';
import { FeedbackForm } from '@/components/FeedbackForm';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Client Feedback',
  description:
    'Share your feedback on Shubham Trading Company’s bulk supply, sourcing and logistics. Your input helps us maintain our standards for institutional and wholesale buyers.',
  alternates: { canonical: '/feedback' },
};

export default function FeedbackPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Feedback', path: '/feedback' }])} />

      <section className="page-hero">
        <div className="container">
          <span className="section-tag" style={{ color: 'var(--gold)' }}>
            Client Relations
          </span>
          <h1>
            Client <em>Feedback</em>
          </h1>
        </div>
      </section>

      <section className="section ivory">
        <div className="container">
          <div className="rating-banner fade-up">
            <h2>4.7 / 5</h2>
            <p>Overall Service Rating based on Institutional Feedback</p>
          </div>
          <FeedbackForm />
        </div>
      </section>
    </>
  );
}
