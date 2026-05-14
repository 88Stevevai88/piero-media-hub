const FEED_URL = "https://medium.com/feed/@pieropasquariello";

module.exports = async function mediumFeedHandler(req, res) {
  if (req.method && req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Method Not Allowed");
    return;
  }

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

    const xml = await response.text();
    const items = parseMediumFeed(xml);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store, max-age=0");
    res.end(JSON.stringify({ items, updatedAt: new Date().toISOString() }));
  } catch (error) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store, max-age=0");
    res.end(JSON.stringify({ items: [], error: "Unable to load Medium feed" }));
  }
};

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
      const summary = textContent ? truncate(textContent, 190) : "";
      const readingMinutes = estimateReadTime(textContent);

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
      };
    });
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

  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
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
