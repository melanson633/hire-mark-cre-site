import { useState } from "react";
import CopyButton from "./CopyButton";

function PromptCard({ prompt }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="prompt-card">
      <p className="work-category">{prompt.category}</p>
      <h3>{prompt.title}</h3>
      <p className="work-summary">{prompt.purpose}</p>

      <div className="prompt-meta">
        <div className="prompt-meta-item">
          <span className="prompt-meta-label">Input</span>
          <span>{prompt.inputFormat}</span>
        </div>
        <div className="prompt-meta-item">
          <span className="prompt-meta-label">Output</span>
          <span>{prompt.outputFormat}</span>
        </div>
      </div>

      <div className="prompt-tags">
        {prompt.tags.map((tag) => (
          <span key={tag} className="prompt-tag">{tag}</span>
        ))}
      </div>

      <div className="prompt-text-wrapper">
        <div className="prompt-text-header">
          <button
            className="prompt-toggle"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            {expanded ? "Hide prompt" : "View prompt"}
          </button>
          {expanded && <CopyButton text={prompt.promptText} />}
        </div>
        {expanded && (
          <pre className="prompt-text"><code>{prompt.promptText}</code></pre>
        )}
      </div>
    </article>
  );
}

export default PromptCard;
