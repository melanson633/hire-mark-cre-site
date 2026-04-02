import RevealSection from "../components/RevealSection";

function ToolsSection({ content }) {
  return (
    <RevealSection
      id="tools"
      eyebrow={content.eyebrow}
      title={content.title}
      intro={content.intro}
    >
      <div className="tool-stack">
        {content.ideas.map((idea) => (
          <article className="tool-row" key={idea}>
            <span className="tool-bullet" />
            <p>{idea}</p>
          </article>
        ))}
      </div>
    </RevealSection>
  );
}

export default ToolsSection;
