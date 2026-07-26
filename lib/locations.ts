// City / region pages.
//
// These are written with genuinely distinct content per city — local cuisine
// character, what that market actually orders, and real dispatch detail.
// Templated "city-swap" pages are treated as doorway pages by Google, so each
// entry below must say something true and specific about that market.

export interface LocationPage {
  slug: string;
  city: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  /** Distinct opening paragraphs about this market. */
  intro: string[];
  /** What buyers in this city typically order, and why. */
  demand: { title: string; text: string }[];
  /** Category keys most relevant to this market. */
  focusCategories: string[];
  /** Honest dispatch/logistics detail for this destination. */
  logistics: string;
  keywords: string[];
  /** true for our physical base (gets LocalBusiness schema + address). */
  isHeadOffice?: boolean;
}

export const LOCATIONS: LocationPage[] = [
  {
    slug: 'kolkata',
    city: 'Kolkata',
    region: 'West Bengal',
    isHeadOffice: true,
    metaTitle: 'Bulk Food Raw Material Supplier in Kolkata | Wholesale',
    metaDescription:
      'Kolkata-based bulk food raw material supplier since 2004. Wholesale rice, spices, pulses, grains and dry fruits for HORECA, hospitals, canteens and distributors across Kolkata and West Bengal.',
    eyebrow: 'Our Home Base · Est. 2004',
    intro: [
      'Kolkata is where Shubham Trading Company began in 2004, and it remains our home market. Operating from Kavi Sukanto Sarani, we supply the city’s hotels, restaurant groups, caterers, hospitals, canteens and wholesale distributors directly — which means same-city coordination, faster turnarounds and a team that knows your kitchen.',
      'Bengali kitchens have specific, non-negotiable requirements, and we stock for them: Govindbhog rice for pulao and payesh, Radhuni for panch phoron, Kalonji, and mustard for the seed and oil traditions the cuisine is built on. These are the items generic national suppliers routinely substitute — we do not.',
    ],
    demand: [
      { title: 'Bengali speciality staples', text: 'Govindbhog and aromatic rice, Radhuni, Kalonji, mustard seed and panch phoron components — sourced as the genuine variety, not a lookalike substitute.' },
      { title: 'Sweet-shop and bakery inputs', text: 'Kolkata’s mishti and bakery trade buys dry fruits, makhana, cardamom and khoya-adjacent inputs in steady volume through the year.' },
      { title: 'Institutional staples at scale', text: 'Hospitals, canteens and institutional caterers across the city order rice, dals and everyday masalas on repeating monthly cycles.' },
    ],
    focusCategories: ['Rice', 'Whole Spices', 'Pulses & Legumes', 'Seeds & Superfoods', 'Dry Fruits & Nuts'],
    logistics: 'As our head office city, Kolkata orders are coordinated directly by our team with the shortest lead times we offer. Same-city delivery is arranged to your kitchen, central store or warehouse.',
    keywords: ['bulk food supplier Kolkata', 'wholesale spices supplier Kolkata', 'rice dal wholesaler Kolkata', 'HORECA supplier Kolkata', 'Govindbhog rice wholesale Kolkata'],
  },
  {
    slug: 'delhi-ncr',
    city: 'Delhi NCR',
    region: 'Delhi · Gurugram · Noida',
    metaTitle: 'Bulk Food Raw Material Supplier for Delhi NCR | Wholesale',
    metaDescription:
      'Bulk rice, spices, pulses and dry fruits supplied to Delhi NCR hotels, restaurants, caterers and institutional kitchens. Origin-sourced produce dispatched from Kolkata with pan-India freight.',
    eyebrow: 'Northern India',
    intro: [
      'Delhi NCR runs one of India’s densest hospitality and banquet markets — five-star chains, large-format banquet halls, institutional caterers and a huge cloud-kitchen base, all buying at volume and to spec.',
      'NCR kitchens lean heavily on long-grain Basmati, rich Mughlai and Punjabi masala profiles, and dry fruits for both kitchen use and corporate gifting. We supply these from their origin belts — Basmati from the Haryana–Punjab belt, cumin and coriander from Rajasthan, Kashmiri chilli for colour without excess heat.',
    ],
    demand: [
      { title: 'Basmati at banquet volume', text: 'Long-grain aromatic Basmati is the default for NCR banquets and Mughlai menus — bought by grain length and ageing, not just price.' },
      { title: 'Rich masala profiles', text: 'Whole and ground garam masala components — cardamom, mace, nutmeg, Kashmiri chilli — for North Indian and Mughlai kitchens.' },
      { title: 'Dry fruits for kitchen and gifting', text: 'Almonds, cashews, pistachios, raisins and figs, with demand spiking through the festive and wedding seasons.' },
    ],
    focusCategories: ['Rice', 'Whole Spices', 'Ground Spices & Powders', 'Dry Fruits & Nuts', 'Pulses & Legumes'],
    logistics: 'NCR orders move by road freight through our established transporter partners. Delivery timelines and freight are confirmed when we quote, based on load size and destination within Delhi, Gurugram, Noida or Faridabad.',
    keywords: ['bulk food supplier Delhi NCR', 'wholesale basmati rice supplier Delhi', 'bulk spices supplier Gurugram', 'HORECA raw material supplier Noida', 'dry fruits wholesale Delhi'],
  },
  {
    slug: 'mumbai',
    city: 'Mumbai',
    region: 'Maharashtra',
    metaTitle: 'Bulk Food Raw Material Supplier for Mumbai | Wholesale',
    metaDescription:
      'Wholesale spices, rice, pulses and dry fruits for Mumbai hotels, restaurants, caterers and distributors. Origin-sourced bulk supply including kokum and coastal ingredients.',
    eyebrow: 'Western India',
    intro: [
      'Mumbai’s food economy spans five-star hospitality, an enormous restaurant and cloud-kitchen base, industrial catering and one of India’s biggest wholesale trades — with volume and consistency mattering equally.',
      'Coastal and Maharashtrian cooking gives the market a distinct profile: kokum as a souring agent, sesame and groundnut for chutneys and sweets, and heavy year-round demand for pulses. We supply these alongside the full national range.',
    ],
    demand: [
      { title: 'Coastal souring and tempering', text: 'Kokum, mustard, sesame and curry-leaf-adjacent staples for Maharashtrian and Konkan cooking.' },
      { title: 'High-volume pulses', text: 'Toor, chana, moong and masoor dal move continuously through Mumbai’s catering and institutional kitchens.' },
      { title: 'Sweets and farsan inputs', text: 'Sesame, groundnut, cardamom and dry fruits for the city’s mithai, farsan and bakery trade.' },
    ],
    focusCategories: ['Pulses & Legumes', 'Whole Spices', 'Seeds & Superfoods', 'Dried Chillies & Regional Specialities', 'Dry Fruits & Nuts'],
    logistics: 'Mumbai consignments are dispatched by road freight to your warehouse, central kitchen or distribution point. We confirm timelines and freight at the quoting stage.',
    keywords: ['bulk food supplier Mumbai', 'wholesale spices supplier Mumbai', 'bulk dal supplier Mumbai', 'kokum wholesale supplier', 'HORECA supplier Mumbai'],
  },
  {
    slug: 'bengaluru',
    city: 'Bengaluru',
    region: 'Karnataka',
    metaTitle: 'Bulk Food Raw Material Supplier for Bengaluru | Wholesale',
    metaDescription:
      'Bulk Sona Masuri rice, millets, pulses and South Indian spices for Bengaluru hotels, cloud kitchens, tech-campus caterers and institutional buyers. Origin-sourced wholesale supply.',
    eyebrow: 'Southern India',
    intro: [
      'Bengaluru combines traditional South Indian food service with the country’s largest corporate-campus catering operation and a dense cloud-kitchen ecosystem — all of which buy staples in serious, predictable volume.',
      'The staple profile here is distinct: Sona Masuri rather than Basmati as the everyday rice, urad and chana dal for idli–dosa batter at scale, and fast-growing demand for millets driven by Karnataka’s ragi tradition and the wellness-menu trend.',
    ],
    demand: [
      { title: 'Sona Masuri as the daily rice', text: 'The default everyday rice for South Indian kitchens — bought by the tonne by campus caterers and institutional kitchens.' },
      { title: 'Batter-grade dals', text: 'Urad and chana dal in consistent grades, because idli and dosa batter fails on inconsistent lentils.' },
      { title: 'Millets for wellness menus', text: 'Ragi, jowar and bajra for Karnataka’s millet tradition and corporate wellness menus.' },
    ],
    focusCategories: ['Rice', 'Millets', 'Pulses & Legumes', 'Ground Spices & Powders', 'Seeds & Superfoods'],
    logistics: 'Bengaluru orders are dispatched by road freight, with timelines and freight confirmed when we quote. We supply central kitchens, campus caterers and distributor warehouses.',
    keywords: ['bulk food supplier Bengaluru', 'sona masuri rice wholesale Bangalore', 'bulk ragi millet supplier Bengaluru', 'urad dal wholesale Bangalore', 'cloud kitchen raw material supplier'],
  },
  {
    slug: 'hyderabad',
    city: 'Hyderabad',
    region: 'Telangana',
    metaTitle: 'Bulk Food Raw Material Supplier for Hyderabad | Wholesale',
    metaDescription:
      'Wholesale rice, Guntur chilli, spices and pulses for Hyderabad biryani kitchens, hotels, caterers and distributors. Bulk supply sourced from origin states.',
    eyebrow: 'Southern India',
    intro: [
      'Hyderabad’s kitchens are defined by biryani at commercial scale — and biryani is unforgiving about ingredients. Rice grain length and ageing, saffron quality and chilli heat all show up directly in the finished dish.',
      'We are well placed for this market: Guntur chilli and turmeric come from neighbouring Andhra Pradesh, and we supply Kashmiri chilli for colour, genuine saffron for the dum layer, and long-grain Basmati for premium biryani alongside everyday Sona Masuri.',
    ],
    demand: [
      { title: 'Biryani-grade rice', text: 'Long-grain aged Basmati for premium biryani, with Sona Masuri for everyday service.' },
      { title: 'Guntur and Kashmiri chilli', text: 'Guntur for heat, Kashmiri for colour — the two-chilli approach most Hyderabadi kitchens rely on.' },
      { title: 'Whole garam spices and saffron', text: 'Cardamom, mace, cloves, bay leaf and genuine Kashmiri saffron for dum-style cooking.' },
    ],
    focusCategories: ['Rice', 'Whole Spices', 'Ground Spices & Powders', 'Dried Chillies & Regional Specialities', 'Pulses & Legumes'],
    logistics: 'Hyderabad orders are dispatched by road freight to your kitchen, central store or warehouse, with timelines confirmed at quoting.',
    keywords: ['bulk food supplier Hyderabad', 'biryani rice wholesale Hyderabad', 'guntur chilli powder wholesale', 'bulk spices supplier Hyderabad', 'saffron wholesale Hyderabad'],
  },
  {
    slug: 'guwahati',
    city: 'Guwahati',
    region: 'Assam & the North-East',
    metaTitle: 'Bulk Food Raw Material Supplier for Guwahati & North-East',
    metaDescription:
      'Bulk rice, pulses, spices and regional specialities supplied to Guwahati and North-East India — including Joha rice, black rice and Bhut Jolokia. Serving HORECA, canteens and distributors.',
    eyebrow: 'North-East India',
    intro: [
      'Guwahati is the commercial gateway to the North-East, and it is a market big national suppliers routinely under-serve. Our eastern base makes it a natural extension of our home region rather than an afterthought.',
      'The region also produces ingredients we source and supply nationally — Joha rice and Bhut Jolokia from Assam, Chakhao black rice from Manipur, sticky rice from Arunachal — so we work with these origins in both directions, and understand the varieties properly.',
    ],
    demand: [
      { title: 'Regional rice varieties', text: 'Joha aromatic rice, Chakhao black rice and sticky rice for North-Eastern kitchens and speciality menus.' },
      { title: 'Bhut Jolokia and local heat', text: 'Genuine Assam ghost chilli, supplied dried and in bulk.' },
      { title: 'Defence and institutional supply', text: 'The region’s significant army, BSF and paramilitary presence drives steady bulk staple demand.' },
    ],
    focusCategories: ['Rice', 'Dried Chillies & Regional Specialities', 'Pulses & Legumes', 'Whole Spices', 'Millets'],
    logistics: 'Guwahati and the wider North-East are served from our eastern base through transporters who run these routes regularly — an advantage over suppliers dispatching from western or southern India.',
    keywords: ['bulk food supplier Guwahati', 'wholesale rice supplier Assam', 'bhut jolokia wholesale supplier', 'North East India food supplier', 'joha rice wholesale'],
  },
];

const BY_SLUG = new Map(LOCATIONS.map((l) => [l.slug, l]));
export const locationBySlug = (slug: string) => BY_SLUG.get(slug);
