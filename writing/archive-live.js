(function () {
  const language = document.documentElement.lang.toLowerCase().startsWith("it") ? "it" : "en";
  const archiveList = document.querySelector(".archive-list");
  const sectionHead = document.querySelector(".archive-section-head h2");
  const sectionEyebrow = document.querySelector(".archive-section-head .eyebrow");
  const sectionLead = document.querySelector(".archive-section-head > div p:last-of-type");

  if (!archiveList) {
    return;
  }

  const config = {
    en: {
      leadTitle: "Recent writing in English.",
      leadText: "Latest first, with direct links to the article pages and the original source.",
      mediumItems: [
        {
          source: "medium",
          badge: "Medium",
          title: "Cronos App Is Not About Turning Everyone Into a Trader",
          summary:
            "A clearer market product is not a trading product. It is a trust product with better context and less noise.",
          meta: "",
          publishedAt: "2026-05-12T09:00:00+02:00",
          href: "https://medium.com/@pieropasquariello/cronos-app-is-not-about-turning-everyone-into-a-trader-755d7d64136a",
          pageHref: "/writing/cronos-app-is-not-about-turning-everyone-into-a-trader/",
          image: "https://cdn-images-1.medium.com/max/1024/1*nMbmzHGRdCLWU9eX5U4CKQ.png",
          imageAlt: "Cover image for Cronos App Is Not About Turning Everyone Into a Trader",
        },
        {
          source: "medium",
          badge: "Medium",
          title: "Cronos App and the Problem of Too Many Financial Apps",
          summary:
            "Fragmented financial apps create hesitation. Simpler language and fewer moving parts help users build trust faster.",
          meta: "",
          publishedAt: "2026-05-05T09:00:00+02:00",
          href: "https://medium.com/@pieropasquariello/cronos-app-and-the-problem-of-too-many-financial-apps-3f1f580260bc",
          pageHref: "/writing/cronos-app-and-the-problem-of-too-many-financial-apps/",
          image: "https://cdn-images-1.medium.com/max/1024/1*C9_pli7yGAxlNS6vuvKfvA.png",
          imageAlt: "Cover image for Cronos App and the Problem of Too Many Financial Apps",
        },
      ],
      items: [
        {
          source: "linkedin",
          badge: "LinkedIn",
          title: "247 Markets Need Better Mobile Experience",
          summary:
            "Tokenized markets need mobile-first clarity if they want normal users to trust what they see on screen.",
          meta: "",
          publishedAt: "2026-05-01T09:00:00+02:00",
          href: "https://www.linkedin.com/pulse/247-markets-need-better-mobile-experience-piero-pasquariello-zsbfc/",
          pageHref: "/writing/247-markets-need-better-mobile-experience/",
          image: "/assets/ougo.png",
          imageAlt: "Cover image for 24/7 markets made understandable",
        },
        {
          source: "linkedin",
          badge: "LinkedIn",
          title: "Most crypto apps still feel like they were built for power users",
          summary:
            "Product clarity matters more than another technical feature drop when the goal is to attract normal users.",
          meta: "",
          publishedAt: "2026-04-28T09:00:00+02:00",
          href: "https://www.linkedin.com/posts/piero-pasquariello-778a9212a_ugcPost-7458535000385179649-lnZV?utm_source=share&utm_medium=member_desktop&rcm=ACoAAB_XAswBp4NxXA595vwNFcielzlAweCzWcs",
          pageHref: "/writing/most-crypto-apps-still-feel-like-built-for-power-users/",
          image: "/assets/ougo.png",
          imageAlt: "Cover image for markets made understandable",
        },
      ],
    },
    it: {
      leadTitle: "Scrittura recente in italiano.",
      leadText: "Dal più recente al più vecchio, con pagina interna e fonte originale per ogni pezzo.",
      mediumItems: [
        {
          source: "medium",
          badge: "Medium",
          title: "Perché l’APY non è il vero punto della nuova proposta CRO",
          summary:
            "Il punto non è solo il rendimento: conta come si costruiscono incentivi, fiducia e sostenibilità.",
          meta: "",
          publishedAt: "2026-05-11T09:00:00+02:00",
          href: "https://medium.com/@pieropasquariello/perch%C3%A9-lapy-non-%C3%A8-il-vero-punto-della-nuova-proposta-cro-022a26e97b92?source=rss-d7209a415961------2",
          pageHref: "/writing/perche-lapy-non-e-il-vero-punto-della-nuova-proposta-cro/",
          image: "https://cdn-images-1.medium.com/max/1024/1*dl7SGvr7YoelLdGY-AF8Hg.png",
          imageAlt: "Cover image for the Italian Medium article about the new CRO proposal",
        },
      ],
      items: [
        {
          source: "linkedin",
          badge: "LinkedIn",
          title: "Perché una UX chiara costruisce fiducia",
          summary:
            "Parole semplici e onboarding chiaro riducono il rumore e fanno sentire l'utente più sicuro.",
          meta: "",
          publishedAt: "2026-05-09T09:00:00+02:00",
          href: "https://www.linkedin.com/pulse/247-markets-need-better-mobile-experience-piero-pasquariello-zsbfc/",
          pageHref: "/writing/perche-una-ux-chiara-costruisce-fiducia/",
          image: "/assets/ougo.png",
          imageAlt: "Cover image for the Italian LinkedIn article about clear UX",
        },
        {
          source: "linkedin",
          badge: "LinkedIn",
          title: "Cronos funziona meglio quando è spiegato bene",
          summary:
            "Se il prodotto è buono, spiegare bene il suo valore fa parte del prodotto stesso.",
          meta: "",
          publishedAt: "2026-05-08T09:00:00+02:00",
          href: "https://www.linkedin.com/posts/piero-pasquariello-778a9212a_ugcPost-7458536295452160000-2luA?utm_source=share&utm_medium=member_desktop&rcm=ACoAAB_XAswBp4NxXA595vwNFcielzlAweCzWcs",
          pageHref: "/writing/cronos-funziona-meglio-quando-e-spiegato-bene/",
          image: "/assets/ougo.png",
          imageAlt: "Cover image for the Italian LinkedIn article about explaining Cronos",
        },
      ],
    },
  };

  const mediumPageMap = {
    "Cronos App Is Not About Turning Everyone Into a Trader":
      "/writing/cronos-app-is-not-about-turning-everyone-into-a-trader/",
    "Cronos App and the Problem of Too Many Financial Apps":
      "/writing/cronos-app-and-the-problem-of-too-many-financial-apps/",
    "Perché l’APY non è il vero punto della nuova proposta CRO":
      "/writing/perche-lapy-non-e-il-vero-punto-della-nuova-proposta-cro/",
  };

  const staticItems = [...config[language].mediumItems, ...config[language].items];

  if (sectionHead) {
    sectionHead.textContent = config[language].leadTitle;
  }

  if (sectionEyebrow) {
    sectionEyebrow.textContent = language === "it" ? "Archivio" : "Archive";
  }

  if (sectionLead) {
    sectionLead.textContent = config[language].leadText;
  }

  renderLoadingState(language);

  loadArchiveItems();
  appendSiteFooter(language);

  async function loadArchiveItems() {
    try {
      const response = await fetch("/api/medium", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Medium feed request failed with ${response.status}`);
      }

      const payload = await response.json();
      const liveMedium = Array.isArray(payload?.items)
        ? payload.items.filter((item) => item.language === language)
        : [];
      const mappedMedium = liveMedium.map((item) => ({
        source: "medium",
        badge: item.badge || "Medium",
        title: item.title,
        summary: item.summary,
        meta: item.meta || "Medium",
        publishedAt: item.publishedAt || item.pubDate || "",
        href: item.href,
        pageHref: mediumPageMap[normalizeTitle(item.title)] || item.href,
        image: item.image || "/assets/ougo.png",
        imageAlt: item.imageAlt || `${item.title} cover image`,
      }));

      renderArchive(sortItems([...mappedMedium, ...staticItems]));
    } catch (error) {
      renderArchive(sortItems(staticItems));
    }
  }

  function renderLoadingState(activeLanguage) {
    const text =
      activeLanguage === "it"
        ? "Caricamento degli articoli..."
        : "Loading latest articles...";

    archiveList.innerHTML = `
      <div class="archive-loading panel">
        <p class="eyebrow">${activeLanguage === "it" ? "Archivio" : "Archive"}</p>
        <h3>${escapeHtml(text)}</h3>
      </div>
    `;
  }

  function renderArchive(items) {
    archiveList.innerHTML = items
      .map((item) => {
        const pageHref = item.pageHref || item.href;
        const sourceHref = item.href;
        const dateLabel = item.meta || formatPublishedLabel(item.publishedAt, language);
        const readTime = formatReadTimeLabel(item, language);
        const metaLabel = [dateLabel, readTime].filter(Boolean).join(" · ");

        return `
          <article class="archive-item">
            <a class="archive-item-media" href="${safeHref(pageHref)}">
              <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.imageAlt)}" loading="lazy" />
            </a>
            <div class="archive-item-copy">
              <div class="archive-item-meta">
                <span>${escapeHtml(item.badge || (language === "it" ? "Medium IT" : "Medium"))}</span>
                <span>${escapeHtml(metaLabel)}</span>
              </div>
              <h3><a href="${safeHref(pageHref)}">${escapeHtml(item.title)}</a></h3>
              <p>${escapeHtml(item.summary || "")}</p>
            </div>
            <div class="archive-item-actions">
              <a class="section-link" href="${safeHref(pageHref)}">${language === "it" ? "Apri pagina →" : "Open page →"}</a>
              <a class="section-link" href="${safeHref(sourceHref)}" target="_blank" rel="noreferrer">${language === "it" ? "Leggi fonte →" : "Read source →"}</a>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function sortItems(items) {
    return [...items].sort((a, b) => {
      const timeA = Date.parse(a.publishedAt || "") || 0;
      const timeB = Date.parse(b.publishedAt || "") || 0;
      if (timeA !== timeB) {
        return timeB - timeA;
      }

      return String(a.title || "").localeCompare(String(b.title || ""));
    });
  }

  function normalizeTitle(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[’']/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function formatPublishedLabel(value, lang) {
    const parsed = Date.parse(value || "");
    if (!Number.isFinite(parsed)) {
      return "";
    }

    return new Intl.DateTimeFormat(lang === "it" ? "it-IT" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(parsed));
  }

  function estimateReadTime(text, lang) {
    const words = String(text || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 180));
    return lang === "it" ? `${minutes} min` : `${minutes} min read`;
  }

  function formatReadTimeLabel(item, lang) {
    const readingMinutes = Number(item?.readingMinutes);
    if (Number.isFinite(readingMinutes) && readingMinutes > 0) {
      return lang === "it"
        ? `${Math.max(1, Math.ceil(readingMinutes))} min`
        : `${Math.max(1, Math.ceil(readingMinutes))} min read`;
    }

    const text = [item?.title, item?.summary].filter(Boolean).join(" ");
    return estimateReadTime(text, lang);
  }

  function safeHref(href) {
    return href || "#top";
  }

  function appendSiteFooter(activeLanguage) {
    const main = document.querySelector("main.app-shell");
    if (!main || main.querySelector(".site-footer")) {
      return;
    }

    const footer = document.createElement("footer");
    footer.className = "site-footer panel reveal";
    footer.innerHTML = `
      <div class="site-footer-grid">
        <div class="site-footer-copyblock">
          <p class="eyebrow">Footer</p>
          <p class="site-footer-copy">
            © 2026 Piero Pasquariello. ${activeLanguage === "it" ? "Tutti i diritti riservati." : "All rights reserved."}
          </p>
          <p class="site-footer-legal">
            ${
              activeLanguage === "it"
                ? "I contenuti hanno finalità informative e non costituiscono consulenza finanziaria."
                : "Content is for informational purposes only and does not constitute financial advice."
            }
          </p>
        </div>
        <div class="site-footer-links" aria-label="${activeLanguage === "it" ? "Link rapidi" : "Quick links"}">
          <a href="/">${activeLanguage === "it" ? "Home" : "Home"}</a>
          <a href="/writing/">${activeLanguage === "it" ? "Archivi" : "Archives"}</a>
          <a href="/about/">${activeLanguage === "it" ? "About" : "About"}</a>
          <a href="https://x.com/PieroPasqiari88" target="_blank" rel="noreferrer">X</a>
          <a href="https://medium.com/@pieropasquariello" target="_blank" rel="noreferrer">Medium</a>
        </div>
      </div>
    `;

    main.appendChild(footer);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }
})();
