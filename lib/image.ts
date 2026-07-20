// Resolve a product's `image` field (a filename OR a full URL) to a usable src.

export function resolveImage(image: string | undefined): string {
  const v = (image || '').trim();
  if (!v) return '/images/placeholder.svg';
  if (/^https?:\/\//i.test(v)) return v;
  if (v.startsWith('/')) return v;
  return `/images/products/${v}`;
}

export function absoluteUrl(path: string, siteUrl: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteUrl}${path.startsWith('/') ? '' : '/'}${path}`;
}
