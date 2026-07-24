// Category metadata — the canonical `key` is now a clean, human-readable
// name (also what appears in the Sheet's category dropdown).

export interface CategoryMeta {
  key: string;   // canonical name, stored on products + shown in the Sheet dropdown
  title: string; // display heading (same as key)
  slug: string;  // URL slug
  icon: string;
  intro: string; // SEO intro paragraph for the category page
  keywords: string[];
}

export const CATEGORIES: CategoryMeta[] = [
  {
    key: 'Rice', title: 'Rice', slug: 'rice', icon: '🌾',
    intro:
      'Bulk and wholesale rice sourced directly from India’s finest paddy belts — from long-grain aromatic Basmati and everyday Sona Masuri to regional specialities like Govindbhog, Joha, Black Chakhao and sticky rice. Supplied in bulk to hotels, restaurants, caterers, hospitals and distributors across India.',
    keywords: ['wholesale rice supplier', 'bulk basmati rice', 'sona masuri wholesale', 'bulk rice supplier Kolkata', 'regional rice supplier India'],
  },
  {
    key: 'Grains', title: 'Grains', slug: 'grains', icon: '🌾',
    intro:
      'Wholesale food grains including premium Sharbati wheat, maize (makki) and gluten-free buckwheat — sourced from their origin states and supplied in bulk to flour mills, institutional kitchens and wholesale buyers.',
    keywords: ['wholesale wheat supplier', 'bulk grains supplier India', 'sharbati wheat wholesale', 'buckwheat bulk supplier'],
  },
  {
    key: 'Millets', title: 'Millets', slug: 'millets', icon: '🌱',
    intro:
      'Nutritious bulk millets — Bajra (pearl millet), Jowar (sorghum) and Ragi (finger millet) — high-fibre ancient grains supplied wholesale for health-focused kitchens, food processors and distributors.',
    keywords: ['wholesale millet supplier', 'bulk bajra jowar ragi', 'millet supplier India', 'sorghum pearl millet wholesale'],
  },
  {
    key: 'Whole Spices', title: 'Whole Spices', slug: 'whole-spices', icon: '🫚',
    intro:
      'Whole spices (sabut masala) sourced from India’s spice heartlands — black pepper and cardamom from Kerala, cumin and fennel from Rajasthan, saffron from Kashmir and more. Premium, aromatic and supplied in bulk to HORECA, spice packers and wholesalers.',
    keywords: ['wholesale whole spices supplier', 'sabut masala bulk supplier', 'bulk black pepper cardamom', 'whole spices supplier Kolkata', 'saffron wholesale India'],
  },
  {
    key: 'Ground Spices & Powders', title: 'Ground Spices & Powders', slug: 'ground-spices-powders', icon: '🧂',
    intro:
      'Ground spices and masala powders — turmeric, cumin, coriander, Kashmiri and Guntur chilli powder and more — milled from authentic origin produce and supplied in bulk to kitchens, food manufacturers and wholesale distributors.',
    keywords: ['wholesale spice powder supplier', 'bulk turmeric chilli powder', 'ground masala supplier India', 'kashmiri chilli powder wholesale'],
  },
  {
    key: 'Pulses & Legumes', title: 'Pulses & Legumes', slug: 'pulses-legumes', icon: '🫘',
    intro:
      'Bulk pulses, dals and legumes — toor, chana, moong, urad and masoor dal, rajma, kabuli and desi chana and more. A complete range of daily-use lentils supplied wholesale to institutional kitchens, canteens and distributors across India.',
    keywords: ['wholesale dal supplier', 'bulk pulses supplier India', 'toor chana moong dal wholesale', 'rajma kabuli chana bulk', 'lentils supplier Kolkata'],
  },
  {
    key: 'Seeds & Superfoods', title: 'Seeds & Superfoods', slug: 'seeds-superfoods', icon: '🌻',
    intro:
      'Edible seeds and superfoods — chia, sunflower, sesame, watermelon (magaz), makhana (fox nuts), kalonji and radhuni — supplied in bulk for health foods, sweets, snacks and institutional catering.',
    keywords: ['wholesale seeds supplier', 'bulk makhana chia seeds', 'sesame watermelon seeds wholesale', 'superfood supplier India'],
  },
  {
    key: 'Dried Herbs & Seasonings', title: 'Dried Herbs & Seasonings', slug: 'dried-herbs-seasonings', icon: '🌿',
    intro:
      'Dried herbs and seasonings — oregano, parsley, basil and chilli flakes — for continental kitchens, pizzerias, cloud kitchens and food processors, supplied in bulk quantities.',
    keywords: ['wholesale dried herbs supplier', 'bulk oregano chilli flakes', 'seasonings supplier India', 'dried basil parsley wholesale'],
  },
  {
    key: 'Dried Chillies & Regional Specialities', title: 'Dried Chillies & Regional Specialities', slug: 'dried-chillies-regional', icon: '🌶️',
    intro:
      'Dried chillies and hard-to-source regional specialities — Bhut Jolokia (ghost chilli), Mathania red chilli, Kokum and Rajasthan’s Ker & Sangri. Authentic origin ingredients supplied in bulk to speciality kitchens and distributors.',
    keywords: ['wholesale dried chilli supplier', 'bhut jolokia bulk', 'mathania red chilli wholesale', 'ker sangri kokum supplier', 'regional speciality ingredients India'],
  },
  {
    key: 'Dry Fruits & Nuts', title: 'Dry Fruits & Nuts', slug: 'dry-fruits-nuts', icon: '🥜',
    intro:
      'Premium dry fruits and nuts — almonds, cashews, walnuts, pistachios, raisins and figs — supplied in bulk to sweet shops, bakeries, hotels, gifting companies and wholesale buyers across India.',
    keywords: ['wholesale dry fruits supplier', 'bulk almonds cashews walnuts', 'dry fruit supplier Kolkata', 'raisins figs pistachios wholesale India'],
  },
];

// Map old ALL-CAPS category names (from the original data) → new clean keys.
export const LEGACY_CATEGORY_MAP: Record<string, string> = {
  'RICE': 'Rice',
  'GRAINS': 'Grains',
  'MILLETS': 'Millets',
  'WHOLE SPICES (SABUT MASALA)': 'Whole Spices',
  'GROUND SPICES & POWDERS': 'Ground Spices & Powders',
  'PULSES & LEGUMES': 'Pulses & Legumes',
  'SEEDS & SUPERFOODS': 'Seeds & Superfoods',
  'DRIED HERBS & SEASONINGS': 'Dried Herbs & Seasonings',
  'DRIED CHILLIES & REGIONAL SPECIALTIES': 'Dried Chillies & Regional Specialities',
  'DRY FRUITS & NUTS': 'Dry Fruits & Nuts',
};

const BY_KEY = new Map(CATEGORIES.map((c) => [c.key, c]));
const BY_SLUG = new Map(CATEGORIES.map((c) => [c.slug, c]));

/** Normalise any category string (new or legacy ALL-CAPS) to a clean key. */
export function normaliseCategory(value: string): string {
  const v = (value || '').trim();
  if (BY_KEY.has(v)) return v;
  if (LEGACY_CATEGORY_MAP[v.toUpperCase()]) return LEGACY_CATEGORY_MAP[v.toUpperCase()];
  return v;
}
export function categoryByKey(key: string): CategoryMeta | undefined {
  return BY_KEY.get(normaliseCategory(key));
}
export function categoryBySlug(slug: string): CategoryMeta | undefined {
  return BY_SLUG.get(slug);
}
export function categoryTitle(key: string): string {
  return categoryByKey(key)?.title ?? key;
}
export function categorySlug(key: string): string {
  return categoryByKey(key)?.slug ?? normaliseCategory(key).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
