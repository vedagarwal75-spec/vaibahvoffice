import { jsonLd } from '@/lib/seo';

/** Injects a <script type="application/ld+json"> block for structured data. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
  );
}
