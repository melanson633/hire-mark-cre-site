function HeroSection({ launchStrip, hero }) {
  return (
    <>
      <section className="launch-strip" aria-label="Launch status">
        <p>
          {launchStrip.text}
          <span>{launchStrip.detail}</span>
        </p>
        <a href={launchStrip.cta.href}>{launchStrip.cta.label}</a>
      </section>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p className="hero-intro">{hero.intro}</p>
          <div className="hero-actions">
            <a className="button-primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </a>
            <a className="button-secondary" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </a>
          </div>
          <p className="hero-footnote">{hero.footnote}</p>
        </div>
        <aside className="hero-panel">
          <p className="panel-label">{hero.panelLabel}</p>
          <ul>
            {hero.panelItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  );
}

export default HeroSection;
