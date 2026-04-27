import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteMeta } from "../content/siteMeta";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "../styles/teaser.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const signupEndpoint = (import.meta.env.VITE_NEWSLETTER_ENDPOINT || "").trim();
const skillPackDownload = "/downloads/cowork-metaprompt.zip";
const primaryCtaLabel = "Get the free launch pack";

const landingCopy = {
  title: "Turn busywork into systems.",
  description:
    "Hands-on AI automation consulting for small-business teams with recurring reporting, document intake, field notes, and spreadsheet review loops.",
  readiness:
    "Launch pack available now for operators who want practical AI leverage before another large platform.",
  ctaTitle: primaryCtaLabel,
  ctaBody:
    "Start with one useful skill pack. Deeper prompt and workflow notes follow.",
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
    title: "Cowork-Metaprompt skill",
    body: "Rewrite raw prompts into Claude-best-practice form.",
    action: "signup",
  },
  {
    title: "Prompt library",
    body: "Document, spreadsheet, and workflow prompts follow the pack.",
  },
  {
    title: "Weekly notes",
    body: "Practical small-business AI automation notes as they ship.",
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
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setMessage("Enter an email address to request the launch pack.");
      return;
    }

    setStatus("loading");
    setMessage("Submitting...");

    try {
      const response = await fetch(signupEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "linkedin-site-launch",
          requested: ["cowork-metaprompt-skill", "prompt-library", "weekly-newsletter"],
        }),
      });

      if (!response.ok) {
        throw new Error(`Signup failed with ${response.status}`);
      }

      setStatus("success");
      setMessage(
        "You are on the launch list. Download the skill pack now and watch your inbox for the next drop.",
      );
      setEmail("");
    } catch {
      setStatus("error");
      setMessage(
        "Signup did not complete. Download the pack directly, or email Mark for the next workflow notes.",
      );
    }
  }

  if (!signupEndpoint) {
    return (
      <div className="landing-signup landing-signup-fallback" role="status">
        <p className="landing-form-note landing-form-note-success">
          Download-first access is open now. Direct email is the fastest way to
          request the next workflow notes.
        </p>
        <div className="landing-action-row">
          <a
            className="landing-download-button"
            href={skillPackDownload}
            download="cowork-metaprompt.zip"
          >
            {primaryCtaLabel}
          </a>
          <a
            className="landing-secondary-link"
            href={`mailto:${siteMeta.contact.email}?subject=markbuilds.ai launch pack`}
          >
            Email Mark directly
          </a>
        </div>
        <InstallDetails />
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="landing-signup landing-signup-submitted" aria-live="polite">
        <p className="landing-form-note landing-form-note-success">{message}</p>
        <a
          className="landing-download-button"
          href={skillPackDownload}
          download="cowork-metaprompt.zip"
        >
          Download the launch pack
        </a>
        <InstallDetails />
      </div>
    );
  }

  return (
    <form className="landing-signup" onSubmit={handleSubmit}>
      <label htmlFor={emailId}>Email address</label>
      <div className="landing-signup-row">
        <input
          id={emailId}
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          autoComplete="email"
          required
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : primaryCtaLabel}
        </button>
      </div>
      <p className={`landing-form-note landing-form-note-${status}`} aria-live="polite">
        {message || "Join the list and get the launch pack after submit."}
      </p>
      {status === "error" ? (
        <div className="landing-form-recovery">
          <a href={skillPackDownload} download="cowork-metaprompt.zip">
            Download the launch pack directly
          </a>
          <a href={`mailto:${siteMeta.contact.email}?subject=markbuilds.ai launch pack`}>
            Email Mark
          </a>
        </div>
      ) : null}
    </form>
  );
}

function TeaserPage() {
  const pageRef = useRef(null);
  const launchSignupRef = useRef(null);
  const pulseTimeoutRef = useRef(null);
  const [signupPulse, setSignupPulse] = useState(false);

  useDocumentTitle("markbuilds.ai", landingCopy.description);

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

      const media = gsap.matchMedia();
      media.add("(min-width: 981px) and (prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({
          trigger: ".landing-service-model",
          start: "top 108px",
          end: "bottom bottom",
          pin: ".landing-service-copy",
          pinSpacing: false,
        });
      });

      return () => media.revert();
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
      const input = section.querySelector("input");
      input?.focus({ preventScroll: true });
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
        <p className="landing-nav-status">Coming soon</p>
      </header>

      <section className="teaser-hero landing-reveal">
        <div className="landing-hero-copy">
          <p className="landing-kicker">Small-business AI automation consulting</p>
          <h1>{landingCopy.title}</h1>
          <p className="landing-description">{landingCopy.description}</p>
          <p className="landing-readiness">{landingCopy.readiness}</p>
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
              <p>One practical skill pack now, with deeper prompt and workflow notes linked in.</p>
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
        </div>
        <div className="landing-offer-grid">
          <article className="landing-card landing-card-lead">
            <h3>Most teams need one painful workflow made measurable, repeatable, and easier to run.</h3>
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
        <nav aria-label="Footer navigation">
          <span>Full site coming soon</span>
          <a href={`mailto:${siteMeta.contact.email}`}>Contact</a>
        </nav>
      </footer>
    </div>
  );
}

export default TeaserPage;
