// Buyer-type landing pages — high-value B2B long-tail SEO
// (e.g. "bulk pulses supplier for HORECA Kolkata"). Real, distinct content
// per buyer segment — not templated filler.

export interface BuyerType {
  slug: string;
  name: string;           // short label
  h1: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string[];        // paragraphs
  needs: { title: string; text: string }[];
  supplies: string[];     // category keys relevant to this buyer
  points: { icon: string; title: string; text: string }[];
  keywords: string[];
}

export const BUYERS: BuyerType[] = [
  {
    slug: 'horeca',
    name: 'HORECA — Hotels, Restaurants & Caterers',
    h1: 'Bulk Food Raw Material Supplier for HORECA',
    metaTitle: 'HORECA Bulk Food Supplier — Hotels, Restaurants, Caterers',
    metaDescription:
      'Bulk spices, rice, pulses, oilseeds and dry fruits for hotels, restaurants and catering companies. Consistent quality, spec-matched grades and reliable pan-India dispatch from Shubham Trading Company, Kolkata.',
    eyebrow: 'Hotels · Restaurants · Catering',
    intro: [
      'Hotel and restaurant kitchens run on consistency — the same grade, the same aroma, the same yield, order after order. Shubham Trading Company supplies HORECA buyers with origin-sourced rice, whole and ground spices, pulses, oilseeds and dry fruits in bulk, matched to your kitchen’s specifications.',
      'From five-star hotel chains and banquet caterers to standalone restaurants and cloud kitchens, we structure supply around your menu, your volumes and your dispatch schedule — so your chefs never have to compromise on a recipe because of a substitution.',
    ],
    needs: [
      { title: 'Spec consistency', text: 'The same variety and grade every cycle — Basmati length, chilli colour value, dal polish — so dishes taste identical across outlets.' },
      { title: 'Menu-wide range', text: 'One supplier for rice, dals, whole spices, masala powders, oilseeds, dried herbs and dry fruits — fewer vendors to manage.' },
      { title: 'Reliable dispatch', text: 'Planned, repeatable deliveries that fit banquet calendars and multi-outlet operations.' },
    ],
    supplies: ['Rice', 'Whole Spices', 'Ground Spices & Powders', 'Pulses & Legumes', 'Dry Fruits & Nuts', 'Dried Herbs & Seasonings'],
    points: [
      { icon: '👨‍🍳', title: 'Kitchen-grade quality', text: 'Origin-sourced produce selected for flavour, colour and cooking yield — not just price.' },
      { icon: '📋', title: 'Spec-matched supply', text: 'Tell us your grades and pack sizes; we lock them in for every repeat order.' },
      { icon: '🚚', title: 'Multi-outlet logistics', text: 'Coordinated dispatch to central kitchens, outlets or banquet venues across India.' },
    ],
    keywords: ['bulk spices supplier for hotels', 'restaurant raw material supplier', 'HORECA food supplier India', 'catering bulk ingredients supplier', 'hotel kitchen spice supplier Kolkata'],
  },
  {
    slug: 'hospitals-institutional',
    name: 'Hospitals & Institutional Kitchens',
    h1: 'Bulk Food Supplier for Hospitals & Institutional Kitchens',
    metaTitle: 'Hospital & Institutional Kitchen Bulk Food Supplier',
    metaDescription:
      'Reliable bulk supply of rice, pulses, spices and grains for hospital kitchens, canteens and institutional caterers. Consistent grades, dependable volumes and pan-India delivery from Shubham Trading Company.',
    eyebrow: 'Hospitals · Canteens · Institutions',
    intro: [
      'Institutional kitchens cook at scale and to a budget, without room for supply gaps. Shubham Trading Company supplies hospitals, institutional caterers and large canteens with staple rice, pulses, grains, millets and everyday spices in dependable bulk quantities.',
      'We understand institutional procurement — predictable pricing, consistent grades, documented supply and volumes planned around patient, staff and resident meal counts.',
    ],
    needs: [
      { title: 'Dependable volumes', text: 'Staples that arrive on schedule so meal service never slips.' },
      { title: 'Nutrition-friendly range', text: 'Millets, pulses and whole grains for wellness and diet menus alongside daily staples.' },
      { title: 'Budget stability', text: 'Wholesale pricing structured for large, repeat institutional volumes.' },
    ],
    supplies: ['Rice', 'Grains', 'Millets', 'Pulses & Legumes', 'Ground Spices & Powders', 'Seeds & Superfoods'],
    points: [
      { icon: '🏥', title: 'Institution-ready supply', text: 'Bulk staples and spices in the volumes and cadence large kitchens need.' },
      { icon: '🌾', title: 'Wellness range', text: 'Ragi, jowar, bajra, pulses and superfood seeds for hospital and wellness menus.' },
      { icon: '📦', title: 'Bulk packaging', text: 'Packed to suit central stores and institutional handling — tell us what works for your kitchen.' },
    ],
    keywords: ['hospital kitchen food supplier', 'institutional bulk rice pulses supplier', 'canteen raw material supplier India', 'bulk millets supplier for hospitals'],
  },
  {
    slug: 'army-bsf-canteens',
    name: 'Army & BSF Canteens',
    h1: 'Bulk Food Raw Material Supplier for Army & BSF Canteens',
    metaTitle: 'Army & BSF Canteen Bulk Food Raw Material Supplier',
    metaDescription:
      'Bulk rice, pulses, spices and grains for army canteens, BSF camps and defence catering. Dependable large-volume supply, sturdy bulk packaging and reliable dispatch from Shubham Trading Company, Kolkata.',
    eyebrow: 'Defence · Canteens · Camps',
    intro: [
      'Defence canteens and camp kitchens feed large numbers reliably, often at short notice. Shubham Trading Company has long supplied army and BSF canteen supply chains with bulk rice, pulses, grains and everyday spices in the volumes and packaging field kitchens require.',
      'We prioritise dependable dispatch and robust bulk packaging so orders reach camps and canteens intact and on time.',
    ],
    needs: [
      { title: 'Large-volume reliability', text: 'High-volume staples supplied consistently to feed large numbers.' },
      { title: 'Rugged packaging', text: 'Sturdy bulk packing built for long-haul transit and field storage.' },
      { title: 'Fast turnaround', text: 'WhatsApp-first coordination for urgent dispatch requirements.' },
    ],
    supplies: ['Rice', 'Grains', 'Pulses & Legumes', 'Whole Spices', 'Ground Spices & Powders'],
    points: [
      { icon: '🎖️', title: 'Defence supply experience', text: 'Long-standing supply to army and BSF canteen chains.' },
      { icon: '⚡', title: 'Urgent dispatch', text: 'Use WhatsApp for time-critical camp and canteen requirements.' },
      { icon: '🛡️', title: 'Transit-ready packing', text: 'Durable bulk packaging for long-haul delivery to camps.' },
    ],
    keywords: ['army canteen food supplier', 'BSF canteen bulk supplier', 'defence bulk rice pulses supplier India', 'canteen raw material supplier'],
  },
  {
    slug: 'distributors-wholesalers',
    name: 'Distributors & Wholesalers',
    h1: 'Bulk Supply for Distributors & Wholesalers',
    metaTitle: 'Bulk Supplier for Distributors & Wholesalers — Trade Pricing',
    metaDescription:
      'Trade-priced bulk rice, spices, pulses and dry fruits for distributors, wholesalers and retailers. Origin sourcing, consistent grades and pan-India logistics from Shubham Trading Company, Kolkata.',
    eyebrow: 'Distribution · Wholesale · Trade',
    intro: [
      'Distributors and wholesalers need a source they can resell with confidence — consistent grades, competitive trade pricing and volumes that keep their own customers stocked. Shubham Trading Company supplies the trade with origin-sourced commodities across every daily-use category.',
      'With two decades of trade relationships and a pan-India logistics network, we support regional distributors and wholesale buyers with reliable, relationship-based procurement.',
    ],
    needs: [
      { title: 'Trade margins', text: 'Wholesale pricing structured for resale.' },
      { title: 'Grade consistency', text: 'The same quality every lot, so your customers stay loyal.' },
      { title: 'Volume availability', text: 'Year-round availability across the full commodity range.' },
    ],
    supplies: ['Rice', 'Pulses & Legumes', 'Whole Spices', 'Ground Spices & Powders', 'Seeds & Superfoods', 'Dry Fruits & Nuts'],
    points: [
      { icon: '📈', title: 'Trade pricing', text: 'Competitive, volume-based pricing for resale margins.' },
      { icon: '🤝', title: 'Relationship supply', text: 'Long-term, relationship-based procurement partnerships.' },
      { icon: '🚛', title: 'Pan-India freight', text: 'Established transporter network for delivery to your warehouse.' },
    ],
    keywords: ['wholesale distributor food supplier', 'bulk commodity supplier for wholesalers', 'trade price spices rice pulses supplier', 'regional distributor supplier India'],
  },
  {
    slug: 'government-tenders',
    name: 'Government & PSU Tenders',
    h1: 'Bulk Food Supply for Government & PSU Tenders',
    metaTitle: 'Government & PSU Tender Bulk Food Raw Material Supplier',
    metaDescription:
      'Bulk rice, pulses, grains and spices for government tenders, PSU canteens and institutional procurement. Large-volume supply, consistent grades and documented dispatch from Shubham Trading Company.',
    eyebrow: 'Government · PSU · Tenders',
    intro: [
      'Government and PSU procurement demands scale, consistency and documentation. Shubham Trading Company supports tender-based and institutional supply with bulk staples — rice, pulses, grains and spices — in the large volumes public procurement requires.',
      'Share your tender specifications and quantities, and we will respond with availability, grades and competitive pricing.',
    ],
    needs: [
      { title: 'Tender-scale volumes', text: 'High-volume supply capacity for large public contracts.' },
      { title: 'Spec adherence', text: 'Grades matched to tender specifications.' },
      { title: 'Documented supply', text: 'Clear paperwork and dependable dispatch schedules.' },
    ],
    supplies: ['Rice', 'Grains', 'Pulses & Legumes', 'Ground Spices & Powders'],
    points: [
      { icon: '🏛️', title: 'Tender capacity', text: 'Volume capability for government and PSU contracts.' },
      { icon: '📑', title: 'Spec-matched', text: 'Supply matched to your tender grade requirements.' },
      { icon: '✅', title: 'Reliable fulfilment', text: 'Consistent, on-schedule dispatch for contract supply.' },
    ],
    keywords: ['government tender food supplier', 'PSU canteen bulk supplier', 'tender rice pulses supplier India', 'institutional procurement supplier'],
  },
  {
    slug: 'export',
    name: 'Export & Overseas Buyers',
    h1: 'Indian-Origin Bulk Ingredients for Export Buyers',
    metaTitle: 'Export Supplier — Indian-Origin Spices, Rice & Pulses in Bulk',
    metaDescription:
      'Sourcing partner for overseas buyers of Indian-origin spices, rice, pulses and dry fruits. Container-load bulk supply, jumbo-bag packaging and documentation support from Shubham Trading Company, Kolkata.',
    eyebrow: 'Export · Overseas Buyers · Container Loads',
    intro: [
      'Overseas buyers sourcing authentic Indian-origin ingredients need a dependable India-side partner. Shubham Trading Company supports export requirements for spices, rice, pulses, seeds and dry fruits — sourced from their origin states and supplied in container-load bulk.',
      'We work with buyers on packaging (jumbo bags / container loads), quality grades and the documentation their import process requires. Share your requirement and destination, and we will revert with a detailed offer.',
    ],
    needs: [
      { title: 'Origin authenticity', text: 'Genuine regional varieties sourced from their origin states.' },
      { title: 'Container-load supply', text: 'Bulk quantities and jumbo-bag packaging for export volumes.' },
      { title: 'Documentation support', text: 'Coordination on grades, packing and the paperwork your import needs.' },
    ],
    supplies: ['Whole Spices', 'Ground Spices & Powders', 'Rice', 'Pulses & Legumes', 'Seeds & Superfoods', 'Dried Chillies & Regional Specialities'],
    points: [
      { icon: '🌍', title: 'Export-oriented supply', text: 'Container-load bulk for overseas buyers of Indian ingredients.' },
      { icon: '📦', title: 'Export packaging', text: 'Jumbo bags and container-load packing options.' },
      { icon: '📄', title: 'Docs coordination', text: 'Support on grades, packing lists and export documentation.' },
    ],
    keywords: ['Indian spices export supplier', 'bulk rice pulses exporter India', 'container load spices supplier', 'export dry fruits supplier Kolkata'],
  },
];

const BY_SLUG = new Map(BUYERS.map((b) => [b.slug, b]));
export const buyerBySlug = (slug: string) => BY_SLUG.get(slug);
