import RevealSection from "../components/RevealSection";

function ContactSection({ content, contact }) {
  return (
    <RevealSection
      id="contact"
      eyebrow={content.eyebrow}
      title={content.title}
      intro={content.intro}
    >
      <div className="contact-panel">
        <div>
          <h3>{content.heading}</h3>
          <p>{content.body}</p>
        </div>
        <div className="contact-links">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={contact.phoneHref}>{contact.phoneLabel}</a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <span>{contact.location}</span>
        </div>
      </div>
    </RevealSection>
  );
}

export default ContactSection;
