import RevealSection from "../components/RevealSection";

function WorkSection({ content }) {
  return (
    <RevealSection
      id="work"
      eyebrow={content.eyebrow}
      title={content.title}
      intro={content.intro}
    >
      <div className="work-grid">
        {content.items.map((item) => (
          <article className="work-card" key={item.title}>
            <p className="work-category">{item.category}</p>
            <h3>{item.title}</h3>
            <p className="work-summary">{item.summary}</p>
            <ul className="chip-list">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </RevealSection>
  );
}

export default WorkSection;
