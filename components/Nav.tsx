'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SITE, NAV_LINKS } from '@/lib/site';

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close the mobile drawer on navigation
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <nav className={`site-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="container nav-inner">
          <Link className="nav-logo" href="/" aria-label={`${SITE.name} — home`}>
            <span>{SITE.shortName}</span>
            <span>{SITE.tagline}</span>
          </Link>
          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={isActive(l.href) ? 'active' : ''}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/quote" className="nav-cta">
                Request a Quote
              </Link>
            </li>
          </ul>
          <button
            className={`hamburger${open ? ' open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`nav-drawer${open ? ' open' : ''}`}>
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
        <Link href="/quote" style={{ color: 'var(--gold)' }}>
          Request a Quote
        </Link>
      </div>
    </>
  );
}
