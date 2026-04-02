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
          <article className="launch-card" key={item.label}>
            <p className="launch-label">{item.label}</p>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </RevealSection>
  );
}

export default LaunchSection;
