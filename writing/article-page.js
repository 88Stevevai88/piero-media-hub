(function () {
  const shell = document.querySelector(".article-shell");
  if (!shell) {
    return;
  }

  const language = document.documentElement.lang.toLowerCase().startsWith("it") ? "it" : "en";
  rememberLanguagePreference(language);

  const progress = document.createElement("div");
  progress.className = "article-progress";
  progress.innerHTML = "<span></span>";
  document.body.prepend(progress);

  const bar = progress.querySelector("span");

  const updateProgress = () => {
    const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const ratio = Math.min(1, Math.max(0, window.scrollY / scrollRange));
    bar.style.transform = `scaleX(${ratio})`;
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  setupArticleToc();
  appendSiteFooter();

  function setupArticleToc() {
    const prose = shell.querySelector(".article-prose");
    const sidenotes = shell.querySelector(".article-sidenotes");
    if (!(prose instanceof HTMLElement) || !(sidenotes instanceof HTMLElement)) {
      return;
    }

    const headings = Array.from(prose.querySelectorAll("h2"));
    if (!headings.length) {
      return;
    }

    const toc = document.createElement("article");
    toc.className = "article-note panel reveal is-visible article-toc";
    toc.innerHTML = `
      <p class="eyebrow">${language === "it" ? "In questa pagina" : "On this page"}</p>
      <h3>${language === "it" ? "Vai alle sezioni" : "Jump to sections"}</h3>
      <nav class="article-toc-list" aria-label="${language === "it" ? "Indice della pagina" : "Page contents"}"></nav>
    `;

    const tocList = toc.querySelector(".article-toc-list");
    headings.forEach((heading, index) => {
      const text = heading.textContent?.trim() || "";
      const id = heading.id || slugify(text) || `section-${index + 1}`;
      heading.id = id;

      const link = document.createElement("a");
      link.href = `#${id}`;
      link.textContent = text;
      tocList?.appendChild(link);
    });

    const referenceNode = sidenotes.querySelector(".article-note");
    if (referenceNode?.nextSibling) {
      sidenotes.insertBefore(toc, referenceNode.nextSibling);
      return;
    }

    sidenotes.prepend(toc);
  }

  function appendSiteFooter() {
    if (shell.querySelector(".site-footer")) {
      return;
    }

    const isItalian = document.documentElement.lang.toLowerCase().startsWith("it");
    const footer = document.createElement("footer");
    footer.className = "site-footer panel reveal is-visible";
    footer.innerHTML = `
      <div class="site-footer-grid">
        <div class="site-footer-copyblock">
          <p class="eyebrow">Footer</p>
          <p class="site-footer-copy">
            © 2026 Piero Pasquariello. ${isItalian ? "Tutti i diritti riservati." : "All rights reserved."}
          </p>
          <p class="site-footer-legal">
            ${
              isItalian
                ? "I contenuti hanno finalità informative e non costituiscono consulenza finanziaria."
                : "Content is for informational purposes only and does not constitute financial advice."
            }
          </p>
        </div>
        <div class="site-footer-links" aria-label="${isItalian ? "Link rapidi" : "Quick links"}">
          <a href="/">${isItalian ? "Home" : "Home"}</a>
          <a href="/writing/">${isItalian ? "Archivi" : "Archives"}</a>
          <a href="/about/">${isItalian ? "About" : "About"}</a>
          <a href="https://x.com/PieroPasqiari88" target="_blank" rel="noreferrer">X</a>
          <a href="https://medium.com/@pieropasquariello" target="_blank" rel="noreferrer">Medium</a>
        </div>
      </div>
    `;

    shell.appendChild(footer);
  }

  function slugify(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function rememberLanguagePreference(nextLanguage) {
    const normalized = nextLanguage === "it" ? "it" : "en";
    try {
      window.localStorage.setItem("piero-preferred-language", normalized);
    } catch {
      // Ignore storage failures.
    }
  }
})();
