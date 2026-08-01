import type { Metadata } from 'next';
import { getVisibleProducts, getCategoriesInUse } from '@/lib/products';
import { ProductCatalogue } from '@/components/ProductCatalogue';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbLd, itemListLd } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Product Catalogue — Bulk Spices, Rice, Pulses & Dry Fruits',
  description:
    'Browse the full catalogue of bulk food raw materials from Shubham Trading Company — wholesale rice, grains, millets, whole & ground spices, pulses, dals, seeds, dried herbs, dried chillies and dry fruits, sourced from their origin states across India.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Product Catalogue — Shubham Trading Company',
    description:
      'Wholesale rice, spices, pulses, seeds and dry fruits sourced from their origin states across India.',
    url: `${SITE.url}/products`,
  },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const [products, categories] = await Promise.all([getVisibleProducts(), getCategoriesInUse()]);

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Products', path: '/products' }])} />
      <JsonLd data={itemListLd(products, 'Shubham Trading Company — Product Catalogue')} />

      <section className="page-hero">
        <div className="container">
          <span className="section-tag" style={{ color: 'var(--gold)' }}>
            Category-Wise Sourcing Catalogue
          </span>
          <h1>
            Our <em>Product Range</em>
          </h1>
          <p>
            Authentic regional Indian food raw materials — {products.length} specialty products
            across {categories.length} divisions, sourced directly from their origin states and
            supplied in bulk across India.
          </p>
        </div>
      </section>

      <div style={{ background: 'var(--ivory)' }}>
        <ProductCatalogue
          products={products}
          categories={categories}
          initialQuery={searchParams.q || ''}
        />
      </div>

      <div style={{ background: 'var(--ivory)', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="context-banner">
            <div style={{ fontSize: '1.75rem', lineHeight: 1 }}>ℹ️</div>
            <p>
              <strong>Note for buyers:</strong> {SITE.name} supplies an exhaustive range of daily-use
              food raw materials. The catalogue above highlights our specialised origin-specific
              sourcing — <strong>our inventory is not limited to these items.</strong> Contact us for
              any specific bulk requirement not listed here.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
