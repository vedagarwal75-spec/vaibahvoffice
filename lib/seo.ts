// Structured-data (JSON-LD) builders. These are what earn rich results in
// Google — a real Product graph per item, an Organization/LocalBusiness on the
// home page, and BreadcrumbLists so search shows the site hierarchy.

import { SITE } from './site';
import type { Product } from './types';
import { categoryTitle } from './categories';
import { resolveImage, absoluteUrl } from './image';

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    foundingDate: SITE.founded,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: { '@type': 'Country', name: 'India' },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  };
}

export function localBusinessLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GroceryStore',
    '@id': `${SITE.url}/#localbusiness`,
    name: SITE.name,
    image: `${SITE.url}/og.png`,
    url: SITE.url,
    telephone: SITE.phone,
    priceRange: '₹₹ (Wholesale / Bulk)',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: SITE.openingHoursSpec.days,
      opens: SITE.openingHoursSpec.opens,
      closes: SITE.openingHoursSpec.closes,
    },
    areaServed: { '@type': 'Country', name: 'India' },
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { '@id': `${SITE.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/products?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function productLd(p: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    image: [absoluteUrl(resolveImage(p.image), SITE.url)],
    description: p.shortDescription || p.longDescription,
    category: categoryTitle(p.category),
    sku: p.slug,
    keywords: p.keywords.join(', '),
    countryOfOrigin: p.origin,
    brand: { '@type': 'Brand', name: SITE.name },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'INR',
        valueAddedTaxIncluded: false,
      },
      seller: { '@id': `${SITE.url}/#organization` },
      url: `${SITE.url}/products/${p.slug}`,
      areaServed: { '@type': 'Country', name: 'India' },
      businessFunction: 'http://purl.org/goodrelations/v1#Sell',
    },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}

export function itemListLd(products: Product[], listName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE.url}/products/${p.slug}`,
      name: p.name,
    })),
  };
}

/** Render a <script type="application/ld+json"> string safely. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
