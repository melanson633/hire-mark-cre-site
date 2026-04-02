function StatsSection({ stats }) {
  return (
    <section className="stats-grid" aria-label="Selected metrics">
      {stats.map((stat) => (
        <article className="stat-card" key={stat.label}>
          <p className="stat-value">{stat.value}</p>
          <p className="stat-label">{stat.label}</p>
        </article>
      ))}
    </section>
  );
}

export default StatsSection;
