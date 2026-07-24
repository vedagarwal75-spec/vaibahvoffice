// ─────────────────────────────────────────────────────────────
//  Single source of truth for business / contact / SEO details.
//  Edit here to change it everywhere on the site.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: 'Shubham Trading Company',
  shortName: 'Shubham Trading Co.',
  legalName: 'Shubham Trading Company',
  tagline: 'Est. 2004 · Kolkata, India',
  founded: '2004',
  // Public URL of the deployed site (used for canonical links, sitemap, OG).
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://shubhamtradingco.in').replace(/\/$/, ''),

  description:
    'Shubham Trading Company is a Kolkata-based bulk food raw material supplier serving HORECA, hospitals, army & BSF canteens, distributors and wholesalers across India since 2004. Authentic regional rice, grains, millets, pulses, whole & ground spices, seeds, dried herbs and dry fruits — sourced directly from their origin states.',

  // Contact
  phone: '033 6598 1799',
  phoneHref: 'tel:03365981799',
  whatsapp: '+91 98304 23871',
  whatsappNumber: '919830423871',
  whatsappHref: 'https://wa.me/919830423871',
  email: 'sales@shubhamtradingco.in',
  emailComposeHref:
    'https://mail.google.com/mail/?view=cm&fs=1&to=sales@shubhamtradingco.in',

  address: {
    street: '100 A Kavi Sukanto Sarani',
    locality: 'Kolkata',
    region: 'West Bengal',
    postalCode: '700085',
    country: 'IN',
    countryName: 'India',
  },
  geo: { lat: 22.5726, lng: 88.3639 }, // Kolkata (approx; update to exact if desired)
  hours: 'Monday – Saturday, 10:00 AM – 6:00 PM',
  openingHoursSpec: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '10:00',
    closes: '18:00',
  },

  // Buyer segments served (used for copy + keywords)
  segments: [
    'Hotels, Restaurants & Caterers (HORECA)',
    'Hospitals & Institutional Kitchens',
    'Army & BSF Canteens',
    'Distributors',
    'Wholesalers & Retailers',
    'Food Processors',
  ],

  stats: [
    { value: '20+', label: 'Years in Operation' },
    { value: '18+', label: 'Origin States Covered' },
    { value: '74+', label: 'Specialty Products' },
    { value: 'PAN', label: 'India Supply Network' },
  ],

  // Broad keyword phrases woven into <head> and copy.
  keywords: [
    'bulk food raw material supplier',
    'wholesale spices supplier Kolkata',
    'HORECA raw material supplier India',
    'wholesale rice dal pulses supplier',
    'bulk masala supplier India',
    'regional Indian spices wholesale',
    'army canteen food supplier',
    'hospital kitchen raw material supplier',
    'bulk dry fruits supplier India',
    'wholesale grains millets supplier',
    'Shubham Trading Company',
    'B2B food ingredients supplier Kolkata',
  ],
} as const;

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/buyers', label: 'Who We Supply' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
] as const;
