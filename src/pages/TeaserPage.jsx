import { teaserHome } from "../content/teaserHome";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "../styles/teaser.css";

function ArtifactTable({ rows }) {
  return (
    <div className="teaser-surface teaser-surface-sheet">
      <div className="surface-label">{teaserHome.spreadsheet.label}</div>
      <h2>{teaserHome.spreadsheet.title}</h2>
      <div className="sheet-grid" aria-hidden="true">
        <div className="sheet-grid-head">
          <span>Metric</span>
          <span>Current</span>
          <span>Delta</span>
        </div>
        {rows.map(([metric, current, delta]) => (
          <div className="sheet-grid-row" key={metric}>
            <span>{metric}</span>
            <span>{current}</span>
            <span>{delta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArtifactDashboard({ metrics }) {
  return (
    <div className="teaser-surface teaser-surface-dashboard">
      <div className="surface-label">{teaserHome.dashboard.label}</div>
      <h2>{teaserHome.dashboard.title}</h2>
      <div className="metric-strip" aria-hidden="true">
        {metrics.map((metric) => (
          <div key={metric.label} className="metric-chip">
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </div>
        ))}
      </div>
      <div className="chart-fade" aria-hidden="true" />
    </div>
  );
}

function ArtifactMemo({ lines }) {
  return (
    <div className="teaser-surface teaser-surface-memo">
      <div className="surface-label">{teaserHome.memo.label}</div>
      <h2>{teaserHome.memo.title}</h2>
      <div className="memo-lines">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function TeaserPage() {
  useDocumentTitle("Coming Soon", teaserHome.description);

  return (
    <div className="teaser-page">
      <section className="teaser-hero">
        <div className="teaser-copy">
          <p className="teaser-status">
            <span>{teaserHome.status}</span>
          </p>
          <h1>{teaserHome.title}</h1>
          <p className="teaser-description">{teaserHome.description}</p>
          <div className="teaser-actions">
            <a className="teaser-button" href={teaserHome.primaryCta.href}>
              {teaserHome.primaryCta.label}
            </a>
            <p className="teaser-note">{teaserHome.note}</p>
          </div>
        </div>

        <div className="teaser-artifacts" aria-label={teaserHome.artifactHeader}>
          <div className="artifact-heading">
            <span>{teaserHome.artifactKicker}</span>
            <p>{teaserHome.artifactHeader}</p>
          </div>
          <ArtifactTable rows={teaserHome.spreadsheet.rows} />
          <ArtifactDashboard metrics={teaserHome.dashboard.metrics} />
          <ArtifactMemo lines={teaserHome.memo.lines} />
        </div>
      </section>

      <section className="teaser-lanes" aria-label="Launch themes">
        {teaserHome.lanes.map((lane) => (
          <article key={lane.label} className="teaser-lane">
            <p>{lane.label}</p>
            <h2>{lane.text}</h2>
          </article>
        ))}
      </section>

      <section className="teaser-footer">
        <p>{teaserHome.footer.lead}</p>
        <a href={`mailto:${teaserHome.footer.contactValue}`}>
          {teaserHome.footer.contactLabel}
        </a>
      </section>
    </div>
  );
}

export default TeaserPage;
