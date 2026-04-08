/**
 * Shared SEO meta generator for React Router routes.
 *
 * Usage in any route:
 *   import { generateMeta } from "~/utils/seo";
 *   export function meta() {
 *     return generateMeta({ title: "Page — EAG", description: "…", path: "/page" });
 *   }
 */

const SITE_URL = "https://www.eag.cz";
const SITE_NAME = "EAG";
const DEFAULT_OG_IMAGE = "/assets/og/og-default.png";

interface MetaInput {
  title: string;
  description: string;
  /** Path without domain, e.g. "/projects" — "/" for home */
  path: string;
  /** Override OG image (relative to public/) */
  ogImage?: string;
  /** og:type — defaults to "website" */
  ogType?: string;
  /** Set true to add noindex */
  noindex?: boolean;
}

export function generateMeta({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
}: MetaInput) {
  const canonicalUrl = `${SITE_URL}${path === "/" ? "" : path}`;
  const absoluteOgImage = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  return [
    /* ── Core ────────────────────────────── */
    { title },
    { name: "description", content: description },
    ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),

    /* ── Canonical ────────────────────────── */
    { tagName: "link", rel: "canonical", href: canonicalUrl },

    /* ── Open Graph ───────────────────────── */
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: absoluteOgImage },
    { property: "og:type", content: ogType },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_US" },

    /* ── Twitter Card ─────────────────────── */
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: absoluteOgImage },
  ];
}

export { SITE_URL, SITE_NAME };
