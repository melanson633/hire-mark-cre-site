function ProofCard({ item }) {
  const title = item.title;
  const body = item.summary || item.description;
  const meta = item.category || item.type || "Artifact";

  return (
    <article className="library-card proof-card">
      <div className="library-card-meta">
        <span>{meta}</span>
        {item.date && <span>{item.date}</span>}
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
      {item.points && (
        <ul className="chip-list">
          {item.points.slice(0, 3).map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
      {item.artifacts && (
        <div className="artifact-links">
          {item.artifacts.map((artifact) => (
            <a key={artifact.href} href={artifact.href}>
              {artifact.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

export default ProofCard;
