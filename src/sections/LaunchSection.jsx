import RevealSection from "../components/RevealSection";

function LaunchSection({ content }) {
  return (
    <RevealSection
      id="launch"
      eyebrow={content.eyebrow}
      title={content.title}
      intro={content.intro}
    >
      <div className="launch-grid">
        {content.items.map((item) => (
          <article className={`launch-card launch-card-${item.kind}`} key={item.label}>
            <p className="launch-label">{item.label}</p>
            <h3>{item.text}</h3>
            <p>{item.detail}</p>
            <ul className="launch-signals">
              {item.signals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
            <a className="card-link" href={item.href}>{item.cta}</a>
          </article>
        ))}
      </div>
    </RevealSection>
  );
}

export default LaunchSection;
