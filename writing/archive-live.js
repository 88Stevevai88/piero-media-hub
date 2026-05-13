(function () {
  const language = document.documentElement.lang.toLowerCase().startsWith("it") ? "it" : "en";
  const archiveList = document.querySelector(".archive-list");
  const sectionHead = document.querySelector(".archive-section-head h2");
  const sectionLead = document.querySelector(".archive-section-head p");

  if (!archiveList) {
    return;
  }

  const config = {
    en: {
      leadTitle: "Recent writing in English.",
      leadText: "Latest first, with direct links to the article pages and the original source.",
      items: [
        {
          source: "linkedin",
          badge: "LinkedIn",
          title: "247 Markets Need Better Mobile Experience",
          summary:
            "Tokenized markets need mobile-first clarity if they want normal users to trust what they see on screen.",
          meta: "LinkedIn",
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
          meta: "LinkedIn",
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
      items: [
        {
          source: "linkedin",
          badge: "LinkedIn",
          title: "Perché una UX chiara costruisce fiducia",
          summary:
            "Parole semplici e onboarding chiaro riducono il rumore e fanno sentire l'utente più sicuro.",
          meta: "LinkedIn",
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
          meta: "LinkedIn",
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

  const staticItems = config[language].items;

  if (sectionHead) {
    sectionHead.textContent = config[language].leadTitle;
  }

  if (sectionLead) {
    sectionLead.textContent = config[language].leadText;
  }

  renderLoadingState(language);

  loadArchiveItems();

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

        return `
          <article class="archive-item">
            <a class="archive-item-media" href="${safeHref(pageHref)}">
              <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.imageAlt)}" loading="lazy" />
            </a>
            <div class="archive-item-copy">
              <div class="archive-item-meta">
                <span>${escapeHtml(item.badge || (language === "it" ? "Medium IT" : "Medium"))}</span>
                <span>${escapeHtml(language === "it" ? "Italiano" : "English")}</span>
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

  function safeHref(href) {
    return href || "#top";
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
