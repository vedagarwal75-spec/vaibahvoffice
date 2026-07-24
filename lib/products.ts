// Product + review data access — the API the pages use.
// Reads from the Google Sheet with a bundled fallback.

import { cache } from 'react';
import type { Product, Review } from './types';
import { fetchProductsFromSheet, fetchReviewsFromSheet, slugify } from './sheet';
import { categoryByKey, categorySlug, categoryTitle, normaliseCategory, CATEGORIES } from './categories';
import rawFallback from '@/data/products.json';

// Built-in photo filename per product slug (used when the Sheet's Photo URL is blank).
const BUILTIN_IMAGE = new Map<string, string>(
  (rawFallback as any[])
    .map((r) => [slugify(r.name), r._image] as [string, string])
    .filter(([, f]) => Boolean(f)),
);

function generateLongDescription(p: Product): string {
  const cat = categoryTitle(p.category);
  const alt = p.keywords
    .filter((k) => !/wholesale|bulk|supplier|india/i.test(k) && !k.toLowerCase().includes(p.name.toLowerCase()))
    .slice(0, 3);
  const altLine = alt.length ? ` Also known as ${alt.join(', ')}.` : '';
  return (
    `${p.name} supplied in bulk and wholesale quantities by Shubham Trading Company, Kolkata.${altLine} ` +
    `${p.shortDescription}. Sourced from ${p.origin || 'trusted origin regions'} and part of our ${cat} range, ` +
    `it is available for reliable bulk supply to hotels, restaurants, caterers, hospitals, army & BSF canteens, ` +
    `distributors and wholesalers across India. Contact us for current availability, grade specifications, ` +
    `packaging options and competitive wholesale pricing.`
  );
}

function finalise(p: Product): Product {
  if (!p.image) {
    const f = BUILTIN_IMAGE.get(p.slug);
    if (f) p.image = `/images/products/${f}`;
  }
  if (!p.longDescription) p.longDescription = generateLongDescription(p);
  return p;
}

const FALLBACK: Product[] = (rawFallback as any[]).map((r) => finalise({
  slug: slugify(r.name),
  name: r.name,
  category: normaliseCategory(r.category),
  origin: r.origin || '',
  shortDescription: r.description || r.shortDescription || '',
  keywords: String(r.keywords || '').split(/[,;\n|]/).map((s: string) => s.trim()).filter(Boolean),
  image: r.photoUrl || '',
  featured: r.featured === undefined ? false : Boolean(r.featured),
  visible: r.showOnWebsite === undefined ? true : Boolean(r.showOnWebsite),
  longDescription: '',
  packaging: 'Available in bulk (25kg / 50kg)',
}));

export const getAllProducts = cache(async (): Promise<Product[]> => {
  const fromSheet = await fetchProductsFromSheet();
  const list = fromSheet && fromSheet.length ? fromSheet.map(finalise) : FALLBACK;
  return list;
});

export const getVisibleProducts = cache(async (): Promise<Product[]> => {
  return (await getAllProducts()).filter((p) => p.visible);
});

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return (await getVisibleProducts()).find((p) => p.slug === slug);
}
export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const all = await getVisibleProducts();
  const featured = all.filter((p) => p.featured);
  return (featured.length ? featured : all).slice(0, limit);
}
export async function getProductsByCategory(key: string): Promise<Product[]> {
  const k = normaliseCategory(key);
  return (await getVisibleProducts()).filter((p) => p.category === k);
}
export async function getRelatedProducts(p: Product, limit = 4): Promise<Product[]> {
  return (await getVisibleProducts()).filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, limit);
}

export async function getCategoriesInUse() {
  const products = await getVisibleProducts();
  const keysInOrder: string[] = [];
  for (const p of products) if (!keysInOrder.includes(p.category)) keysInOrder.push(p.category);
  return keysInOrder.map((key) => {
    const meta = categoryByKey(key);
    return {
      key, title: categoryTitle(key), slug: categorySlug(key),
      icon: meta?.icon ?? '•', intro: meta?.intro ?? '', keywords: meta?.keywords ?? [],
      count: products.filter((p) => p.category === key).length,
    };
  });
}

// ── Reviews ──
export const getApprovedReviews = cache(async (): Promise<Review[]> => {
  const all = await fetchReviewsFromSheet();
  return (all || []).filter((r) => r.approved && r.rating > 0);
});

export async function getReviewSummary(): Promise<{ average: number; count: number } | null> {
  const reviews = await getApprovedReviews();
  if (!reviews.length) return null;
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  return { average: Math.round(avg * 10) / 10, count: reviews.length };
}

export { CATEGORIES };
