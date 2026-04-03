function TagFilter({ tags, activeTag, onSelect }) {
  return (
    <div className="tag-filter" role="group" aria-label="Filter by tag">
      <button
        className={`tag-chip${activeTag === null ? " tag-active" : ""}`}
        onClick={() => onSelect(null)}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          className={`tag-chip${activeTag === tag ? " tag-active" : ""}`}
          onClick={() => onSelect(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export default TagFilter;
