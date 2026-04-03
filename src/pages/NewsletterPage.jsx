import RevealSection from '../components/RevealSection';
import NewsletterForm from '../components/NewsletterForm';
import { newsletterContent } from '../content/newsletter';
import { siteMeta } from '../content/siteMeta';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function NewsletterPage() {
  useDocumentTitle("Newsletter", "Join the Finance x Tech Briefing for CRE research updates.");
  return (
    <RevealSection
      id="newsletter"
      eyebrow="Newsletter"
      title={newsletterContent.title}
      intro={newsletterContent.body}
    >
      <NewsletterForm content={newsletterContent} contactEmail={siteMeta.contact.email} />
      <p className="text-muted">{newsletterContent.placeholderNote}</p>
    </RevealSection>
  );
}
