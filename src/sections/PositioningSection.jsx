import RevealSection from "../components/RevealSection";

function PositioningSection({ content }) {
  return (
    <RevealSection
      id="about"
      eyebrow={content.eyebrow}
      title={content.title}
      intro={content.intro}
    >
      <div className="about-grid">
        {content.cards.map((card) => (
          <article className="info-card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </RevealSection>
  );
}

export default PositioningSection;
