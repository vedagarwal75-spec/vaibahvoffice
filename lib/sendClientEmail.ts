// Client-side email via Web3Forms.
//
// Web3Forms rejects server-side submissions on the free plan ("Use our API in
// client side"), so the email must be sent from the browser — exactly like the
// original static site did. The access key is public by design (it only lets
// people send to the site owner's inbox), so exposing it via NEXT_PUBLIC_ is
// fine. Best-effort: never throws.

const KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '';

export async function sendClientEmail(
  subject: string,
  fields: Record<string, string | undefined>,
): Promise<boolean> {
  if (!KEY) return false;
  // Drop empty fields so the email stays clean.
  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(fields)) {
    if (v && String(v).trim()) clean[k] = String(v).trim();
  }
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: KEY,
        subject,
        from_name: clean.Name || 'Website Enquiry',
        ...clean,
      }),
    });
    const data = await res.json().catch(() => ({ success: res.ok }));
    return data?.success === true;
  } catch {
    return false;
  }
}
