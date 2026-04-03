import { Link } from 'react-router-dom';
import RevealSection from '../components/RevealSection';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function NotFoundPage() {
  useDocumentTitle("Page Not Found");
  return (
    <RevealSection id="not-found" eyebrow="404" title="Page not found.">
      <p className="work-summary">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link to="/" className="button-primary">
        Back to home
      </Link>
    </RevealSection>
  );
}
