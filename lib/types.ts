// The contract between the Google Sheet columns and the app.

export interface Product {
  slug: string;
  name: string;
  category: string;
  origin: string;
  shortDescription: string;
  /** Comma/line separated search terms, synonyms, regional names. */
  keywords: string[];
  /** Longer SEO body copy for the product page. */
  longDescription: string;
  /** e.g. "Available in bulk (25kg / 50kg)". */
  packaging: string;
  /** A filename in /public/images/products OR a full https:// URL. */
  image: string;
  featured: boolean;
  visible: boolean;
  order: number;
}

export interface Enquiry {
  type: 'Quote' | 'Feedback' | 'Contact';
  name: string;
  company?: string;
  phone?: string;
  email?: string;
  volume?: string;
  product?: string;
  message?: string;
  rating?: string;
  source?: string;
}
