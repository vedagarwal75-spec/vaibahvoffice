import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categoryBySlug } from '@/lib/categories';
import { getVisibleProducts, getProductsByCategory, getCategoriesInUse } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbLd, itemListLd } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const revalidate = 300;

export async function generateStaticParams() {
  const cats = await getCategoriesInUse();
  return cats.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const meta = categoryBySlug(params.slug);
  if (!meta) return { title: 'Category Not Found' };
  const title = `Wholesale ${meta.title} Supplier — Bulk Supply Across India`;
  return {
    title,
    description: meta.intro,
    keywords: meta.keywords,
    alternates: { canonical: `/category/${meta.slug}` },
    openGraph: { title: `${meta.title} — ${SITE.shortName}`, description: meta.intro, url: `${SITE.url}/category/${meta.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const meta = categoryBySlug(params.slug);
  if (!meta) notFound();
  const products = await getProductsByCategory(meta.key);
  if (products.length === 0) {
    // Category defined but empty — still valid, but avoid a bare page.
    const all = await getVisibleProducts();
    if (all.length > 0 && products.length === 0) notFound();
  }

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: meta.title, path: `/category/${meta.slug}` },
        ])}
      />
      <JsonLd data={itemListLd(products, `Wholesale ${meta.title}`)} />

      <section className="page-hero">
        <div className="container">
          <span className="section-tag" style={{ color: 'var(--gold)' }}>
            {meta.icon} Wholesale Division
          </span>
          <h1>
            Bulk <em>{meta.title}</em> Supplier
          </h1>
          <p>{meta.intro}</p>
        </div>
      </section>

      <div style={{ background: 'var(--ivory)' }}>
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/products">Products</Link>
            <span className="sep">/</span>
            <span>{meta.title}</span>
          </nav>

          <div className="product-grid" style={{ padding: '1rem 0 4rem' }}>
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </div>

      <section className="cta-band">
        <div className="container">
          <h2>
            Need Bulk <em>{meta.title}</em>?
          </h2>
          <p>Send your requirement and we&rsquo;ll revert with availability, specifications and competitive wholesale pricing.</p>
          <Link className="btn-primary btn-gold" href="/quote" style={{ padding: '0.85rem 2rem' }}>
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
