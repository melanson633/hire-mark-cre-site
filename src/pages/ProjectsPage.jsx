import { allProjects } from "../content/projects";
import { allTemplates } from "../content/templates";
import RevealSection from "../components/RevealSection";
import ProjectCard from "../components/ProjectCard";
import TemplateCard from "../components/TemplateCard";
import useDocumentTitle from "../hooks/useDocumentTitle";

function ProjectsPage() {
  useDocumentTitle("Projects", "AI automation, financial modeling, and CRE operations tools built from real operating experience.");
  return (
    <>
      <RevealSection
        id="projects"
        eyebrow="Projects"
        title="Systems built from real operating experience."
        intro="AI automation, financial modeling, and CRE operations tools — each one solving a problem encountered in production environments."
      >
        <div className="work-grid projects-grid">
          {allProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </RevealSection>

      <RevealSection
        id="templates"
        eyebrow="Templates"
        title="Excel templates from production workflows."
        intro="Download and use directly — built from real CRE operating environments."
      >
        <div className="work-grid templates-grid">
          {allTemplates.map((template) => (
            <TemplateCard key={template.slug} template={template} />
          ))}
        </div>
      </RevealSection>
    </>
  );
}

export default ProjectsPage;
