import { SITE } from '@/lib/site';

/**
 * Slim "trusted by" band for high on the page (directly under the hero).
 *
 * Marquee client names are the strongest social proof on the site, so they
 * belong above the fold-ish — not buried two-thirds of the way down.
 *
 * Text names only, never logos. See the notes in lib/site.ts.
 */
export function ClientsStrip() {
  if (!SITE.publishHospitalityClients) return null;
  const names = SITE.namedClients.hospitality;

  return (
    <section className="trusted-strip">
      <div className="container">
        <div className="trusted-inner">
          <p className="trusted-label">
            Trusted by India&rsquo;s
            <br />
            leading hotel groups
          </p>
          <div className="trusted-names">
            {names.map((n) => (
              <span className="trusted-name" key={n}>
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
