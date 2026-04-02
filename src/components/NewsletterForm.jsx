import { useState } from "react";

function NewsletterForm({ content }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim()) {
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="signup-success">
        <p className="signup-title">{content.successTitle}</p>
        <p>{content.successBody}</p>
      </div>
    );
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="email">
        Email address
      </label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder={content.inputPlaceholder}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button type="submit">{content.buttonLabel}</button>
    </form>
  );
}

export default NewsletterForm;
