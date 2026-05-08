import ResourceGate from "./ResourceGate";

function ResourceCard({ resource, access }) {
  return (
    <article className="library-card resource-card">
      <div className="library-card-meta">
        <span>{resource.category}</span>
        <span>{resource.auditRelevance}</span>
      </div>
      <h3>{resource.title}</h3>
      <p>{resource.preview}</p>
      <ResourceGate resource={resource} access={access} source="resource-library" />
    </article>
  );
}

export default ResourceCard;
