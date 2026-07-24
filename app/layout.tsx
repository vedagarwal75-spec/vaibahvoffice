import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { ScrollReveal } from '@/components/ScrollReveal';
import { JsonLd } from '@/components/JsonLd';
import { organizationLd, websiteLd, localBusinessLd } from '@/lib/seo';
import { Analytics } from '@vercel/analytics/next';

const display = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});
const sans = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Bulk Food Raw Material Supplier, Kolkata`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `${SITE.name} — Bulk Food Raw Material Supplier`,
    description: SITE.description,
    url: SITE.url,
    locale: 'en_IN',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — Bulk Food Raw Material Supplier`,
    description: SITE.description,
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Food & Beverage Wholesale',
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport = {
  themeColor: '#162d1f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <JsonLd data={organizationLd()} />
        <JsonLd data={websiteLd()} />
        <JsonLd data={localBusinessLd()} />
        <Nav />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <ScrollReveal />
        <Analytics />
      </body>
    </html>
  );
}