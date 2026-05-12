const site = {
  xUrl: "https://x.com/PieroPasqiari88",
  mediumUrl: "https://medium.com/@pieropasquariello",
  latestArticleUrl:
    "https://medium.com/@pieropasquariello/cronos-app-is-not-about-turning-everyone-into-a-trader-755d7d64136a",
  redditUrl: "#reddit",
  bio:
    "I write simple, human content about Cronos, DeFi and on-chain finance, without jargon or unnecessary noise.",
  sections: [
    {
      id: "global-writing",
      label: "EN / Global writing",
      description: "English Medium articles and LinkedIn posts about Cronos, Web3 and digital finance.",
      href: "https://medium.com/@pieropasquariello",
      language: "en",
      items: [
        {
          language: "en",
          source: "medium",
          badge: "Medium",
          title: "Cronos App Is Not About Turning Everyone Into a Trader",
          summary:
            "Because the next wave of users does not need more trading noise. It needs clarity, context and a product that feels usable from day one.",
          meta: "Medium article",
          href: "https://medium.com/@pieropasquariello/cronos-app-is-not-about-turning-everyone-into-a-trader-755d7d64136a",
          image: "https://cdn-images-1.medium.com/max/1024/1*nMbmzHGRdCLWU9eX5U4CKQ.png",
          imageAlt: "Cover image from the Medium article about Cronos App and trading noise",
        },
        {
          language: "en",
          source: "medium",
          badge: "Cronos App",
          title: "Cronos App and the Problem of Too Many Financial Apps",
          summary:
            "A focused piece on fragmentation in financial apps and why simpler, more coherent experiences win trust.",
          meta: "Medium article",
          href: "https://medium.com/@pieropasquariello/cronos-app-and-the-problem-of-too-many-financial-apps-3f1f580260bc",
          image: "https://cdn-images-1.medium.com/max/1024/1*C9_pli7yGAxlNS6vuvKfvA.png",
          imageAlt: "Cover image from the Medium article about too many financial apps",
        },
        {
          language: "en",
          source: "linkedin",
          badge: "LinkedIn EN",
          title: "247 Markets Need Better Mobile Experience",
          summary:
            "Tokenized markets need mobile-first clarity if they want normal users to trust what they see.",
          meta: "LinkedIn article",
          href: "https://www.linkedin.com/pulse/247-markets-need-better-mobile-experience-piero-pasquariello-zsbfc/",
          image: "./assets/ougo.png",
          imageAlt: "LinkedIn cover about 24/7 markets made understandable",
        },
        {
          language: "en",
          source: "linkedin",
          badge: "LinkedIn EN",
          title: "Most crypto apps still feel like they were built for power users",
          summary:
            "A simple take on why product clarity matters more than another technical feature drop.",
          meta: "LinkedIn article",
          href: "https://www.linkedin.com/posts/piero-pasquariello-778a9212a_ugcPost-7458535000385179649-lnZV?utm_source=share&utm_medium=member_desktop&rcm=ACoAAB_XAswBp4NxXA595vwNFcielzlAweCzWcs",
          image: "./assets/ougo.png",
          imageAlt: "LinkedIn cover about markets made understandable",
        },
      ],
    },
    {
      id: "italian-writing",
      label: "IT / Cronos in italiano",
      description: "Articoli Medium e note LinkedIn in italiano su Cronos, CRO e Web3.",
      href: "#posts",
      language: "it",
      items: [
        {
          language: "it",
          source: "medium",
          badge: "Medium IT",
          title: "Perché l’APY non è il vero punto della nuova proposta CRO",
          summary:
            "Una spiegazione semplice della nuova proposta CRO: non solo staking reward, ma anche funding, revenue, exit commitment e sostenibilità.",
          meta: "Medium IT",
          href: "https://medium.com/@pieropasquariello/perch%C3%A9-lapy-non-%C3%A8-il-vero-punto-della-nuova-proposta-cro-022a26e97b92?source=rss-d7209a415961------2",
          image: "https://cdn-images-1.medium.com/max/1024/1*dl7SGvr7YoelLdGY-AF8Hg.png",
          imageAlt: "Cover image from the Italian Medium article about the new CRO proposal",
        },
        {
          language: "it",
          source: "linkedin",
          badge: "LinkedIn IT",
          title: "Perché una UX chiara costruisce fiducia",
          summary:
            "Una nota italiana su come parole semplici, onboarding chiaro e meno rumore aiutano chi entra nel Web3.",
          meta: "LinkedIn IT",
          href: "https://www.linkedin.com/pulse/247-markets-need-better-mobile-experience-piero-pasquariello-zsbfc/",
          image: "./assets/ougo.png",
          imageAlt: "LinkedIn cover about 24/7 markets made understandable",
        },
        {
          language: "it",
          source: "linkedin",
          badge: "LinkedIn IT",
          title: "Cronos funziona meglio quando è spiegato bene",
          summary:
            "Un altro passaggio semplice per la community italiana: chiarezza prima del rumore.",
          meta: "LinkedIn IT",
          href: "https://www.linkedin.com/posts/piero-pasquariello-778a9212a_ugcPost-7458536295452160000-2luA?utm_source=share&utm_medium=member_desktop&rcm=ACoAAB_XAswBp4NxXA595vwNFcielzlAweCzWcs",
          image: "./assets/ougo.png",
          imageAlt: "LinkedIn cover about Cronos explained simply",
        },
      ],
    },
  ],
};

const mediumFeedState = {
  status: "idle",
  items: [],
  error: null,
};

const newsItems = [
  {
    id: "cronos-app",
    category: "Cronos App",
    title: "Cronos App puts simplicity first",
    description:
      "A simple take on why consumer crypto needs cleaner interfaces and better education.",
    source: "Product Watch",
    date: "May 2026",
    url: "#",
  },
  {
    id: "defi-journeys",
    category: "DeFi",
    title: "DeFi needs clearer user journeys",
    description:
      "A clearer path through wallets, onboarding and trust is becoming more important than clever terminology.",
    source: "DeFi Radar",
    date: "May 2026",
    url: "#",
  },
  {
    id: "community-signals",
    category: "Community",
    title: "Community signals are moving fast",
    description:
      "A short pulse on the conversations, questions and ideas that are showing up across the ecosystem.",
    source: "Community Watch",
    date: "May 2026",
    url: "#",
  },
];

const els = {
  bio: document.querySelector("#bio"),
  articleList: document.querySelector("#articleList"),
  newsGrid: document.querySelector("#newsGrid"),
  followX: document.querySelector('[data-link="x"]'),
  followLatest: document.querySelector('[data-link="latest-article"]'),
  followMedium: document.querySelector('[data-link="medium"]'),
  followX2: document.querySelector('[data-link="x-follow"]'),
  followMedium2: document.querySelector('[data-link="medium-follow"]'),
  followReddit2: document.querySelector('[data-link="reddit-follow"]'),
};

let activeWritingSectionId = site.sections[0]?.id || "medium";
let writingSwitcherBound = false;
let themeTimerId = null;

render();
setupReveal();
setupActiveNav();
setupWritingSwitcher();
setupTimeBasedTheme();
loadLiveMediumFeed();

function render() {
  els.bio.textContent = site.bio;
  renderNews();
  setLink(els.followX, site.xUrl);
  setLink(els.followLatest, site.latestArticleUrl);
  setLink(els.followMedium, site.mediumUrl);
  setLink(els.followX2, site.xUrl);
  setLink(els.followMedium2, site.mediumUrl);
  setLink(els.followReddit2, site.redditUrl);

  renderWritingSections();
}

function renderWritingSections() {
  const switcher = `
    <div class="writing-switcher" role="tablist" aria-label="Choose writing stream">
      ${site.sections
        .map(
          (section) => `
            <button
              type="button"
              class="writing-switcher-btn${section.id === activeWritingSectionId ? " is-active" : ""}"
              data-writing-tab="${section.id}"
              aria-pressed="${section.id === activeWritingSectionId}"
            >
              ${escapeHtml(section.label)}
            </button>
          `,
        )
        .join("")}
    </div>
  `;

  els.articleList.innerHTML = `${switcher}${site.sections
    .map((section) => {
      const streamItems = getWritingItemsForSection(section);
      const sectionTitle =
        section.id === "global-writing"
          ? "Medium articles and LinkedIn posts"
          : "Cronos in italiano";

      return `
        <section class="writing-section panel" id="${section.id}" data-platform="${section.id}" data-writing-id="${section.id}">
          <div class="writing-section-head">
            <h3>${escapeHtml(sectionTitle)}</h3>
            <a class="section-link" href="${safeHref(section.href)}" ${linkAttrs(section.href)}>${
              section.id === "global-writing" ? "See all →" : "Vai a Cronos →"
            }</a>
          </div>
          <div class="writing-grid">
            ${streamItems.map((item, index) => renderArticleCard(item, section, index === 0)).join("")}
          </div>
        </section>
      `;
    })
    .join("")}`;

  syncWritingSwitcherState();
}

function getWritingItemsForSection(section) {
  const liveMediumItems = mediumFeedState.items.filter(
    (item) => item.source === "medium" && item.language === section.language,
  );
  const fallbackMediumItems = section.items.filter(
    (item) => item.source === "medium" && item.language === section.language,
  );
  const linkedinItems = section.items.filter(
    (item) => item.source === "linkedin" && item.language === section.language,
  );

  const mediumItems = (liveMediumItems.length ? liveMediumItems : fallbackMediumItems).slice(0, 2);

  return [...mediumItems, ...linkedinItems];
}

function renderArticleCard(item, section, featured = false) {
  const cardClass = featured ? "post-card post-card-featured" : "post-card post-card-compact";
  const ctaLabel = section.id === "italian-writing" ? "Apri →" : featured ? "Open article →" : "Read →";
  const showSummary = section.id !== "italian-writing";
  const showTop = section.id !== "italian-writing";

  return `
    <article class="${cardClass}">
      <div class="post-media">
        <img src="${item.image}" alt="${escapeHtml(item.imageAlt)}" loading="lazy" />
      </div>
      <div class="post-body">
        ${showTop ? `<div class="post-top"><span class="article-badge">${escapeHtml(item.badge || section.label)}</span><span class="post-meta-pill">${escapeHtml(item.meta)}</span></div>` : ""}
        <h4>${escapeHtml(item.title)}</h4>
        ${showSummary ? `<p>${escapeHtml(item.summary)}</p>` : ""}
        <div class="post-cta">
          <a class="post-link" href="${safeHref(item.href)}" ${linkAttrs(item.href)}>${ctaLabel}</a>
        </div>
      </div>
    </article>
  `;
}

async function loadLiveMediumFeed() {
  if (typeof fetch !== "function") {
    return;
  }

  mediumFeedState.status = "loading";

  try {
    const response = await fetch("/api/medium", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Medium feed request failed with ${response.status}`);
    }

    const payload = await response.json();
    const items = Array.isArray(payload?.items) ? payload.items : [];

    mediumFeedState.items = items;
    mediumFeedState.status = "ready";
    mediumFeedState.error = null;

    if (items.length && typeof items[0]?.href === "string") {
      site.latestArticleUrl = items[0].href;
      setLink(els.followLatest, site.latestArticleUrl);
    }

    renderWritingSections();
  } catch (error) {
    mediumFeedState.status = "error";
    mediumFeedState.error = error instanceof Error ? error.message : String(error);
  }
}

function renderNews() {
  if (!els.newsGrid) {
    return;
  }

  els.newsGrid.innerHTML = newsItems
    .map(
      (item) => `
        <article class="news-card">
          <div class="news-card-top">
            <span class="news-chip">${escapeHtml(item.category)}</span>
          </div>
          <h3>${escapeHtml(item.title)}</h3>
          <div class="news-card-meta">
            <span>${escapeHtml(item.source)}</span>
            <span>${escapeHtml(item.date)}</span>
          </div>
          <a class="news-link" href="${safeHref(item.url)}" ${linkAttrs(item.url)}>Read →</a>
        </article>
      `,
    )
    .join("");
}

function setLink(node, href) {
  if (!node) {
    return;
  }

  node.href = safeHref(href);
  if (isInternalHref(href)) {
    node.removeAttribute("target");
    node.removeAttribute("rel");
    node.removeAttribute("aria-label");
    return;
  }

  if (href) {
    node.target = "_blank";
    node.rel = "noreferrer";
    node.removeAttribute("aria-label");
    return;
  }

  node.removeAttribute("target");
  node.removeAttribute("rel");
  node.setAttribute("aria-label", "Link da aggiungere");
}

function safeHref(href) {
  return href || "#follow";
}

function linkAttrs(href) {
  if (isInternalHref(href)) {
    return "";
  }

  return href ? 'target="_blank" rel="noreferrer"' : 'aria-label="Link da aggiungere"';
}

function isInternalHref(href) {
  return typeof href === "string" && href.startsWith("#");
}

function setupReveal() {
  const nodes = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 },
  );

  nodes.forEach((node) => observer.observe(node));
}

function setupWritingSwitcher() {
  if (writingSwitcherBound) {
    return;
  }

  writingSwitcherBound = true;

  if (els.articleList) {
    els.articleList.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const button = target.closest("[data-writing-tab]");
      if (!button || !(button instanceof HTMLElement)) {
        return;
      }

      if (!window.matchMedia("(max-width: 920px)").matches) {
        return;
      }

      const nextId = button.dataset.writingTab;
      if (!nextId || nextId === activeWritingSectionId) {
        return;
      }

      activeWritingSectionId = nextId;
      syncWritingSwitcherState();

      const targetSection = document.querySelector(
        `.writing-section[data-writing-id="${activeWritingSectionId}"]`,
      );
      targetSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  window.addEventListener("resize", syncWritingSwitcherState);
  syncWritingSwitcherState();
}

function setupTimeBasedTheme() {
  const NIGHT_START = 18;
  const DAY_START = 7;

  const isNightTime = (date = new Date()) => {
    const hour = date.getHours();
    return hour >= NIGHT_START || hour < DAY_START;
  };

  const nextThemeBoundary = (date = new Date()) => {
    const next = new Date(date);
    const hour = date.getHours();
    const night = isNightTime(date);

    if (night && hour >= NIGHT_START) {
      next.setDate(next.getDate() + 1);
      next.setHours(DAY_START, 0, 0, 0);
    } else if (night) {
      next.setHours(DAY_START, 0, 0, 0);
    } else {
      next.setHours(NIGHT_START, 0, 0, 0);
    }

    return next;
  };

  const applyTheme = () => {
    const night = isNightTime();
    document.documentElement.classList.toggle("theme-night", night);
    document.body.classList.toggle("theme-night", night);
  };

  const schedule = () => {
    if (themeTimerId) {
      window.clearTimeout(themeTimerId);
    }

    const now = new Date();
    const nextBoundary = nextThemeBoundary(now);
    const delay = Math.max(nextBoundary.getTime() - now.getTime(), 60_000);

    themeTimerId = window.setTimeout(() => {
      applyTheme();
      schedule();
    }, delay);
  };

  applyTheme();
  schedule();

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      applyTheme();
      schedule();
    }
  });
}

function syncWritingSwitcherState() {
  const panels = Array.from(document.querySelectorAll(".writing-section"));
  const buttons = Array.from(document.querySelectorAll("[data-writing-tab]"));
  const isMobile = window.matchMedia("(max-width: 920px)").matches;

  panels.forEach((panel) => {
    const panelId = panel.getAttribute("data-writing-id");
    const isActive = panelId === activeWritingSectionId;
    panel.classList.toggle("is-active", isActive);
    panel.classList.toggle("is-hidden-mobile", isMobile && !isActive);
    panel.setAttribute("aria-hidden", isMobile && !isActive ? "true" : "false");
  });

  buttons.forEach((button) => {
    const tabId = button.getAttribute("data-writing-tab");
    const isActive = tabId === activeWritingSectionId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setupActiveNav() {
  const navLinks = Array.from(document.querySelectorAll(".nav-strip a"));
  const trackedSections = Array.from(
    new Set(
      navLinks
        .map((link) => link.getAttribute("href"))
        .filter((href) => href && href.startsWith("#")),
    ),
  )
    .map((href) => document.querySelector(href))
    .filter(Boolean);

  if (!trackedSections.length) {
    return;
  }

  let ticking = false;

  const update = () => {
    ticking = false;
    const thresholdY = window.scrollY + Math.min(260, window.innerHeight * 0.32);
    let activeId = trackedSections[0].id;

    trackedSections.forEach((section) => {
      if (section.offsetTop <= thresholdY) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isActive = href === `#${activeId}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
