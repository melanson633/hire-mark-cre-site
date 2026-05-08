import { useState } from "react";
import ResourceCard from "../components/ResourceCard";
import RevealSection from "../components/RevealSection";
import { resourceCategories, resourcePage, resources } from "../content/resources";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useMemberAccess } from "../hooks/useMemberAccess";

function LibraryPage() {
  const [category, setCategory] = useState("All");
  const access = useMemberAccess();
  useDocumentTitle("Library", "Soft-gated CRE AI resources.");

  const visibleResources =
    category === "All" ? resources : resources.filter((item) => item.category === category);

  return (
    <RevealSection
      id="library"
      eyebrow={resourcePage.eyebrow}
      title={resourcePage.title}
      intro={resourcePage.intro}
    >
      <div className="library-toolbar" aria-label="Resource categories">
        {resourceCategories.map((item) => (
          <button
            className={item === category ? "tag-chip tag-active" : "tag-chip"}
            key={item}
            onClick={() => setCategory(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <p className="small-note">{resourcePage.note}</p>
      <div className="library-grid resource-grid">
        {visibleResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} access={access} />
        ))}
      </div>
    </RevealSection>
  );
}

export default LibraryPage;
