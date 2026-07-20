// Product data access — the single API the pages use to read products.
// Reads from the Google Sheet (via Apps Script) with a bundled fallback.

import { cache } from 'react';
import type { Product } from './types';
import { fetchProductsFromSheet, normaliseRow } from './sheet';
import { categoryByKey, categorySlug, categoryTitle, CATEGORIES } from './categories';
import rawFallback from '@/data/products.json';

/** Auto-derive a few sensible keywords when the Sheet hasn't set any. */
function deriveKeywords(p: Product): string[] {
  const base = p.name.replace(/\([^)]*\)/g, '').trim();
  const cat = categoryTitle(p.category);
  return Array.from(
    new Set(
      [
        p.name,
        base,
        `${base} wholesale`,
        `bulk ${base}`,
        `${base} supplier`,
        `wholesale ${cat.toLowerCase()}`,
        p.origin && `${base} ${p.origin}`,
      ].filter(Boolean) as string[],
    ),
  );
}

const FALLBACK: Product[] = (rawFallback as any[]).map((r, i) => {
  const p = normaliseRow(r, i);
  if (p.keywords.length === 0) p.keywords = deriveKeywords(p);
  if (!p.longDescription) {
    p.longDescription =
      `${p.name} supplied in bulk by ${''}Shubham Trading Company. ${p.shortDescription}. ` +
      `Sourced from ${p.origin}, available for wholesale supply to HORECA, hospitals, canteens, ` +
      `distributors and wholesalers across India. Contact us for current availability, ` +
      `specifications and competitive bulk pricing.`;
  }
  return p;
});

/** All products (Sheet first, else bundled fallback). Cached per request. */
export const getAllProducts = cache(async (): Promise<Product[]> => {
  const fromSheet = await fetchProductsFromSheet();
  const list = (fromSheet && fromSheet.length ? fromSheet : FALLBACK).map((p) => {
    if (p.keywords.length === 0) p.keywords = deriveKeywords(p);
    return p;
  });
  return list.sort((a, b) => a.order - b.order);
});

/** Products marked visible — what the public catalogue shows. */
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
  return (await getVisibleProducts()).filter((p) => p.category === key);
}

export async function getRelatedProducts(p: Product, limit = 4): Promise<Product[]> {
  const same = (await getVisibleProducts()).filter(
    (x) => x.category === p.category && x.slug !== p.slug,
  );
  return same.slice(0, limit);
}

/** Categories that actually contain visible products, in catalogue order. */
export async function getCategoriesInUse() {
  const products = await getVisibleProducts();
  const keysInOrder: string[] = [];
  for (const p of products) if (!keysInOrder.includes(p.category)) keysInOrder.push(p.category);
  return keysInOrder.map((key) => {
    const meta = categoryByKey(key);
    return {
      key,
      title: categoryTitle(key),
      slug: categorySlug(key),
      icon: meta?.icon ?? '•',
      intro: meta?.intro ?? '',
      keywords: meta?.keywords ?? [],
      count: products.filter((p) => p.category === key).length,
    };
  });
}

export { CATEGORIES };
