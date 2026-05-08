import RevealSection from '../components/RevealSection';
import DSCRCalculator from '../components/DSCRCalculator';
import EmailCaptureForm from "../components/EmailCaptureForm";
import { toolsPage, toolPreviews } from "../content/tools";
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useMemberAccess } from "../hooks/useMemberAccess";

export default function ToolsPage() {
  const access = useMemberAccess();
  useDocumentTitle("Tools", "CRE calculators and private AI workflow demos.");

  return (
    <>
      <RevealSection
        id="tools"
        eyebrow={toolsPage.eyebrow}
        title={toolsPage.title}
        intro={toolsPage.intro}
      >
        <div className="tools-layout">
          <div className="tool-workspace">
            <div>
              <p className="panel-label">Ready now</p>
              <h3>DSCR quick check</h3>
              <p>Use the calculator directly while the document AI demos stay controlled.</p>
            </div>
            <DSCRCalculator />
          </div>
          <div className="library-grid">
            {toolPreviews.map((tool) => (
              <article className="library-card" key={tool.title}>
                <div className="library-card-meta">
                  <span>{tool.status}</span>
                  <span>Tool preview</span>
                </div>
                <h3>{tool.title}</h3>
                <p>{tool.body}</p>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>
      <RevealSection
        id="tool-access"
        eyebrow="Tool access"
        title="Get notified when private workflow demos open."
        intro="This source is tracked separately from audit requests and library joins."
      >
        {access.hasAccess ? (
          <p className="signup-title">Tool-preview access noted for {access.memberEmail}.</p>
        ) : (
          <EmailCaptureForm
            source="tool-preview"
            buttonLabel="Join tool list"
            note="No production AI behavior is implied by the previews above."
            onSuccess={access.grantAccess}
          />
        )}
      </RevealSection>
    </>
  );
}
