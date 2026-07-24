import Link from 'next/link';
import { SITE } from '@/lib/site';
import { getFeaturedProducts, getCategoriesInUse, getVisibleProducts } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { PRODUCTS_REVALIDATE } from '@/lib/sheet';
import { BUYERS } from '@/lib/buyers';

export const revalidate = 300;

const WHY = [
  { icon: '🌾', title: 'Nationwide Sourcing Network', text: 'Direct procurement partnerships spanning 18+ states, ensuring year-round availability of regional staples at the source.' },
  { icon: '📦', title: 'Bulk Supply Expertise', text: 'Structured for HORECA institutions, hospitals, army & BSF canteens, and wholesale distributors needing large-volume, consistent supply.' },
  { icon: '📍', title: 'Authentic Origin Sourcing', text: 'Every listed product is procured directly from its state of origin — guaranteeing variety integrity, authentic flavour and genuine quality.' },
  { icon: '🚛', title: 'Strong Logistics Network', text: 'Established relationships with transporters and freight partners for reliable pan-India delivery to your warehouse or institution.' },
  { icon: '💼', title: 'Wholesale Positioning', text: 'Competitive bulk pricing structured for institutional and trade buyers — volume and relationship-based procurement.' },
  { icon: '🤝', title: 'Two Decades of Trust', text: 'Operating since 2004 from Kolkata, with long-standing relationships across the supply chain — from farmers to end buyers.' },
];

export default async function HomePage() {
  const [featured, categories, all] = await Promise.all([
    getFeaturedProducts(8),
    getCategoriesInUse(),
    getVisibleProducts(),
  ]);
  void PRODUCTS_REVALIDATE;

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-pattern" />
        <div className="hero-circle" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span>India&rsquo;s Authentic Origin Sourcing Partner</span>
            </div>
            <h1>
              Authentic Regional Indian <em>Food Ingredients</em> Sourced Directly From Their Origin
              States
            </h1>
            <p className="hero-desc">
              {SITE.name} supplies bulk food raw materials to hotels, restaurants, caterers,
              hospitals, army canteens, BSF camps, distributors and wholesalers across India — with
              a focus on genuine regional sourcing and reliable bulk logistics.
            </p>
            <div className="hero-actions">
              <Link className="btn-primary" href="/products">
                View Product Catalogue
              </Link>
              <Link className="btn-outline" href="/quote">
                Request a Quote
              </Link>
            </div>
            <div className="hero-stats">
              {SITE.stats.map((s) => (
                <div className="hero-stat" key={s.label}>
                  <span>{s.value}</span>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <div className="intro-strip">
        <div className="container">
          <div className="intro-strip-inner">
            <p>
              <strong>Serving HORECA, Hospitals &amp; Wholesale Buyers Since 2004.</strong> Your
              trusted partner for bulk food raw materials — grains, pulses, spices, oilseeds, dry
              fruits and specialty regional ingredients.
            </p>
            <div className="badge-row">
              <span className="badge">HORECA</span>
              <span className="badge">Hospitals</span>
              <span className="badge">Army &amp; BSF Canteens</span>
              <span className="badge">Distributors</span>
              <span className="badge">Wholesalers</span>
            </div>
          </div>
        </div>
      </div>

      {/* WHO WE ARE */}
      <section className="home-intro">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-text">
              <span className="section-tag">Who We Are</span>
              <h2>A Complete Bulk Raw Material Supplier for India&rsquo;s Food Industry</h2>
              <div className="divider" />
              <p>
                {SITE.name}, headquartered in Kolkata, is a full-service bulk food raw material
                supplier serving institutional and wholesale buyers across India. Since 2004, we
                have built deep sourcing networks across every major agricultural belt in the
                country.
              </p>
              <p>
                We deal in the complete spectrum of daily-use commodities — rice, wheat, pulses,
                dals, spices, oilseeds, dry fruits and more — sourced in bulk from their origin
                regions to ensure authenticity, quality and competitive pricing.
              </p>
              <Link className="btn-primary" href="/products">
                Explore the Catalogue
              </Link>
            </div>
            <div className="intro-visual">
              <div className="intro-card wide fade-up">
                <div className="intro-card-num">2004</div>
                <h4>Established in Kolkata</h4>
                <p>Two decades of trusted B2B relationships with suppliers, transporters and institutional buyers across India.</p>
              </div>
              <div className="intro-card fade-up">
                <div className="intro-card-num">18+</div>
                <h4>States Sourced</h4>
                <p>Direct procurement partnerships across every major agricultural region.</p>
              </div>
              <div className="intro-card fade-up">
                <div className="intro-card-num">{all.length}+</div>
                <h4>Specialty SKUs</h4>
                <p>Authentic origin-tagged regional products in our showcase catalogue.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section ivory-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Browse By Category</span>
            <h2>Our Sourcing Divisions</h2>
            <div className="divider" />
          </div>
          <div className="cat-chip-grid">
            {categories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="cat-chip fade-up">
                <span className="icon">{c.icon}</span>
                <h4>{c.title}</h4>
                <span className="count">{c.count} products</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="section ivory">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">From Our Catalogue</span>
            <h2>Featured Products</h2>
            <div className="divider" />
          </div>
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link className="btn-outline" href="/products">
              View All {all.length} Products
            </Link>
          </div>
        </div>
      </section>

      {/* WHO WE SUPPLY */}
      <section className="section ivory-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Built Around Your Business</span>
            <h2>Who We Supply</h2>
            <div className="divider" />
          </div>
          <div className="card-grid">
            {BUYERS.map((b) => (
              <Link key={b.slug} href={`/buyers/${b.slug}`} className="why-card fade-up" style={{ display: 'block' }}>
                <div className="why-icon">{b.points[0]?.icon || '📦'}</div>
                <h4>{b.name.split('—')[0].trim()}</h4>
                <p>{b.eyebrow}</p>
                <span style={{ color: 'var(--green-700)', fontWeight: 600, fontSize: '0.85rem', display: 'inline-block', marginTop: '0.6rem' }}>Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section ivory">
        <div className="container">
          <div className="why-header">
            <span className="section-tag">Why Choose Us</span>
            <h2>Built for Wholesale Buyers</h2>
            <div className="divider" />
          </div>
          <div className="card-grid">
            {WHY.map((w) => (
              <div className="why-card fade-up" key={w.title}>
                <div className="why-icon">{w.icon}</div>
                <h4>{w.title}</h4>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container">
          <span className="section-tag" style={{ color: 'var(--gold)' }}>
            Get in Touch
          </span>
          <h2>
            Ready to Source Authentic <em>Regional Ingredients</em> at Wholesale Scale?
          </h2>
          <p>
            Send us your requirement and we will respond promptly with availability, specifications
            and competitive bulk pricing.
          </p>
          <Link className="btn-primary btn-gold" href="/quote" style={{ padding: '0.85rem 2rem' }}>
            Request a Quote Today
          </Link>
        </div>
      </section>
    </>
  );
}
