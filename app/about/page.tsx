import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbLd } from '@/lib/seo';
import { Credentials } from '@/components/Credentials';

export const metadata: Metadata = {
  title: 'About Us — 20+ Years of Authentic Regional Sourcing',
  description:
    'Since 2004, Shubham Trading Company has supplied bulk food raw materials to HORECA, hospitals, army & BSF canteens and wholesale distributors across India — with direct sourcing networks spanning 18+ origin states.',
  alternates: { canonical: '/about' },
};

const VALUES = [
  { icon: '🌱', title: 'Origin Authenticity', text: 'Every product is sourced directly from its state of origin — not repackaged, not substituted. You get the real variety.' },
  { icon: '📦', title: 'Bulk Reliability', text: 'Consistent availability and supply volume structured for institutional buyers — no retail quantities, only wholesale scale.' },
  { icon: '🤝', title: 'Long-Term Relationships', text: 'Lasting partnerships — with suppliers, farmers, and buyers — built on trust and mutual benefit.' },
  { icon: '🚛', title: 'Logistics Capability', text: 'Pan-India freight network to ensure your order reaches your warehouse on time, every time.' },
  { icon: '⚖️', title: 'Transparent Trade', text: 'Clear communication on availability, specifications and terms — no surprises, no hidden conditions.' },
  { icon: '🏨', title: 'HORECA & Healthcare Expertise', text: 'Deep understanding of hotel, restaurant, catering and hospital requirements — from spec sheets to volume planning.' },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }])} />

      <section className="page-hero">
        <div className="container">
          <span className="section-tag" style={{ color: 'var(--gold)' }}>
            Est. 2004 · Kolkata
          </span>
          <h1>
            About <em>Shubham</em> Trading Company
          </h1>
          <p>A trusted name in bulk food raw material supply — serving India&rsquo;s institutional and wholesale buyers since 2004.</p>
        </div>
      </section>

      <section className="section ivory">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <span className="section-tag">Our Story</span>
              <h2>Two Decades of Authentic Regional Sourcing</h2>
              <div className="divider" />
              <p>
                Founded in 2004 in Kolkata, {SITE.name} began with a single mission: to connect
                India&rsquo;s diverse regional agricultural bounty with the institutional buyers who
                need it most — hotels, restaurants, catering companies, hospitals, defence canteens
                and wholesale distributors.
              </p>
              <p>
                Over two decades, we have built one of the most comprehensive direct-sourcing
                networks in the country. From the Basmati-growing belts of Haryana to the spice
                estates of Kerala, from Rajasthan&rsquo;s cumin farms to the aromatic rice paddies of
                Bengal — our procurement partnerships span 18+ states and hundreds of origin points.
              </p>
              <div className="about-highlight fade-up">
                <p>
                  &ldquo;We don&rsquo;t just supply ingredients — we supply <em>authenticity</em>.
                  Every product in our catalogue is traceable to its origin state, ensuring our
                  buyers receive the genuine variety their kitchens and customers demand.&rdquo;
                </p>
                <span>— {SITE.name}, Kolkata</span>
              </div>
              <p>
                Our client base today includes hotel chains, large restaurant groups, institutional
                catering companies, army and BSF canteen supply chains, regional wholesale
                distributors, and food processors across India — each relationship built on
                consistent supply, competitive pricing and 20+ years of operating experience.
              </p>
              <Link className="btn-primary" href="/quote">
                Get in Touch With Us
              </Link>
            </div>
            <div className="about-sidebar">
              {[
                { num: '2004', label: 'Year Established', text: 'Founded in Kolkata, growing from a regional supplier into a pan-India procurement partner.' },
                { num: '20+', label: 'Years of Experience', text: 'Two decades of trade relationships, supply-chain knowledge and institutional partnerships.' },
                { num: '18+', label: 'Origin States', text: 'Direct sourcing partnerships spanning the geographic breadth of Indian agriculture.' },
                { num: 'PAN', label: 'India Supply Network', text: 'Established logistics and freight partnerships for reliable bulk delivery nationwide.' },
              ].map((s) => (
                <div className="stat-card fade-up" key={s.label}>
                  <div className="num">{s.num}</div>
                  <div className="label">{s.label}</div>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section ivory-dark">
        <div className="container">
          <Credentials />
        </div>
      </section>

      <section className="section ivory">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'left' }}>
            <span className="section-tag">What We Stand For</span>
            <h2>Our Core Commitments</h2>
            <div className="divider" style={{ margin: '1rem 0 0' }} />
          </div>
          <div className="card-grid">
            {VALUES.map((v) => (
              <div className="value-item fade-up" key={v.title}>
                <span className="value-icon">{v.icon}</span>
                <h4>{v.title}</h4>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
