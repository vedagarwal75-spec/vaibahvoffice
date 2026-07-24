import Link from 'next/link';
import { SITE } from '@/lib/site';
import { getCategoriesInUse } from '@/lib/products';
import { BUYERS } from '@/lib/buyers';

export async function Footer() {
  const categories = (await getCategoriesInUse()).slice(0, 6);
  const year = 2024; // brand copyright year; static to avoid hydration drift

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span>{SITE.name}</span>
            <span>{SITE.tagline}</span>
            <p>
              India&rsquo;s trusted B2B bulk food raw material supplier — authentic regional
              ingredients sourced directly from origin states, serving HORECA, hospitals and
              wholesale buyers nationwide.
            </p>
          </div>
          <div className="footer-col">
            <h5>Navigation</h5>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/products">Product Catalogue</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/pan-india-delivery">Pan-India Delivery</Link></li>
              <li><Link href="/locations/kolkata">Kolkata</Link></li>
              <li><Link href="/quote">Request a Quote</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Who We Supply</h5>
            <ul>
              {BUYERS.map((b) => (
                <li key={b.slug}>
                  <Link href={`/buyers/${b.slug}`}>{b.name.split('—')[0].trim()}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h5>Categories</h5>
            <ul>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}`}>{c.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li><a href={SITE.phoneHref}>{SITE.phone}</a></li>
              <li>
                <a href={SITE.whatsappHref} target="_blank" rel="noopener">
                  WA: {SITE.whatsapp}
                </a>
              </li>
              <li><a href={SITE.emailComposeHref} target="_blank" rel="noopener">{SITE.email}</a></li>
              <li>
                <span>
                  {SITE.address.street},<br />
                  {SITE.address.locality} – {SITE.address.postalCode}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {year} {SITE.name}. All rights reserved. B2B catalogue only — no retail sales.</p>
          <span>{SITE.address.locality}, {SITE.address.region}, {SITE.address.countryName}</span>
        </div>
      </div>
    </footer>
  );
}
