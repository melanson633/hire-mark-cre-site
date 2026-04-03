import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <article className="work-card">
      <p className="work-category">{project.category}</p>
      <h3>{project.title}</h3>
      <p className="work-summary">{project.summary}</p>
      <ul className="chip-list">
        {project.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <Link className="card-link" to={`/projects/${project.slug}`}>
        View project
      </Link>
    </article>
  );
}

export default ProjectCard;
