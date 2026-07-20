import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getVisibleProducts, getProductBySlug, getRelatedProducts } from '@/lib/products';
import { categoryTitle, categorySlug } from '@/lib/categories';
import { resolveImage } from '@/lib/image';
import { SITE } from '@/lib/site';
import { ProductCard } from '@/components/ProductCard';
import { JsonLd } from '@/components/JsonLd';
import { productLd, breadcrumbLd } from '@/lib/seo';

export const revalidate = 300;

export async function generateStaticParams() {
  const products = await getVisibleProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = await getProductBySlug(params.slug);
  if (!p) return { title: 'Product Not Found' };
  const cat = categoryTitle(p.category);
  const title = `${p.name} — Wholesale ${cat} Supplier`;
  const description = `Buy ${p.name} in bulk from ${SITE.name}, Kolkata. ${p.shortDescription}. Sourced from ${p.origin}. Wholesale supply for HORECA, hospitals, canteens & distributors across India — request a quote today.`;
  return {
    title,
    description,
    keywords: p.keywords,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      type: 'website',
      title: `${p.name} — ${SITE.shortName}`,
      description,
      url: `${SITE.url}/products/${p.slug}`,
      images: [{ url: resolveImage(p.image), alt: p.name }],
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product, 4);
  const catTitle = categoryTitle(product.category);
  const catSlug = categorySlug(product.category);

  return (
    <>
      <JsonLd data={productLd(product)} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: catTitle, path: `/category/${catSlug}` },
          { name: product.name, path: `/products/${product.slug}` },
        ])}
      />

      <div style={{ background: 'var(--ivory)', paddingTop: 'var(--nav-h)' }}>
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/products">Products</Link>
            <span className="sep">/</span>
            <Link href={`/category/${catSlug}`}>{catTitle}</Link>
            <span className="sep">/</span>
            <span>{product.name}</span>
          </nav>

          <div className="pd-grid">
            <div className="pd-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolveImage(product.image)}
                alt={`${product.name} — bulk wholesale supply from ${product.origin}`}
              />
            </div>
            <div className="pd-info">
              <span className="pd-eyebrow">{catTitle}</span>
              <h1>{product.name}</h1>
              <div className="pd-meta">
                <span className="pd-pill">📍 Origin: <strong>{product.origin}</strong></span>
                <span className="pd-pill">📦 {product.packaging}</span>
                <span className="pd-pill">🏢 Bulk / Wholesale</span>
              </div>
              <p className="pd-desc">{product.longDescription || product.shortDescription}</p>
              <div className="pd-actions">
                <Link
                  href={`/quote?product=${encodeURIComponent(product.name)}`}
                  className="btn-primary"
                >
                  Request a Bulk Quote
                </Link>
                <a
                  href={`${SITE.whatsappHref}?text=${encodeURIComponent(
                    `Hello ${SITE.shortName}, I'd like a bulk quote for ${product.name}.`,
                  )}`}
                  target="_blank"
                  rel="noopener"
                  className="btn-outline"
                >
                  Enquire on WhatsApp
                </a>
              </div>

              {product.keywords.length > 0 && (
                <div className="pd-keywords">
                  <h4>Also searched as</h4>
                  <div className="kw-row">
                    {product.keywords.slice(0, 12).map((k) => (
                      <span className="kw" key={k}>
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section ivory-dark">
          <div className="container">
            <div className="cat-header">
              <div className="cat-title">
                <div className="cat-flag" />
                <h2 style={{ fontSize: '1.6rem' }}>More in {catTitle}</h2>
              </div>
              <Link href={`/category/${catSlug}`} className="cat-view-all">
                View all {catTitle} →
              </Link>
            </div>
            <div className="product-grid">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
