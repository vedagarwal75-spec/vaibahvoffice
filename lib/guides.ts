// Buying guides — genuinely useful reference content for bulk buyers.
// Each guide targets a real question buyers ask, with specific detail rather
// than generic filler (thin, mass-produced pages are a Google spam target).

export interface GuideSection {
  heading: string;
  body: string[];
  bullets?: { term: string; text: string }[];
}

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  readingTime: string;
  icon: string;
  sections: GuideSection[];
  faqs?: { q: string; a: string }[];
  related?: string[]; // category keys
  keywords: string[];
}

export const GUIDES: Guide[] = [
  {
    slug: 'bulk-ordering-process',
    title: 'The Bulk Ordering Process, Explained (Enquiry to Delivery)',
    metaTitle: 'Bulk Ordering Process Explained — Enquiry to Delivery',
    metaDescription:
      'How bulk food raw material ordering actually works: enquiry, quotation, grade confirmation, order placement, packing, dispatch and delivery. A practical guide for first-time institutional buyers.',
    summary:
      'If you have never bought food raw materials at wholesale scale, the process differs from retail purchasing in a few important ways. Here is what actually happens, step by step.',
    readingTime: '5 min read',
    icon: '📋',
    sections: [
      {
        heading: '1. Share a specific enquiry',
        body: [
          'The single biggest thing that speeds up a quote is specificity. "Rice" cannot be priced; "Sona Masuri, approximately 2 tonnes per month, delivered to a central kitchen in Bengaluru" can be priced immediately.',
          'A useful enquiry includes the item list, an approximate monthly or one-time volume, the delivery city, and any grade preference you already know. If you are unsure about grades, say so — that is a normal question and we will walk you through the options.',
        ],
      },
      {
        heading: '2. Quotation and grade confirmation',
        body: [
          'Commodity prices move with harvest cycles, weather and mandi rates, so bulk quotes are issued against current availability rather than a fixed published price list. That is why serious suppliers quote per enquiry rather than posting rate cards.',
          'At this stage you should agree the grade, not just the item — grain length and ageing for rice, heat and colour for chilli, polish for dals. Locking the specification now is what makes repeat orders consistent later.',
        ],
      },
      {
        heading: '3. Order confirmation and packing',
        body: [
          'Once the grade, volume, price and delivery point are agreed, the order is confirmed and packed. Standard bulk packing is 25kg or 50kg sacks; jumbo bags and container-load packing are used for very large institutional or export orders.',
          'Tell us at this stage if your storage or handling constrains pack size — a hospital central store and a container-load export buyer need genuinely different packing.',
        ],
      },
      {
        heading: '4. Dispatch and delivery',
        body: [
          'Dispatch is by road freight through transporter partners. Timelines depend on destination and load size, and are confirmed when quoting rather than promised generically.',
          'For repeat institutional supply, most buyers settle into a predictable cycle — a monthly or fortnightly dispatch against a standing requirement — which removes most of the back-and-forth from the process.',
        ],
      },
    ],
    faqs: [
      { q: 'How long does a bulk quote take?', a: 'For a specific enquiry with item list and volumes, we typically respond within one business day with availability and pricing.' },
      { q: 'Can I order a single item in bulk, or must I order the full range?', a: 'You can order a single item. Many buyers start with one or two lines and expand once the supply relationship is established.' },
      { q: 'Do bulk prices change between orders?', a: 'Yes — agricultural commodity prices move with harvest cycles and market rates. We confirm pricing at the time of each order.' },
    ],
    related: ['Rice', 'Pulses & Legumes'],
    keywords: ['bulk ordering process', 'how to buy food raw material in bulk', 'wholesale ordering MOQ delivery', 'institutional food procurement process'],
  },
  {
    slug: 'bulk-packaging-and-moq',
    title: 'Bulk Packaging & MOQ Guide (25kg, 50kg and Jumbo Bags)',
    metaTitle: 'Bulk Packaging & MOQ Guide — 25kg, 50kg, Jumbo Bags',
    metaDescription:
      'Packaging options and minimum order quantities for bulk food raw materials — 25kg and 50kg sacks, jumbo bags and container loads, and how to choose the right pack size for your kitchen or warehouse.',
    summary:
      'Pack size affects storage, handling, wastage and freight cost. Choosing badly is a recurring, invisible expense. Here is how to pick.',
    readingTime: '4 min read',
    icon: '📦',
    sections: [
      {
        heading: 'Standard pack sizes',
        body: ['Most bulk food raw materials move in a small number of standard formats:'],
        bullets: [
          { term: '25kg sacks', text: 'The most common institutional format. Manageable for a single person to handle, fits standard kitchen storage, and reduces open-bag exposure for aromatic items like ground spices.' },
          { term: '50kg sacks', text: 'The economical choice for high-turnover staples such as rice and dals in large kitchens, canteens and distributor warehouses. Lower packing cost per kilo, but needs proper handling.' },
          { term: 'Jumbo bags', text: 'Used for very large institutional and export volumes, typically handled with equipment rather than by hand.' },
          { term: 'Container loads', text: 'For export buyers, packed and documented for shipping.' },
        ],
      },
      {
        heading: 'How to choose the right size',
        body: [
          'The rule of thumb is turnover: pick the largest pack you can consume before quality degrades. A 50kg sack of Sona Masuri in a campus kitchen turning over weekly is efficient. The same 50kg sack of ground garam masala in a small restaurant is a slow-motion loss — ground spices lose aroma steadily once opened.',
          'As a rough guide, high-turnover staples (rice, common dals, wheat) suit 50kg. Aromatics and ground spices usually suit 25kg or smaller unless your consumption is genuinely high.',
        ],
      },
      {
        heading: 'Minimum order quantities',
        body: [
          'We are a wholesale supplier, so minimums generally start around 25kg–50kg per item, with the practical minimum for an economical order being a consolidated load rather than a single sack.',
          'Ordering several items together almost always improves your effective freight cost, because freight is driven by the consignment rather than the line item. Buyers who consolidate a monthly order across rice, dals and masalas pay meaningfully less per kilo delivered than those ordering one item at a time.',
        ],
      },
    ],
    faqs: [
      { q: 'What is the minimum order quantity?', a: 'Minimums typically start around 25kg–50kg per item. For an economical delivered price, consolidating several items into one consignment is usually better than ordering a single sack.' },
      { q: 'Can you supply in jumbo bags?', a: 'Yes — jumbo bags and container-load packing are available for large institutional and export orders.' },
      { q: 'Can I mix different products in one order?', a: 'Yes, and we recommend it. Consolidating items into a single consignment reduces your effective freight cost per kilo.' },
    ],
    related: ['Rice', 'Ground Spices & Powders'],
    keywords: ['bulk packaging options food', 'MOQ bulk food supplier India', '25kg 50kg sack wholesale', 'jumbo bag food packaging'],
  },
  {
    slug: 'choosing-rice-for-commercial-kitchens',
    title: 'Choosing the Right Rice Variety for Commercial Kitchens',
    metaTitle: 'Choosing Rice for Commercial Kitchens — Variety Guide',
    metaDescription:
      'Basmati, Sona Masuri, Govindbhog, Joha and more — how commercial kitchens should choose rice varieties by dish, cost per plate and cooking behaviour. A practical bulk buying guide.',
    summary:
      'Rice is usually the largest single line in a commercial kitchen’s raw material spend. Choosing by dish rather than by habit is the fastest way to control both cost and quality.',
    readingTime: '6 min read',
    icon: '🌾',
    sections: [
      {
        heading: 'Match the variety to the dish',
        body: ['Different varieties behave differently under commercial cooking. The common ones:'],
        bullets: [
          { term: 'Basmati', text: 'Long grain that elongates and stays separate. The default for biryani, pulao and Mughlai menus. Ageing matters — aged Basmati absorbs more water and separates better, which is why premium biryani kitchens insist on it.' },
          { term: 'Sona Masuri', text: 'Medium grain, lighter and less expensive than Basmati. The everyday workhorse for South Indian kitchens, campus catering and institutional meal service.' },
          { term: 'Govindbhog', text: 'Short-grain aromatic from Bengal. Used for pulao, khichuri and payesh — its aroma is the point, so it is not interchangeable with generic short grain.' },
          { term: 'Joha', text: 'Assamese aromatic small grain, used in North-Eastern cuisine and speciality menus.' },
          { term: 'Black rice (Chakhao)', text: 'Nutrient-dense speciality rice for desserts, health menus and premium presentation.' },
          { term: 'Sticky rice', text: 'Glutinous rice for North-Eastern and East Asian preparations.' },
        ],
      },
      {
        heading: 'Think in cost per plate, not cost per kilo',
        body: [
          'A more expensive rice can produce a lower cost per plate if it yields better. Aged Basmati absorbs more water and elongates more, so a kilo produces more finished servings than the raw price comparison suggests.',
          'Conversely, using premium Basmati for everyday staff meals or plain steamed rice is simply spending money the diner cannot taste. Most well-run kitchens run at least two rice lines: a premium variety for signature dishes and an everyday variety for volume service.',
        ],
      },
      {
        heading: 'What to specify when you order',
        body: [
          'Say the variety, the intended use and your volume. If you know your grain length or ageing preference, state it; if not, tell us the dish and we will recommend the grade.',
          'Consistency matters more than any single delivery. Once a grade works in your kitchen, lock it in for repeat orders so your chefs are not re-calibrating water ratios every cycle.',
        ],
      },
    ],
    faqs: [
      { q: 'Which rice is best for biryani in a commercial kitchen?', a: 'Long-grain aged Basmati. Ageing improves water absorption and grain separation, which is what gives biryani distinct, non-sticky grains.' },
      { q: 'What is the most economical rice for daily institutional meals?', a: 'Sona Masuri is the usual choice — a lighter medium grain at a significantly lower cost than Basmati, well suited to high-volume daily service.' },
      { q: 'Is Govindbhog interchangeable with other short-grain rice?', a: 'No. Govindbhog is bought for its distinctive aroma in Bengali preparations like pulao, khichuri and payesh — a generic short grain will not reproduce it.' },
    ],
    related: ['Rice'],
    keywords: ['best rice for commercial kitchen', 'basmati vs sona masuri bulk', 'rice variety guide restaurants', 'bulk rice buying guide India'],
  },
  {
    slug: 'spice-sourcing-by-origin',
    title: 'Spice Sourcing by Origin State — and Why It Matters',
    metaTitle: 'Spice Sourcing by Origin State — Why Origin Matters',
    metaDescription:
      'Why the origin state of a spice changes its flavour, colour and heat — Kerala pepper and cardamom, Rajasthan cumin, Kashmir saffron, Guntur and Kashmiri chilli. A sourcing guide for bulk buyers.',
    summary:
      'Two bags labelled "red chilli powder" can behave completely differently in a dish. Origin is usually the reason.',
    readingTime: '6 min read',
    icon: '📍',
    sections: [
      {
        heading: 'Origin is a specification, not marketing',
        body: [
          'For most spices, growing region determines the characteristics you actually cook with: essential oil content, colour value, heat and aroma. Two products with the same name from different origins are not substitutes.',
          'The clearest example is chilli. Kashmiri chilli delivers deep red colour with mild heat; Guntur chilli delivers strong heat with less colour. Substituting one for the other does not make a dish slightly different — it makes it wrong. Many Indian kitchens deliberately buy both and blend them.',
        ],
      },
      {
        heading: 'Where the major spices come from',
        body: ['The origins we source from, and what each is known for:'],
        bullets: [
          { term: 'Kerala', text: 'Black pepper, green cardamom, cloves, cinnamon, nutmeg and mace. The Western Ghats climate produces high oil content, which is what drives aroma and pungency.' },
          { term: 'Rajasthan', text: 'Cumin, coriander, fennel, ajwain and fenugreek — the arid-zone seed spices, plus Mathania chilli.' },
          { term: 'Andhra Pradesh', text: 'Guntur chilli and turmeric. Guntur is the reference point for heat in Indian chilli.' },
          { term: 'Kashmir', text: 'Saffron and Kashmiri chilli — the former one of the most adulterated spices in the trade, the latter valued for colour rather than heat.' },
          { term: 'Gujarat', text: 'Mustard seed, sesame and shahi jeera.' },
          { term: 'Assam & the North-East', text: 'Bhut Jolokia (ghost chilli), star anise and regional aromatics.' },
        ],
      },
      {
        heading: 'Why substitution is the real risk in bulk buying',
        body: [
          'At wholesale scale, the commercial temptation is to supply a visually similar, cheaper product from a different origin. It rarely shows up on delivery — it shows up weeks later when a dish tastes different and nobody can explain why.',
          'This is why we tag every product in our catalogue with its origin state, and why we recommend specifying origin in your purchase requirement. If a supplier cannot tell you where a spice came from, treat that as the answer.',
        ],
      },
    ],
    faqs: [
      { q: 'What is the difference between Kashmiri and Guntur chilli powder?', a: 'Kashmiri chilli gives deep red colour with mild heat; Guntur gives high heat with less colour. Many kitchens buy both and blend them to control colour and heat independently.' },
      { q: 'Why is Kerala pepper considered better?', a: 'The Western Ghats climate produces peppercorns with higher essential oil content, which drives stronger aroma and pungency.' },
      { q: 'How do I avoid adulterated saffron?', a: 'Buy from a supplier who states the origin and sells at a credible price. Saffron priced far below market is the clearest warning sign, as it is among the most adulterated spices in the trade.' },
    ],
    related: ['Whole Spices', 'Ground Spices & Powders', 'Dried Chillies & Regional Specialities'],
    keywords: ['spice origin state India', 'kashmiri vs guntur chilli', 'kerala black pepper wholesale', 'authentic spice sourcing India'],
  },
  {
    slug: 'storage-and-shelf-life',
    title: 'Storage & Shelf-Life Guide for Bulk Pulses and Spices',
    metaTitle: 'Storage & Shelf-Life Guide — Bulk Pulses & Spices',
    metaDescription:
      'How to store bulk pulses, spices, rice and dry fruits to protect quality — humidity, pests, aroma loss and stock rotation. Practical guidance for commercial kitchens and warehouses.',
    summary:
      'Buying well and storing badly cancels out. In Indian humidity, storage is what determines whether your last sack performs like your first.',
    readingTime: '5 min read',
    icon: '🛡️',
    sections: [
      {
        heading: 'The three things that degrade bulk stock',
        body: ['Nearly all bulk storage loss traces to one of three causes:'],
        bullets: [
          { term: 'Moisture', text: 'The primary enemy in Indian conditions. Moisture causes caking in ground spices, mould risk in pulses and grains, and rancidity in oil-rich seeds and nuts. Store off the floor, away from walls, in a dry area with airflow.' },
          { term: 'Pests', text: 'Pulses and grains are vulnerable to weevils and moths, especially in warm storage. Rotate stock, keep the area clean, and inspect the oldest sacks first rather than the most accessible ones.' },
          { term: 'Aroma loss and oxidation', text: 'Ground spices lose volatile aroma compounds continuously once opened. Nuts and oil-rich seeds oxidise and turn rancid. Both are accelerated by heat, light and open exposure.' },
        ],
      },
      {
        heading: 'Practical shelf-life expectations',
        body: [
          'Stored properly — cool, dry, sealed and off the floor — whole spices comfortably outlast ground ones, often by a factor of two or more, because grinding exposes far more surface area to air.',
          'Pulses and rice keep well for extended periods but are pest-sensitive rather than aroma-sensitive. Nuts and oil-rich seeds have the shortest practical life because of rancidity, and should be bought closest to actual consumption.',
          'The practical implication: buy whole spices in larger volumes and grind as needed if you have the capability, and buy ground spices and nuts in tighter cycles.',
        ],
      },
      {
        heading: 'Stock rotation that actually works',
        body: [
          'Use first-in-first-out, and make it physically easy to follow. If the newest delivery is stacked in front of older stock, FIFO will fail no matter what the policy says.',
          'Mark the delivery date on each sack as it arrives. This one habit — visible dates on every sack — prevents most bulk storage loss in commercial kitchens, because it makes the right sack obvious rather than a matter of memory.',
        ],
      },
    ],
    faqs: [
      { q: 'Do whole spices last longer than ground spices?', a: 'Yes, substantially. Grinding exposes far more surface area, so ground spices lose aroma much faster. Where practical, buy whole and grind as needed.' },
      { q: 'How should bulk sacks be stored?', a: 'Off the floor on pallets, away from walls, in a cool dry area with airflow, and rotated first-in-first-out with the delivery date marked on each sack.' },
      { q: 'Which items should I buy in the smallest cycles?', a: 'Nuts, oil-rich seeds and ground spices — they are the most vulnerable to rancidity and aroma loss respectively.' },
    ],
    related: ['Pulses & Legumes', 'Whole Spices', 'Dry Fruits & Nuts'],
    keywords: ['storing bulk spices pulses', 'shelf life bulk food storage', 'prevent weevils bulk pulses', 'commercial kitchen storage guide'],
  },
];

const BY_SLUG = new Map(GUIDES.map((g) => [g.slug, g]));
export const guideBySlug = (slug: string) => BY_SLUG.get(slug);
