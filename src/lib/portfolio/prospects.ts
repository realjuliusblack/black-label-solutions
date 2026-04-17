/**
 * Per-prospect portfolio overrides.
 *
 * Drop a new entry in PROSPECTS keyed by slug. The slug becomes the URL:
 *   /portfolio/for/{slug}
 *
 * Fields:
 *   - name: company name rendered in the banner
 *   - industry: optional. If set, the problem section swaps in tailored copy.
 *   - logo: optional path under /public. If absent, we render a wordmark.
 *   - subject: optional opening line under "Prepared for {name}".
 */

export type Prospect = {
  slug: string;
  name: string;
  industry?: string;
  logo?: string;
  subject?: string;
};

const PROSPECTS: Record<string, Prospect> = {
  "dry-run": {
    slug: "dry-run",
    name: "Dry Run Partners",
    industry: "Internal test",
    subject: "A preview of how the portfolio renders for a named prospect.",
  },
};

export function getProspect(slug: string): Prospect | null {
  return PROSPECTS[slug] ?? null;
}

export function listProspectSlugs(): string[] {
  return Object.keys(PROSPECTS);
}
