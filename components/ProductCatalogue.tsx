'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';

interface CatMeta {
  key: string;
  title: string;
  slug: string;
  icon: string;
  intro: string;
  count: number;
}

export function ProductCatalogue({
  products,
  categories,
  initialQuery = '',
}: {
  products: Product[];
  categories: CatMeta[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [active, setActive] = useState(categories[0]?.key ?? '');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!q) return products;
    return products.filter((p) =>
      [p.name, p.category, p.origin, p.shortDescription, ...(p.keywords || [])]
        .join(' ')
        .toLowerCase()
        .includes(q),
    );
  }, [q, products]);

  const grouped = useMemo(() => {
    const map = new Map<string, Product[]>();
    for (const p of filtered) {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category)!.push(p);
    }
    return categories
      .filter((c) => map.has(c.key))
      .map((c) => ({ ...c, items: map.get(c.key)! }));
  }, [filtered, categories]);

  // Scroll-spy to highlight the active category tab.
  useEffect(() => {
    if (q) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.getAttribute('data-cat') || '');
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [grouped, q]);

  const scrollToCat = (key: string) => {
    const el = sectionRefs.current[key];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="search-wrapper">
        <label htmlFor="product-search" className="visually-hidden">
          Search products
        </label>
        <input
          id="product-search"
          type="search"
          className="search-input"
          placeholder="Search products, categories, or origin states…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {!q && (
        <div className="category-nav">
          <div className="container">
            <div className="category-nav-inner">
              {grouped.map((c) => (
                <button
                  key={c.key}
                  className={`cat-tab${active === c.key ? ' active' : ''}`}
                  onClick={() => scrollToCat(c.key)}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container" style={{ paddingBottom: '4rem' }}>
        {grouped.length === 0 && (
          <p className="no-results">
            No products match &ldquo;{query}&rdquo;. Try a different term, or{' '}
            <Link href="/quote" style={{ color: 'var(--terra)', fontWeight: 600 }}>
              send us your requirement
            </Link>{' '}
            — our stock isn&rsquo;t limited to what&rsquo;s listed.
          </p>
        )}

        {grouped.map((c) => (
          <section
            key={c.key}
            className="cat-section"
            data-cat={c.key}
            ref={(el) => {
              sectionRefs.current[c.key] = el;
            }}
          >
            <div className="cat-header">
              <div className="cat-title">
                <div className="cat-flag" />
                <h2>{c.title}</h2>
              </div>
              <Link href={`/category/${c.slug}`} className="cat-view-all">
                View all {c.title} →
              </Link>
            </div>
            {!q && c.intro && <p className="cat-intro">{c.intro}</p>}
            <div className="product-grid">
              {c.items.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
