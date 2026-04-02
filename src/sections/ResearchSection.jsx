import NewsletterForm from "../components/NewsletterForm";
import RevealSection from "../components/RevealSection";

function ResearchSection({ content, newsletterContent }) {
  return (
    <RevealSection
      id="research"
      eyebrow={content.eyebrow}
      title={content.title}
      intro={content.intro}
    >
      <div className="split-panel">
        <div className="info-card info-card-tall">
          <h3>{content.editorialHeading}</h3>
          <ul className="plain-list">
            {content.themes.map((theme) => (
              <li key={theme}>{theme}</li>
            ))}
          </ul>
        </div>
        <div className="newsletter-card" id="newsletter">
          <p className="panel-label">{newsletterContent.panelLabel}</p>
          <h3>{newsletterContent.title}</h3>
          <p>{newsletterContent.body}</p>
          <NewsletterForm content={newsletterContent} />
          <p className="small-note">{newsletterContent.placeholderNote}</p>
        </div>
      </div>
    </RevealSection>
  );
}

export default ResearchSection;
