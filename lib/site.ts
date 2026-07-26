// ─────────────────────────────────────────────────────────────
//  Single source of truth for business / contact / SEO details.
//  Edit here to change it everywhere on the site.
// ─────────────────────────────────────────────────────────────

/** Strip a trailing slash and force the canonical www host. */
function normaliseSiteUrl(raw: string): string {
  const url = raw.trim().replace(/\/$/, '');
  return url.replace(/^https?:\/\/shubhamtradingco\.in/i, 'https://www.shubhamtradingco.in');
}

export const SITE = {
  name: 'Shubham Trading Company',
  shortName: 'Shubham Trading Co.',
  legalName: 'Shubham Trading Company',
  tagline: 'Est. 2004 · Kolkata, India',
  founded: '2004',
  // Public URL of the deployed site (used for canonical links, sitemap, OG).
  // The live host is the www subdomain (the apex 307-redirects to it), so we
  // normalise here — canonicals/sitemap must point at the final URL, not a redirect.
  url: normaliseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.shubhamtradingco.in'),

  description:
    'Shubham Trading Company is a Kolkata-based bulk food raw material supplier serving HORECA, hospitals, army & BSF canteens, distributors and wholesalers across India since 2004. Authentic regional rice, grains, millets, pulses, whole & ground spices, seeds, dried herbs and dry fruits — sourced directly from their origin states.',

  // Contact
  phone: '033 6598 1799',
  phoneHref: 'tel:03365981799',
  whatsapp: '+91 98304 23871',
  whatsappNumber: '919830423871',
  whatsappHref: 'https://wa.me/919830423871',
  email: 'sales@shubhamtradingco.com',
  emailComposeHref: 'mailto:sales@shubhamtradingco.com',

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

  // ── Google Business Profile ────────────────────────────────────────────
  // Paste your Google Business Profile links here to switch on the
  // "Rate us on Google" call-to-action and the profile link on /feedback.
  //   googleReviewUrl  → the "write a review" short link (https://g.page/r/…/review)
  //   googleProfileUrl → your public profile / maps listing
  // Leave blank to hide the buttons entirely.
  //
  // NOTE: Google does not permit scraping or re-publishing GBP review content,
  // and third-party embed widgets add significant page weight. So we link out
  // to the real profile and keep our own reviews in the Sheet — those are the
  // ones that carry AggregateRating structured data on this site.
  googleReviewUrl: '',
  googleProfileUrl: '',

  // ── Clients ────────────────────────────────────────────────────────────
  // IMPORTANT — read before switching this on.
  //
  // `publishNamedClients` is OFF by default and should stay off until written
  // permission is in hand for EACH organisation named below:
  //   • Hotel groups (ITC, Marriott, Hyatt, Taj, Westin, Oberoi) — their names
  //     and logos are registered trademarks. Publishing them as clients implies
  //     an endorsement / commercial relationship and normally needs sign-off
  //     from each group's brand or legal team (many supply contracts forbid it).
  //   • Defence & paramilitary (Indian Army, BSF, SSB) — in India the Emblems
  //     and Names (Prevention of Improper Use) Act, 1950 restricts commercial
  //     use of these names and insignia. Written authorisation is required.
  //
  // Until then the site shows the honest, defensible segment-level statement
  // below, which needs no third-party permission.
  publishNamedClients: false,
  namedClients: {
    hospitality: ['ITC', 'Marriott', 'Hyatt', 'Taj', 'Westin', 'Oberoi'],
    defence: ['Indian Army', 'BSF', 'Sashastra Seema Bal (SSB)'],
  },
  clientSegments: [
    'Five-star hotel chains',
    'Restaurant & banquet groups',
    'Institutional caterers',
    'Hospitals & institutional kitchens',
    'Army, BSF & paramilitary canteens',
    'Regional distributors & wholesalers',
  ],

  // Statutory registrations — real trust signals for B2B / tender buyers.
  credentials: [
    {
      label: 'GST Number',
      value: '19AAZFS9701K1Z7',
      icon: '🧾',
      note: 'Registered under GST in West Bengal — GST-compliant invoicing for all trade and institutional buyers.',
    },
    {
      label: 'FSSAI License',
      value: '12819019002845',
      icon: '🛡️',
      note: 'Licensed by the Food Safety and Standards Authority of India for the trade and supply of food products.',
    },
    {
      label: 'Udyam Registration',
      value: 'UDYAM-WB-10-0020313',
      icon: '🏛️',
      note: 'Registered MSME under the Government of India’s Udyam scheme — eligible for MSME procurement and tenders.',
    },
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
  { href: '/guides', label: 'Guides' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;
