// The contract between the Google Sheet columns and the app.

export interface Product {
  slug: string;            // auto-generated from name (not in the Sheet)
  name: string;
  category: string;
  origin: string;
  shortDescription: string;
  keywords: string[];
  /** Raw image value from the Sheet's "Photo URL" (filename, URL, or Drive link). */
  image: string;
  featured: boolean;       // "Feature on homepage" checkbox
  visible: boolean;        // "Show on website" checkbox
  /** Generated in code — not a Sheet column. */
  longDescription: string;
  packaging: string;
}

export interface Review {
  name: string;
  company?: string;
  rating: number;          // 1..5
  comment: string;
  date?: string;
  approved: boolean;
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
