import { useState } from "react";
import { allPrompts, promptCategories } from "../content/prompts";
import RevealSection from "../components/RevealSection";
import PromptCard from "../components/PromptCard";
import TagFilter from "../components/TagFilter";
import useDocumentTitle from "../hooks/useDocumentTitle";

function PromptsPage() {
  useDocumentTitle("Prompts", "Production-tested prompts for CRE document processing.");
  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = activeCategory
    ? allPrompts.filter((p) => p.category === activeCategory)
    : allPrompts;

  return (
    <RevealSection
      id="prompts"
      eyebrow="Prompt Library"
      title="Production-tested prompts for CRE document processing."
      intro="Every prompt here was built to solve a real extraction or analysis problem. Copy any prompt and use it directly — no gates, no sign-ups."
    >
      <TagFilter
        tags={promptCategories}
        activeTag={activeCategory}
        onSelect={setActiveCategory}
      />
      <div className="prompts-grid">
        {filtered.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </RevealSection>
  );
}

export default PromptsPage;
