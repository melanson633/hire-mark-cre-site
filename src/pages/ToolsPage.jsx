import RevealSection from '../components/RevealSection';
import DSCRCalculator from '../components/DSCRCalculator';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function ToolsPage() {
  useDocumentTitle("Tools", "CRE calculators and quick-reference tools.");
  return (
    <RevealSection
      id="tools"
      eyebrow="Interactive Tools"
      title="CRE calculators and quick-reference tools."
      intro="Practical tools built from real underwriting workflows. Use them directly — no sign-up required."
    >
      <DSCRCalculator />
    </RevealSection>
  );
}
