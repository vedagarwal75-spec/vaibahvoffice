import { SITE } from '@/lib/site';

/**
 * "Who we supply" social proof.
 *
 * By default this renders SEGMENT-level proof (five-star hotel chains, defence
 * canteens, hospitals …), which is accurate and needs no third-party consent.
 *
 * Named brands and defence insignia only render once
 * `SITE.publishNamedClients` is set to true — do that only with written
 * permission from each organisation. See the notes in lib/site.ts.
 */
export function Clients() {
  const named = SITE.publishNamedClients
    ? [...SITE.namedClients.hospitality, ...SITE.namedClients.defence]
    : [];

  return (
    <div>
      <div className="section-header">
        <span className="section-tag">Trusted Across India</span>
        <h2>Who We Supply</h2>
        <div className="divider" />
        <p style={{ color: 'var(--ink-soft)', maxWidth: 640, margin: '0 auto' }}>
          Two decades of supplying institutional kitchens, hospitality groups and
          the trade — from five-star hotel chains to defence canteens.
        </p>
      </div>

      <div className="clients-row">
        {(named.length ? named : SITE.clientSegments).map((c) => (
          <span className="client-pill" key={c}>
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
