const FEED_URL = "https://medium.com/feed/@pieropasquariello";
const { cachedMediumItems } = require("../data/medium-cache");

const CURATED_PAGE_PATHS = new Map([
  ["cronos app is not about turning everyone into a trader", "/writing/cronos-app-is-not-about-turning-everyone-into-a-trader/"],
  ["cronos app and the problem of too many financial apps", "/writing/cronos-app-and-the-problem-of-too-many-financial-apps/"],
  ["perche lapy non e il vero punto della nuova proposta cro", "/writing/perche-lapy-non-e-il-vero-punto-della-nuova-proposta-cro/"],
]);

module.exports = async function mediumFeedHandler(req, res) {
  if (req.method && !["GET", "HEAD"].includes(req.method)) {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, HEAD");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Method Not Allowed");
    return;
  }

  try {
    const items = await fetchMediumItems();
    const publicItems = items.map(({ contentBlocks, ...item }) => item);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store, max-age=0");
    res.end(JSON.stringify({ items: publicItems, updatedAt: new Date().toISOString() }));
  } catch (error) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store, max-age=0");
    res.end(JSON.stringify({ items: [], error: "Unable to load Medium feed" }));
  }
};

async function fetchMediumItems() {
  try {
    const response = await fetch(FEED_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
      },
    });

    if (!response.ok) {
      throw new Error(`Medium feed responded with ${response.status}`);
    }

    return mergeMediumItems(parseMediumFeed(await response.text()), cachedMediumItems);
  } catch (error) {
    return sortMediumItems(cachedMediumItems);
  }
}

function mergeMediumItems(liveItems, fallbackItems) {
  const bySlug = new Map();

  fallbackItems.forEach((item) => {
    if (item?.slug) {
      bySlug.set(item.slug, normalizeCachedItem(item));
    }
  });

  liveItems.forEach((item) => {
    if (item?.slug) {
      bySlug.set(item.slug, item);
    }
  });

  return sortMediumItems([...bySlug.values()]);
}

function normalizeCachedItem(item) {
  return {
    ...item,
    pageHref: item.pageHref || getInternalPageHref(item.title, item.slug),
    publishedAt: item.publishedAt || item.pubDate,
    contentBlocks: Array.isArray(item.contentBlocks) ? item.contentBlocks : [],
  };
}

function sortMediumItems(items) {
  return [...items].sort((a, b) => {
    const dateA = Date.parse(a.publishedAt || a.pubDate || "") || 0;
    const dateB = Date.parse(b.publishedAt || b.pubDate || "") || 0;
    return dateB - dateA;
  });
}

function parseMediumFeed(xml) {
  const blocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) || [];

  return blocks
    .map((block) => {
      const title = cleanText(getTagValue(block, "title"));
      const href = cleanText(getTagValue(block, "link"));
      const pubDate = cleanText(getTagValue(block, "pubDate"));
      const htmlContent =
        getTagValue(block, "content:encoded") || getTagValue(block, "description") || "";
      const textContent = cleanText(stripHtml(htmlContent));
      const image =
        getAttributeValue(block, "media:content", "url") ||
        getAttributeValue(block, "enclosure", "url") ||
        getFirstImageSrc(htmlContent) ||
        "";

      if (!title || !href) {
        return null;
      }

      const language = detectLanguage(`${title} ${textContent}`);
      const contentBlocks = extractTextBlocks(htmlContent);
      const firstParagraph = contentBlocks.find((entry) => entry.type === "paragraph");
      const summary = firstParagraph?.text
        ? truncate(firstParagraph.text, 175)
        : textContent
          ? truncate(textContent, 175)
          : "";
      const readingMinutes = estimateReadTime(textContent);
      const slug = slugify(title);

      return {
        id: href,
        source: "medium",
        language,
        badge: "Medium",
        title,
        summary,
        meta: "Medium article",
        href,
        image,
        imageAlt: `${title} cover image`,
        pubDate,
        readingMinutes,
        slug,
        pageHref: getInternalPageHref(title, slug),
        contentBlocks,
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      const dateA = Date.parse(a.pubDate || "") || 0;
      const dateB = Date.parse(b.pubDate || "") || 0;
      return dateB - dateA;
    })
    .map((item) => {
      const normalizedDate = item.pubDate
        ? new Date(item.pubDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "";

      return {
        id: item.id,
        source: item.source,
        language: item.language,
        badge: item.badge,
        title: item.title,
        summary: item.summary,
        meta: normalizedDate || item.meta,
        href: item.href,
        image: item.image,
        imageAlt: item.imageAlt,
        pubDate: item.pubDate,
        publishedAt: item.pubDate,
        readingMinutes: item.readingMinutes,
        slug: item.slug,
        pageHref: item.pageHref,
        contentBlocks: item.contentBlocks,
      };
    });
}

function getInternalPageHref(title, slug = slugify(title)) {
  return CURATED_PAGE_PATHS.get(normalizeForLookup(title)) || `/writing/read/${slug}/`;
}

function slugify(value) {
  return normalizeForLookup(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function normalizeForLookup(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function extractTextBlocks(html) {
  const blocks = [];
  const pattern = /<(h[1-3]|p|blockquote|li)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;

  while ((match = pattern.exec(String(html || "")))) {
    const text = cleanText(stripHtml(match[2]));
    const tag = match[1].toLowerCase();
    const type = tag.startsWith("h")
      ? "heading"
      : tag === "li"
        ? "list-item"
        : tag === "blockquote"
          ? "quote"
          : "paragraph";

    if (text && text.length > 2 && !blocks.some((entry) => entry.text === text)) {
      blocks.push({ type, text });
    }
  }

  return blocks.slice(0, 80);
}

function getTagValue(block, tagName) {
  const pattern = new RegExp(`<${escapeRegex(tagName)}(?:\\s[^>]*)?>([\\s\\S]*?)</${escapeRegex(tagName)}>`, "i");
  const match = block.match(pattern);
  return match ? decodeEntities(match[1].trim()) : "";
}

function getAttributeValue(block, tagName, attributeName) {
  const pattern = new RegExp(
    `<${escapeRegex(tagName)}\\b[^>]*${escapeRegex(attributeName)}="([^"]+)"[^>]*\/?>`,
    "i",
  );
  const match = block.match(pattern);
  return match ? decodeEntities(match[1].trim()) : "";
}

function getFirstImageSrc(html) {
  const match = html.match(/<img[^>]+src="([^"]+)"/i);
  return match ? decodeEntities(match[1].trim()) : "";
}

function detectLanguage(text) {
  const value = cleanText(text).toLowerCase();
  const italianSignals = [
    /[àèéìòù’]/,
    /\b(perché|perche|italiano|italiana|italiani|italiane|community italiana|guida italiana|spiegazione|adozione|fiducia|linguaggio|chiarezza|proposta|contesto)\b/,
    /\b(non è|l'|dell'|nell'|sull'|all'|per l'|c'è|un articolo italiano|una nota italiana|per la community italiana)\b/,
  ];
  const englishSignals = [
    /\b(the|and|with|without|because|should|need|when|what|why|more|better|users|markets|understandable|mobile-first|simple|next|this|that)\b/,
  ];

  const italianScore = italianSignals.reduce((score, pattern) => score + (pattern.test(value) ? 1 : 0), 0);
  const englishScore = englishSignals.reduce((score, pattern) => score + (pattern.test(value) ? 1 : 0), 0);

  if (italianScore >= 2 && italianScore >= englishScore) {
    return "it";
  }

  if (englishScore > italianScore) {
    return "en";
  }

  return "en";
}

function cleanText(value) {
  return stripCdata(String(value))
    .replace(/\s+/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .trim();
}

function stripCdata(value) {
  return String(value).replace(/<!\[CDATA\[|\]\]>/g, "");
}

function stripHtml(value) {
  return String(value)
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
}

function truncate(value, maxLength) {
  if (value.length <= maxLength) {
    return value;
  }

  const candidate = value.slice(0, maxLength - 1).trimEnd();
  const lastSpace = candidate.lastIndexOf(" ");
  const cleanEnd = lastSpace > maxLength * 0.65 ? candidate.slice(0, lastSpace) : candidate;
  return `${cleanEnd.trimEnd()}…`;
}

function estimateReadTime(text) {
  const words = cleanText(text)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

function decodeEntities(value) {
  return String(value)
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, "/");
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports.fetchMediumItems = fetchMediumItems;
module.exports.getInternalPageHref = getInternalPageHref;
module.exports.slugify = slugify;
