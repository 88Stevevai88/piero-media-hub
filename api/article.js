const { fetchMediumItems } = require("./medium");

const SITE_URL = "https://pieropasquariello.com";
const GA_ID = "G-QFLFW67PL7";

module.exports = async function articleHandler(req, res) {
  if (req.method && !["GET", "HEAD"].includes(req.method)) {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, HEAD");
    res.end("Method Not Allowed");
    return;
  }

  try {
    const slug = String(req.query?.slug || "").toLowerCase().trim();
    const items = await fetchMediumItems();
    const item = items.find(
      (entry) => entry.slug === slug && entry.pageHref.includes("/writing/read/"),
    );

    if (!item) {
      renderNotFound(res);
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=86400");
    res.end(renderArticle(item));
  } catch (error) {
    res.statusCode = 503;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(renderError());
  }
};

function renderArticle(item) {
  const isItalian = item.language === "it";
  const canonical = `${SITE_URL}${item.pageHref}`;
  const title = `${item.title} | Piero Pasquariello`;
  const description =
    item.summary ||
    (isItalian ? "Articolo di Piero Pasquariello." : "Article by Piero Pasquariello.");
  const image = item.image || `${SITE_URL}/og-home.jpg`;
  const archive = isItalian ? "/writing/italiano/" : "/writing/english/";
  const date = formatDate(item.publishedAt, item.language);
  const readTime = isItalian
    ? `${item.readingMinutes} min di lettura`
    : `${item.readingMinutes} min read`;
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description,
    image: [image],
    datePublished: item.publishedAt,
    dateModified: item.publishedAt,
    inLanguage: item.language,
    mainEntityOfPage: canonical,
    author: {
      "@type": "Person",
      name: "Piero Pasquariello",
      url: `${SITE_URL}/about/`,
    },
    publisher: {
      "@type": "Person",
      name: "Piero Pasquariello",
      url: `${SITE_URL}/`,
    },
    isPartOf: {
      "@type": "Blog",
      name: isItalian
        ? "Archivio italiano di Piero Pasquariello"
        : "Piero Pasquariello English writing archive",
      url: `${SITE_URL}${archive}`,
    },
    sameAs: item.href,
  }).replace(/</g, "\\u003c");

  return `<!doctype html>
<html lang="${item.language}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="theme-color" content="#f7f4ee" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="article:published_time" content="${escapeHtml(item.publishedAt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <script type="application/ld+json">${schema}</script>
    <link rel="stylesheet" href="/styles.css?v=20260623a" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","${GA_ID}");</script>
  </head>
  <body>
    <div class="bg-orb bg-orb-a"></div>
    <div class="bg-orb bg-orb-b"></div>
    <div class="bg-noise"></div>
    <main class="app-shell article-shell" id="top">
      <header class="article-topbar panel reveal is-visible">
        <a class="site-brand" href="/">Piero Pasquariello</a>
        <div class="article-topbar-links">
          <a class="section-link" href="${archive}">${isItalian ? "Articoli" : "Articles"}</a>
          <a class="action-button action-primary" href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer">${isItalian ? "Apri su Medium" : "Read on Medium"}</a>
        </div>
      </header>
      <section class="article-hero article-hero-auto panel reveal is-visible">
        <div class="article-hero-copy">
          <p class="eyebrow">Medium / ${isItalian ? "Italiano" : "English"}</p>
          <h1>${escapeHtml(item.title)}</h1>
          <p class="article-lede">${escapeHtml(description)}</p>
          <div class="article-meta">
            <span>${escapeHtml(date)}</span>
            <span>${escapeHtml(readTime)}</span>
            <span>Cronos &amp; Web3</span>
          </div>
          <div class="article-actions">
            <a class="action-button action-primary" href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer">${isItalian ? "Leggi la fonte" : "Read the source"}</a>
            <a class="action-button action-secondary" href="${archive}">${isItalian ? "Torna all’archivio" : "Back to archive"}</a>
          </div>
        </div>
        <div class="article-hero-media">
          <img src="${escapeHtml(image)}" alt="${escapeHtml(item.imageAlt)}" loading="eager" fetchpriority="high" decoding="async" />
        </div>
      </section>
      <section class="article-layout">
        <article class="article-prose panel reveal is-visible">
          <p class="article-origin">${isItalian ? "Pubblicato originariamente su Medium. Testo e idee di Piero Pasquariello." : "Originally published on Medium. Text and ideas by Piero Pasquariello."}</p>
          ${renderBody(item.contentBlocks, isItalian)}
        </article>
        <aside class="article-sidenotes">
          <article class="article-note panel reveal is-visible">
            <p class="eyebrow">${isItalian ? "Fonte" : "Source"}</p>
            <h3>${isItalian ? "Continua su Medium" : "Continue on Medium"}</h3>
            <p>${isItalian ? "Apri la versione originale e seguimi per i prossimi articoli." : "Open the original version and follow me for future articles."}</p>
            <div class="article-actions">
              <a class="action-button action-primary" href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer">Medium →</a>
            </div>
          </article>
        </aside>
      </section>
    </main>
    <script src="/writing/article-page.js"></script>
  </body>
</html>`;
}

function renderBody(blocks, isItalian) {
  const safeBlocks = Array.isArray(blocks)
    ? blocks.filter((entry) => entry?.text).slice(0, 80)
    : [];
  if (!safeBlocks.length) {
    return `<h2>${isItalian ? "In sintesi" : "In brief"}</h2><p>${isItalian ? "Apri la fonte originale per leggere l’articolo completo." : "Open the original source to read the complete article."}</p>`;
  }

  const output = [];
  let listItems = [];

  const flushList = () => {
    if (!listItems.length) return;
    output.push(
      `<ul class="article-list">${listItems.map((text) => `<li>${escapeHtml(text)}</li>`).join("")}</ul>`,
    );
    listItems = [];
  };

  if (safeBlocks[0].type !== "heading") {
    output.push(`<h2>${isItalian ? "L’articolo" : "The article"}</h2>`);
  }

  safeBlocks.forEach((block) => {
    if (block.type === "list-item") {
      listItems.push(block.text);
      return;
    }

    flushList();
    if (block.type === "heading") {
      output.push(`<h2>${escapeHtml(block.text)}</h2>`);
    } else if (block.type === "quote") {
      output.push(`<blockquote>${escapeHtml(block.text)}</blockquote>`);
    } else {
      output.push(`<p>${escapeHtml(block.text)}</p>`);
    }
  });

  flushList();
  return output.join("\n");
}

function renderNotFound(res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(renderStatusPage("Article not found.", "The Medium feed may have changed."));
}

function renderError() {
  return renderStatusPage("Temporarily unavailable.", "Please open the archive and try again shortly.");
}

function renderStatusPage(title, message) {
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${escapeHtml(title)}</title><link rel="stylesheet" href="/styles.css"></head><body><main class="app-shell article-shell"><section class="archive-hero panel"><p class="eyebrow">Writing</p><h1>${escapeHtml(title)}</h1><p>${escapeHtml(message)}</p><a class="action-button action-primary" href="/writing/">Open archive</a></section></main></body></html>`;
}

function formatDate(value, language) {
  const parsed = Date.parse(value || "");
  if (!Number.isFinite(parsed)) return "";
  return new Intl.DateTimeFormat(language === "it" ? "it-IT" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(parsed));
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
