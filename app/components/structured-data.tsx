/**
 * JSON-LD structured data components for SEO rich snippets.
 *
 * Renders a <script type="application/ld+json"> tag in the document.
 * Use inside any route component — React Router will hoist it into <head> via Meta if needed,
 * or it can sit in the body (Google reads both).
 */

const SITE_URL = "https://www.eag.cz";

/* ── Organization ─────────────────────────────────── */

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EAG",
  legalName: "Evropská Autobazarová Grupa",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  description:
    "International investment group focused on the digital transformation of the automotive market.",
  foundingDate: "1991",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Prague",
    addressCountry: "CZ",
  },
  sameAs: [
    "https://www.linkedin.com/company/eag-group",
  ],
};

export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}

/* ── WebSite (for home page) ──────────────────────── */

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "EAG",
  url: SITE_URL,
};

export function WebSiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
}

/* ── BreadcrumbList ───────────────────────────────── */

interface Breadcrumb {
  name: string;
  path: string;
}

export function BreadcrumbSchema({ items }: { items: Breadcrumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
