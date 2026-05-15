(function () {
  const shell = document.querySelector(".article-shell");
  if (!shell) {
    return;
  }

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

  appendSiteFooter();

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
})();
