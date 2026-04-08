/**
 * Dynamic XML sitemap served as a route handler.
 * Accessible at /sitemap.xml
 */

const SITE_URL = "https://www.eag.cz";

interface SitemapEntry {
  path: string;
  changefreq: "daily" | "weekly" | "monthly";
  priority: number;
}

const pages: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/projects", changefreq: "monthly", priority: 0.8 },
  { path: "/story", changefreq: "monthly", priority: 0.7 },
  { path: "/team", changefreq: "monthly", priority: 0.7 },
  { path: "/media", changefreq: "weekly", priority: 0.6 },
];

export function loader() {
  const today = new Date().toISOString().split("T")[0];

  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${SITE_URL}${page.path === "/" ? "" : page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${page.path === "/" ? "" : page.path}" />
    <xhtml:link rel="alternate" hreflang="cs" href="${SITE_URL}${page.path === "/" ? "" : page.path}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${page.path === "/" ? "" : page.path}" />
  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
