function NewsletterForm({ content, contactEmail }) {
  if (content.mode !== "real") {
    return (
      <div className="signup-inert" role="status">
        <p className="signup-title">{content.inertTitle}</p>
        <p>{content.inertBody}</p>
        <a href={`mailto:${contactEmail}`} className="button-secondary">
          Email Mark directly
        </a>
      </div>
    );
  }

  return (
    <form className="signup-form" onSubmit={(event) => event.preventDefault()}>
      <label className="sr-only" htmlFor="email">
        Email address
      </label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder={content.inputPlaceholder}
      />
      <button type="submit">{content.buttonLabel}</button>
    </form>
  );
}

export default NewsletterForm;
