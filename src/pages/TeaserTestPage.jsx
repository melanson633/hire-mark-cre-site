import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "../styles/teaser-test.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const launchPackRequestEndpoint = "/api/launch-pack-request";
const skillPackDownload = "/downloads/cowork-metaprompt.zip";
const primaryCtaLabel = "Get the free launch pack";
const launchPackCtaLabel = "Request launch pack access";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const landingCopy = {
  title: "Automate the workflows draining your bottom line",
  positioning:
    "Practical AI automation for small and mid-size businesses: we audit the workflow, build the fix, prove the outcome, and keep it running.",
  ctaTitle: "Private launch pack access",
  ctaBody:
    "Enter your email to get the launch pack and first-look access to AI audits, workflow builds, and managed-agent openings as they roll out.",
};

const offerCards = [
  {
    title: "Map the workflow",
    body:
      "Find the handoffs, exception paths, duplicate entry, and fragile spreadsheet logic that slow the team down.",
    proof: "Best when the work already happens every week.",
  },
  {
    title: "Build beside the operator",
    body:
      "Design practical AI-assisted tools inside the real process, then refine them with the people who use the output.",
    proof: "Prompt packs, scripts, checklists, and review queues.",
  },
  {
    title: "Leave usable systems",
    body:
      "Deliver prompts, automations, validation checks, documentation, and repeatable operating habits the team can keep using.",
    proof: "Built for handoff, not dependency.",
  },
];

const packItems = [
  {
    title: "AI Audit",
    body:
      "A structured review of your team's recurring work to identify where AI creates real leverage. You leave with a prioritized roadmap and a defined first build.",
    action: "signup",
  },
  {
    title: "Workflow Solutions",
    body:
      "An engineered automation built around a single measurable outcome. Designed to integrate with your existing tools and your team.",
  },
  {
    title: "Managed Agents",
    body:
      "Operational ownership of your AI systems. We monitor performance, refine the work, and adapt as your business evolves.",
  },
];

const proofItems = [
  {
    label: "Projects",
    title: "Proof-of-capability artifacts",
    body:
      "Review public builds across automation, financial modeling, and operating workflows.",
  },
  {
    label: "Prompts",
    title: "Reusable analysis systems",
    body:
      "Inspect production-oriented prompts for document review, research, and structured output.",
  },
  {
    label: "Tools",
    title: "Operator utilities",
    body:
      "Use calculators and quick-reference tools shaped around recurring finance workflows.",
  },
];

const audienceSignals = [
  "Owner-led small businesses with messy but valuable operating knowledge",
  "Finance, operations, construction, field service, and back-office teams",
  "Leaders who need leverage before they need another large software platform",
];

const landingImages = {
  hero: {
    src: "/landing-images/local-business-automation-blueprint.png",
    alt:
      "Top-down operating blueprint for SMB automation work across intake, routing, review, and reporting",
  },
  support: [
    {
      src: "/landing-images/signal-desk.png",
      alt: "Quiet desk with monitors showing exceptions, follow-up items, and risk signals",
    },
    {
      src: "/landing-images/exception-dashboard.png",
      alt: "Operational dashboard showing intake, review, automation, and human approval lanes",
    },
    {
      src: "/landing-images/workflow-control-room.png",
      alt: "Workflow control room desk showing documents, approvals, and exception queues",
    },
  ],
  service: {
    src: "/landing-images/operator-review-desk.png",
    alt: "Operator reviewing invoices, checklists, and exception notes before turning messy work into a reliable workflow",
  },
};

function InstallDetails() {
  return (
    <details className="landing-install-details">
      <summary>Installation notes for Claude and Cowork users</summary>
      <p>
        Unzip the pack to a <code>cowork-metaprompt/</code> folder and place it in{" "}
        <code>~/.claude/skills/</code> on macOS/Linux or{" "}
        <code>%APPDATA%\Claude\skills\</code> on Windows. It includes SKILL.md,
        reference playbooks, and an eval set.
      </p>
    </details>
  );
}

function SignupForm() {
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  function handleReveal() {
    setIsExpanded(true);
    setStatus("idle");
    setMessage("");
    window.requestAnimationFrame(() => {
      document.getElementById(emailId)?.focus();
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !emailPattern.test(normalizedEmail)) {
      setStatus("error");
      setMessage("Enter a valid email address to request the launch pack.");
      return;
    }

    setStatus("loading");
    setMessage("Sending the launch pack request...");

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
        "Request received. The launch pack link is on its way to your inbox.",
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
          The email includes the download link for <code>{skillPackDownload}</code>.
        </p>
        <InstallDetails />
      </div>
    );
  }

  if (!isExpanded) {
    return (
      <div className="landing-signup landing-signup-prompt">
        <p className="landing-form-note">
          Enter your email to request the launch pack and early access to the first AI audit openings.
        </p>
        <button className="landing-download-button" type="button" onClick={handleReveal}>
          {launchPackCtaLabel}
        </button>
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
          {status === "loading" ? "Sending..." : "Send launch pack"}
        </button>
      </div>
      <p
        className={`landing-form-note landing-form-note-${status}`}
        id={`${emailId}-note`}
        aria-live="polite"
      >
        {message || "Enter your email to unlock the launch pack and early access notes."}
      </p>
    </form>
  );
}

function TeaserPage() {
  const pageRef = useRef(null);
  const launchSignupRef = useRef(null);
  const pulseTimeoutRef = useRef(null);
  const [signupPulse, setSignupPulse] = useState(false);

  useDocumentTitle("markbuilds.ai", landingCopy.positioning);

  useEffect(
    () => {
      const root = pageRef.current;
      if (!root) return undefined;

      const targets = root.querySelectorAll(".landing-reveal");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("landing-revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.14 },
      );

      targets.forEach((target) => observer.observe(target));

      return () => observer.disconnect();
    },
    [],
  );

  useEffect(
    () => () => {
      if (pulseTimeoutRef.current) {
        window.clearTimeout(pulseTimeoutRef.current);
      }
    },
    [],
  );

  useGSAP(
    () => {
      const root = pageRef.current;
      if (!root) return undefined;

      const motionImages = gsap.utils.toArray(".landing-motion-image", root);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        gsap.set(motionImages, { clearProps: "all" });
        return undefined;
      }

      motionImages.forEach((image) => {
        gsap.fromTo(
          image,
          { autoAlpha: 0.78, scale: 0.94 },
          {
            autoAlpha: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top 88%",
              end: "bottom 42%",
              scrub: true,
            },
          },
        );
      });

      return undefined;
    },
    { scope: pageRef },
  );

  function highlightLaunchPack() {
    const section = launchSignupRef.current;
    if (!section) return;

    setSignupPulse(true);

    if (pulseTimeoutRef.current) {
      window.clearTimeout(pulseTimeoutRef.current);
    }

    pulseTimeoutRef.current = window.setTimeout(() => {
      const focusTarget = section.querySelector("input, button");
      focusTarget?.focus({ preventScroll: true });
      setSignupPulse(false);
    }, 720);
  }

  return (
    <div className="teaser-page" id="top" ref={pageRef}>
      <header className="landing-nav" aria-label="Primary">
        <a className="landing-logo-link" href="/" aria-label="markbuilds.ai home">
          <img
            className="landing-logo"
            src="/brand/markbuilds-logo-header.svg"
            alt="markbuilds.ai"
          />
        </a>
      </header>

      <section className="teaser-hero landing-reveal">
        <div className="landing-hero-copy">
          <p className="landing-kicker">Practical AI automation for SMBs</p>
          <h1>{landingCopy.title}</h1>
          <p className="landing-positioning">{landingCopy.positioning}</p>
          <div className="landing-pack-strip" aria-label="Free launch pack includes">
            {packItems.map((item) =>
              item.action === "signup" ? (
                <a
                  className="landing-pack-card"
                  key={item.title}
                  href="/#launch-pack"
                  onClick={highlightLaunchPack}
                >
                  <strong>{item.title}</strong>
                  <span>{item.body}</span>
                </a>
              ) : (
                <button
                  className="landing-pack-card"
                  key={item.title}
                  type="button"
                  onClick={highlightLaunchPack}
                >
                  <strong>{item.title}</strong>
                  <span>{item.body}</span>
                </button>
              ),
            )}
          </div>
          <div className="landing-cta-panel">
            <div>
              <p className="landing-panel-label">{landingCopy.ctaTitle}</p>
              <p>{landingCopy.ctaBody}</p>
            </div>
            <div className="landing-hero-actions">
              <a className="landing-primary-button" href="/#launch-pack" onClick={highlightLaunchPack}>
                {primaryCtaLabel}
              </a>
              <p>Email unlock only. Early access spots stay limited while each offer is built with operators.</p>
            </div>
          </div>
        </div>

        <aside className="landing-visual" aria-label="AI automation operating system preview">
          <div className="landing-image-frame landing-motion-image">
            <img
              src={landingImages.hero.src}
              alt={landingImages.hero.alt}
            />
          </div>
          <div className="landing-image-strip" aria-label="Supporting automation image concepts">
            {landingImages.support.map((image) => (
              <img className="landing-motion-image" src={image.src} alt={image.alt} key={image.src} />
            ))}
          </div>
        </aside>
      </section>

      <section className="landing-section landing-service-model landing-reveal" aria-label="Service model">
        <div className="landing-service-copy landing-section-heading">
          <p className="landing-kicker">Hands-on service model</p>
          <h2>Practical builds in the actual operating layer.</h2>
          <p>
            The work starts where the process already leaks time: intake, cleanup,
            review, routing, reporting, and exception handling.
          </p>
          <img
            className="landing-service-image landing-motion-image"
            src={landingImages.service.src}
            alt={landingImages.service.alt}
          />
        </div>
        <div className="landing-offer-grid">
          <article className="landing-card landing-card-lead">
            <h3>One workflow. Measurable lift.</h3>
            <p>
              The goal is not another AI strategy deck. It is a usable system the
              operator trusts enough to run every week.
            </p>
          </article>
          {offerCards.map((card) => (
            <article className="landing-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <strong>{card.proof}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-proof-section landing-reveal" aria-labelledby="evidence-heading">
        <div className="landing-section-heading">
          <p className="landing-kicker">Evidence you can inspect</p>
          <h2 id="evidence-heading">Real artifacts behind the offer.</h2>
          <p>
            No fake logos or borrowed trust. The strongest proof is public work
            that shows how Mark thinks through prompts, tools, and operating systems.
          </p>
        </div>
        <div className="landing-proof-grid">
          {proofItems.map((item) => (
            <article className="landing-proof-card" key={item.title}>
              <p>{item.label}</p>
              <h3>{item.title}</h3>
              <span>{item.body}</span>
            </article>
          ))}
        </div>
      </section>

      <section
        className={`landing-section landing-bottom landing-reveal ${
          signupPulse ? "landing-bottom-highlight" : ""
        }`}
        aria-label="Audience and launch pack"
        id="launch-pack"
        ref={launchSignupRef}
      >
        <div className="landing-audience">
          <p className="landing-kicker">Built for</p>
          <ul>
            {audienceSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </div>
        <div className="landing-final-cta">
          <p className="landing-panel-label">Launch pack access</p>
          <h2>Get the workflow pack and practical AI notes.</h2>
          <SignupForm />
        </div>
      </section>

      <footer className="landing-footer" aria-label="Footer">
        <img src="/brand/markbuilds-logo-header.svg" alt="markbuilds.ai" />
      </footer>
    </div>
  );
}

export default TeaserPage;
