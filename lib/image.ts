// Resolve a product's image value (Sheet "Photo URL") to a usable <img> src.
// Accepts: a bare filename, a site-relative path, a full http(s) URL, or a
// Google Drive share link (which we convert to a directly-embeddable URL).

const DRIVE_ID = [
  /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
  /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/,
  /drive\.google\.com\/uc\?(?:export=\w+&)?id=([a-zA-Z0-9_-]+)/,
  /[?&]id=([a-zA-Z0-9_-]+)/,
];

export function resolveImage(image: string | undefined): string {
  const v = (image || '').trim();
  if (!v) return '/images/placeholder.svg';

  // Google Drive share link → embeddable image URL
  if (/drive\.google\.com/.test(v)) {
    for (const re of DRIVE_ID) {
      const m = v.match(re);
      if (m) return `https://lh3.googleusercontent.com/d/${m[1]}=w1200`;
    }
  }
  if (/^https?:\/\//i.test(v)) return v; // any other full URL
  if (v.startsWith('/')) return v;       // site-relative path
  return `/images/products/${v}`;         // bare filename
}

export function absoluteUrl(path: string, siteUrl: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteUrl}${path.startsWith('/') ? '' : '/'}${path}`;
}
