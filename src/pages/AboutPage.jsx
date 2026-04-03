import { about } from "../content/about";
import { siteMeta } from "../content/siteMeta";
import RevealSection from "../components/RevealSection";
import useDocumentTitle from "../hooks/useDocumentTitle";

function AboutPage() {
  useDocumentTitle("About", "Mark Melanson builds CRE finance tools, Excel models, and AI workflows.");
  return (
    <RevealSection
      id="about"
      eyebrow={about.eyebrow}
      title={about.title}
      intro={about.intro}
    >
      <div className="about-content">
        {about.sections.map((section) => (
          <div key={section.heading} className="about-block">
            <h3>{section.heading}</h3>
            {section.text && <p>{section.text}</p>}
            {section.items && (
              <ul className="plain-list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="about-block about-contact">
          <h3>Get in touch</h3>
          <p>{about.contact.text}</p>
          <div className="about-links">
            <a href={`mailto:${siteMeta.contact.email}`} className="button-primary">
              {siteMeta.contact.email}
            </a>
            <a href={siteMeta.contact.linkedin} className="button-secondary" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

export default AboutPage;
