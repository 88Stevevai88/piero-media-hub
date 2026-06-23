const { fetchMediumItems } = require("./medium");

module.exports = async function sitemapArticlesHandler(req, res) {
  if (req.method && !["GET", "HEAD"].includes(req.method)) {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, HEAD");
    res.end("Method Not Allowed");
    return;
  }

  try {
    const items = await fetchMediumItems();
    const urls = items
      .filter((item) => item.pageHref.startsWith("/writing/read/"))
      .map(
        (item) =>
          `  <url>\n    <loc>https://pieropasquariello.com${escapeXml(item.pageHref)}</loc>\n    <lastmod>${formatDate(item.publishedAt)}</lastmod>\n  </url>`,
      )
      .join("\n");

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=86400");
    res.end(
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`,
    );
  } catch (error) {
    res.statusCode = 503;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Sitemap temporarily unavailable");
  }
};

function formatDate(value) {
  const parsed = Date.parse(value || "");
  return Number.isFinite(parsed)
    ? new Date(parsed).toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
