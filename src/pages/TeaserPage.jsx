import { useId, useRef, useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "../styles/teaser.css";

const launchPackRequestEndpoint = "/api/launch-pack-request";
const launchPackDownload = "/downloads/OM%20to%20Excel%20UW%20Model%20Prompt.md";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const accessItems = [
  {
    title: "Discounted AI audit priority",
    body: "First access to company AI audit openings as implementation capacity is released.",
  },
  {
    title: "Beta product openings",
    body: "Early invitations to practical tools, templates, and workflow experiments.",
  },
  {
    title: "Weekly workflow assets",
    body: "New prompts, templates, workflow notes, mini-tools, or comparable implementation assets sent by email.",
  },
  {
    title: "Rollout notifications",
    body: "Early notice as the full platform and product releases come online.",
  },
  {
    title: "Immediate underwriting prompt delivery",
    body: "The OM to Excel UW Model Prompt is emailed right after signup.",
  },
];

function SignupForm() {
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !emailPattern.test(normalizedEmail)) {
      setStatus("error");
      setMessage("Enter a valid email address to join early access.");
      return;
    }

    setStatus("loading");
    setMessage("Sending your early access request...");

    try {
      const response = await fetch(launchPackRequestEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          source: "teaser-launch-pack",
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || `Request failed with ${response.status}`);
      }

      setStatus("success");
      setMessage(
        "You are on the early-access list. The OM to Excel UW Model Prompt link is on its way to your inbox.",
      );
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "The request did not complete. Try again in a moment.");
    }
  }

  if (status === "success") {
    return (
      <div className="landing-signup landing-signup-submitted" aria-live="polite">
        <p className="landing-form-note landing-form-note-success">{message}</p>
        <p className="landing-form-note">
          The email includes the public download link for <code>{launchPackDownload}</code>.
        </p>
      </div>
    );
  }

  return (
    <form className="landing-signup" onSubmit={handleSubmit} noValidate>
      <label htmlFor={emailId}>Email address</label>
      <div className="landing-signup-row">
        <input
          id={emailId}
          name="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") {
              setStatus("idle");
              setMessage("");
            }
          }}
          placeholder="you@company.com"
          autoComplete="email"
          aria-describedby={`${emailId}-note`}
          aria-invalid={status === "error" ? "true" : "false"}
          required
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Join early access"}
        </button>
      </div>
      <p
        className={`landing-form-note landing-form-note-${status}`}
        id={`${emailId}-note`}
        aria-live="polite"
      >
        {message ||
          "The OM to Excel UW Model Prompt is sent immediately. Additional implementation assets follow by email."}
      </p>
    </form>
  );
}

function TeaserPage() {
  const signupRef = useRef(null);

  useDocumentTitle(
    "markbuilds.ai early access",
    "The full platform is in final buildout. Join early access for audit priority, beta releases, weekly workflow assets, and rollout notes.",
  );

  function focusSignup(event) {
    event.preventDefault();
    signupRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.requestAnimationFrame(() => {
      signupRef.current?.querySelector("input")?.focus({ preventScroll: true });
    });
  }

  return (
    <div className="teaser-page" id="top">
      <header className="landing-nav" aria-label="Primary">
        <a className="landing-logo-link" href="/" aria-label="markbuilds.ai home">
          <img
            className="landing-logo"
            src="/brand/markbuilds-logo-header.svg"
            alt="markbuilds.ai"
          />
        </a>
        <p className="landing-status">Coming soon / early access</p>
      </header>

      <section className="teaser-hero" id="launch-pack" ref={signupRef}>
        <div className="landing-hero-copy">
          <p className="landing-kicker">Formal rollout soon</p>
          <h1>Early access is opening.</h1>
          <p className="landing-positioning">
            The full platform is in its final buildout. Join the private list for
            discounted AI audit priority, beta product access, weekly workflow
            assets, rollout alerts, and the OM to Excel UW Model Prompt delivered now.
          </p>
        </div>

        <div className="landing-access-panel" aria-label="Early access signup">
          <p className="landing-panel-label">Private launch list</p>
          <h2>Join once. Get the underwriting prompt now and practical workflow assets after.</h2>
          <SignupForm />
        </div>
      </section>

      <section className="landing-section landing-access-ledger" aria-labelledby="access-heading">
        <div className="landing-section-heading">
          <p className="landing-kicker">Early access includes</p>
          <h2 id="access-heading">Practical AI implementation assets as the platform rolls out.</h2>
        </div>
        <div className="landing-ledger-list">
          {accessItems.map((item) => (
            <article className="landing-ledger-row" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-bottom" aria-label="Limited availability">
        <div>
          <p className="landing-kicker">Limited availability</p>
          <h2>Early access stays intentionally small while the platform is finalized.</h2>
        </div>
        <div className="landing-bottom-copy">
          <p>
            Audit slots and beta releases will open in controlled batches so each
            implementation path stays practical, reviewed, and useful.
          </p>
          <a className="landing-primary-button" href="/#launch-pack" onClick={focusSignup}>
            Get early access
          </a>
        </div>
      </section>

      <footer className="landing-footer" aria-label="Footer">
        <img src="/brand/markbuilds-logo-header.svg" alt="markbuilds.ai" />
        <p>Full rollout coming soon.</p>
      </footer>
    </div>
  );
}

export default TeaserPage;
