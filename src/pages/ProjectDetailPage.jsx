import { useParams, Link } from "react-router-dom";
import { allProjects } from "../content/projects";
import RevealSection from "../components/RevealSection";
import useDocumentTitle from "../hooks/useDocumentTitle";

function ProjectDetailPage() {
  const { slug } = useParams();
  const project = allProjects.find((p) => p.slug === slug);
  useDocumentTitle(project ? project.title : "Project Not Found");

  if (!project) {
    return (
      <RevealSection id="not-found" eyebrow="404" title="Project not found.">
        <p className="work-summary">
          <Link to="/projects" className="card-link">Back to projects</Link>
        </p>
      </RevealSection>
    );
  }

  return (
    <RevealSection
      id={project.slug}
      eyebrow={project.category}
      title={project.title}
      intro={project.summary}
    >
      {project.description && (
        <div className="detail-description">
          <p>{project.description}</p>
        </div>
      )}

      {project.techStack && project.techStack.length > 0 && (
        <div className="detail-section">
          <h3>Tech Stack</h3>
          <ul className="chip-list">
            {project.techStack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      )}

      {project.features && project.features.length > 0 && (
        <div className="detail-section">
          <h3>Features</h3>
          <ul className="detail-list">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {project.artifacts && project.artifacts.length > 0 && (
        <div className="detail-section">
          <h3>Artifacts</h3>
          <ul className="chip-list">
            {project.artifacts.map((artifact) => (
              <li key={artifact.label}>{artifact.label}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="detail-back">
        <Link to="/projects" className="card-link">Back to all projects</Link>
      </div>
    </RevealSection>
  );
}

export default ProjectDetailPage;
