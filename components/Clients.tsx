import { SITE } from '@/lib/site';

/**
 * "Who we supply" social proof.
 *
 * Hospitality clients are rendered as PLAIN TEXT names only — never logos
 * (logos are copyrighted artwork on top of being trademarks).
 *
 * Defence/paramilitary buyers are deliberately described at segment level
 * rather than named, unless `SITE.publishDefenceClients` is enabled with
 * written authorisation. See the notes in lib/site.ts.
 */
export function Clients({ showNames = true }: { showNames?: boolean }) {
  const hospitality = showNames && SITE.publishHospitalityClients ? SITE.namedClients.hospitality : [];
  const defence = showNames && SITE.publishDefenceClients ? SITE.namedClients.defence : [];
  const named = [...hospitality, ...defence];

  return (
    <div>
      <div className="section-header">
        <span className="section-tag">Trusted Across India</span>
        <h2>Who We Supply</h2>
        <div className="divider" />
        <p style={{ color: 'var(--ink-soft)', maxWidth: 680, margin: '0 auto' }}>
          Two decades of supplying institutional kitchens, hospitality groups and the
          trade — from five-star hotel chains to hospitals, defence canteens and
          regional distributors.
        </p>
      </div>

      {named.length > 0 && (
        <>
          <p
            style={{
              textAlign: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--saffron-600)',
              marginBottom: '1.1rem',
            }}
          >
            Our clients include
          </p>
          <div className="clients-row" style={{ marginBottom: '2.25rem' }}>
            {named.map((c) => (
              <span className="client-pill client-pill--name" key={c}>
                {c}
              </span>
            ))}
          </div>
        </>
      )}

      <p
        style={{
          textAlign: 'center',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--ink-faint)',
          marginBottom: '1.1rem',
        }}
      >
        Segments we serve
      </p>
      <div className="clients-row">
        {SITE.clientSegments.map((c) => (
          <span className="client-pill" key={c}>
            {c}
          </span>
        ))}
      </div>

      {named.length > 0 && (
        <p className="client-note">
          Client names are used to describe our supply relationships. All brand names and
          trademarks are the property of their respective owners.
        </p>
      )}
    </div>
  );
}
