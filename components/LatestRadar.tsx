import type { RadarItem } from "../data/radarItems";

type LatestRadarProps = {
  items: RadarItem[];
};

export function LatestRadar({ items }: LatestRadarProps) {
  return (
    <section className="radar-section panel reveal" id="radar" aria-label="Latest from my radar">
      <div className="radar-head">
        <div>
          <p className="eyebrow">Latest from my radar</p>
          <h2>Curated updates, articles and community signals from Cronos, Web3 and digital finance.</h2>
        </div>
        <div className="radar-actions" aria-label="Radar controls">
          <button className="radar-arrow" type="button" data-radar-dir="prev" aria-label="Scroll radar left">
            ‹
          </button>
          <button className="radar-arrow" type="button" data-radar-dir="next" aria-label="Scroll radar right">
            ›
          </button>
        </div>
      </div>
      <div className="radar-shell">
        <div className="radar-track" id="radarTrack" tabIndex={0} aria-label="Latest radar cards">
          {items.map((item) => (
            <article className="radar-card" key={`${item.category}-${item.title}`}>
              <div className="radar-card-top">
                <span className="radar-chip">{item.category}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="radar-card-foot">
                <div className="radar-meta">
                  <span>{item.source}</span>
                  <span>{item.date}</span>
                </div>
                <a className="radar-link" href={item.href}>
                  Read more
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
