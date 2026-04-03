export default function TemplateCard({ template }) {
  return (
    <article className="work-card template-card">
      <p className="work-category">{template.category}</p>
      <h3>{template.title}</h3>
      <p className="work-summary">{template.description}</p>
      <a
        href={"/downloads/" + template.filename}
        download
        className="button-primary"
      >
        Download .xlsx
      </a>
    </article>
  );
}
