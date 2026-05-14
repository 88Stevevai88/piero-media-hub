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
})();
