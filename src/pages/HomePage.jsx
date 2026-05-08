import { Link } from "react-router-dom";
import EmailCaptureForm from "../components/EmailCaptureForm";
import RevealSection from "../components/RevealSection";
import {
  auditLanding,
  auditOffer,
  auditSignals,
  homepageLibraryPreview,
  serviceLanes,
} from "../content/auditSite";
import { siteMeta } from "../content/siteMeta";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useMemberAccess } from "../hooks/useMemberAccess";

function HomePage() {
  const access = useMemberAccess();
  useDocumentTitle(null);

  return (
    <>
      <section className="audit-hero">
        <div className="audit-hero-copy">
          <p className="eyebrow">{auditLanding.eyebrow}</p>
          <h1>{auditLanding.title}</h1>
          <p className="hero-intro">{auditLanding.intro}</p>
          <div className="hero-actions">
            <a className="button-primary" href={auditLanding.primaryCta.href}>
              {auditLanding.primaryCta.label}
            </a>
            <Link className="button-secondary" to={auditLanding.secondaryCta.href}>
              {auditLanding.secondaryCta.label}
            </Link>
          </div>
          <p className="small-note">{auditLanding.proofNote}</p>
        </div>
        <div className="audit-panel">
          <p className="panel-label">Fastest useful starting point</p>
          <h2>Send one workflow that is slow, brittle, or hard to review.</h2>
          <p>
            Best fit: CRE finance, leasing, property management, construction,
            reporting, or document-heavy handoffs with a clear owner.
          </p>
          <a
            href={`mailto:${siteMeta.contact.email}?subject=CRE%20AI%20Audit%20inquiry`}
            className="card-link"
          >
            Email the workflow
          </a>
        </div>
      </section>

      <section className="stats-grid" aria-label="Proof metrics">
        {auditSignals.map((stat) => (
          <article className="stat-card" key={stat.value}>
            <p className="stat-value">{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
          </article>
        ))}
      </section>

      <RevealSection id="audit" {...auditOffer}>
        <ol className="process-list">
          {auditOffer.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </RevealSection>

      <RevealSection
        id="lanes"
        eyebrow="Service lanes"
        title="Where the audit usually finds leverage."
        intro="Each lane can stay as advice, become a lightweight template, or turn into a scoped implementation."
      >
        <div className="library-grid">
          {serviceLanes.map((lane) => (
            <article className="library-card" key={lane.title}>
              <h3>{lane.title}</h3>
              <p>{lane.body}</p>
            </article>
          ))}
        </div>
      </RevealSection>

      <RevealSection id="library-preview" {...homepageLibraryPreview}>
        <div className="split-panel">
          <div className="library-card">
            <h3>Join the resource library</h3>
            <p>
              Unlock selected templates, prompts, and research previews in this
              browser. The audit request remains the primary next step.
            </p>
          </div>
          <div className="library-card">
            {access.hasAccess ? (
              <p className="signup-title">Resource access is unlocked for {access.memberEmail}.</p>
            ) : (
              <EmailCaptureForm
                source="resource-library"
                buttonLabel="Join library"
                note="Soft-gated access. No password or private dashboard in v1."
                onSuccess={access.grantAccess}
              />
            )}
          </div>
        </div>
      </RevealSection>
    </>
  );
}

export default HomePage;
