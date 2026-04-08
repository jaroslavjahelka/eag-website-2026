/**
 * Dynamic robots.txt served as a route handler.
 * Accessible at /robots.txt
 */
export function loader() {
  const content = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://www.eag.cz/sitemap.xml
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
