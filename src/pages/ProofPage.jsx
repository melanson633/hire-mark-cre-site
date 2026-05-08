import ProofCard from "../components/ProofCard";
import RevealSection from "../components/RevealSection";
import { proofGroups, proofPage } from "../content/proof";
import useDocumentTitle from "../hooks/useDocumentTitle";

function ProofPage() {
  useDocumentTitle("Proof", "Curated CRE AI audit proof library.");

  return (
    <RevealSection
      id="proof"
      eyebrow={proofPage.eyebrow}
      title={proofPage.title}
      intro={proofPage.intro}
    >
      <div className="proof-stack">
        {proofGroups.map((group) => (
          <section className="proof-group" key={group.label}>
            <div className="proof-group-heading">
              <h3>{group.label}</h3>
              <p>{group.summary}</p>
            </div>
            <div className="library-grid">
              {group.items.map((item) => (
                <ProofCard key={item.slug || item.title} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </RevealSection>
  );
}

export default ProofPage;
