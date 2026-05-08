import { useId, useState } from "react";
import { siteMeta } from "../content/siteMeta";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function EmailCaptureForm({ source, buttonLabel, note, onSuccess }) {
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!emailPattern.test(normalizedEmail)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("Saving access...");
    try {
      await submitEmail(normalizedEmail, source);
      onSuccess?.(normalizedEmail);
      setStatus("success");
      setMessage("Access unlocked in this browser.");
      setEmail("");
    } catch (error) {
      if (isLocalPreview()) {
        onSuccess?.(normalizedEmail);
        setStatus("success");
        setMessage("Local preview access unlocked. Production still uses the email endpoint.");
        setEmail("");
        return;
      }
      setStatus("error");
      setMessage(error.message || "The request did not complete.");
    }
  }

  return (
    <form className="access-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor={emailId}>Email address</label>
      <div className="access-form-row">
        <input
          id={emailId}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          autoComplete="email"
          type="email"
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Saving..." : buttonLabel}
        </button>
      </div>
      <p className={`form-note form-note-${status}`} aria-live="polite">
        {message || note}
      </p>
    </form>
  );
}

function isLocalPreview() {
  return ["localhost", "127.0.0.1", ""].includes(window.location.hostname);
}

async function submitEmail(email, source) {
  const response = await fetch(siteMeta.publicInterfaces.memberAccessEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source }),
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || `Request failed with ${response.status}`);
  }
}

export default EmailCaptureForm;
