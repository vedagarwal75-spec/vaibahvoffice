import Link from 'next/link';
import type { Product } from '@/lib/types';
import { resolveImage } from '@/lib/image';

export function ProductCard({ product }: { product: Product }) {
  const href = `/products/${product.slug}`;
  return (
    <article className="product-card">
      <Link href={href} className="product-img-wrap" aria-label={product.name}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resolveImage(product.image)}
          alt={`${product.name} — bulk wholesale supply from ${product.origin}`}
          loading="lazy"
          decoding="async"
        />
        <span className="product-origin-tag">{product.origin}</span>
      </Link>
      <div className="product-body">
        <Link href={href}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <p className="product-desc">{product.shortDescription}</p>
        <div className="product-footer">
          <span className="origin-label">📍 {product.origin}</span>
          <Link
            href={`/quote?product=${encodeURIComponent(product.name)}`}
            className="btn-quote"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </article>
  );
}
