import { useEffect, useId, useMemo, useRef, useState } from "react";
import { importedCaseStudyArtifacts } from "../content/caseStudies";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "../styles/teaser.css";

const signupEndpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT || "";
const skillPackDownload = "/downloads/cowork-metaprompt.zip";

const landingCopy = {
  title: "Automate the SMB work stuck in inboxes, spreadsheets, and PDFs.",
  description:
    "Forward-deployed AI and process automation consulting for SMB teams buried in inboxes, spreadsheets, PDFs, field notes, and recurring reporting work.",
  comingSoon:
    "Full site coming soon. There is no official target date for the full rollout.",
  ctaTitle: "Get the free launch pack",
  ctaBody:
    "Enter your email and grab the Cowork-Metaprompt skill — a drop-in prompt rewriter for Cowork and Claude Code. More prompt library and weekly operator notes follow as the library comes online.",
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
  "Cowork-Metaprompt skill: rewrites raw prompts into Claude-best-practice form",
  "Prompt library for document, spreadsheet, and workflow analysis",
  "Weekly notes on practical SMB AI automation patterns",
];

const audienceSignals = [
  "Owner-led SMBs with messy but valuable operating knowledge",
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

function SignupForm({ compact = false }) {
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

    if (!signupEndpoint) {
      setStatus("preview");
      setMessage(
        "Preview mode: the email provider is not connected yet, but your skill pack is ready below.",
      );
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
        "You are on the launch list. Grab the skill pack now and watch your inbox for the next drop.",
      );
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Signup did not complete. Try again after the launch form is connected.");
    }
  }

  const submitted = status === "success" || status === "preview";

  if (submitted) {
    return (
      <div
        className={
          compact
            ? "landing-signup landing-signup-compact landing-signup-submitted"
            : "landing-signup landing-signup-submitted"
        }
        aria-live="polite"
      >
        <p className={`landing-form-note landing-form-note-${status}`}>{message}</p>
        <a
          className="landing-download-button"
          href={skillPackDownload}
          download="cowork-metaprompt.zip"
        >
          Download the Cowork-Metaprompt skill pack
        </a>
        <p className="landing-form-note">
          Unzips to a <code>cowork-metaprompt/</code> folder — drop it into{" "}
          <code>~/.claude/skills/</code> (macOS / Linux) or{" "}
          <code>%APPDATA%\Claude\skills\</code> (Windows). Includes SKILL.md, seven
          reference playbooks, and a 10-case eval set.
        </p>
      </div>
    );
  }

  return (
    <form className={compact ? "landing-signup landing-signup-compact" : "landing-signup"} onSubmit={handleSubmit}>
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
          Send me the pack
        </button>
      </div>
      <p className={`landing-form-note landing-form-note-${status}`} aria-live="polite">
        {message ||
          "Free Cowork-Metaprompt skill download after submit. Newsletter access follows."}
      </p>
    </form>
  );
}

function TeaserPage() {
  const revealRoot = useRef(null);
  const heroSignupRef = useRef(null);

  useDocumentTitle("SMB AI Automation Consulting", landingCopy.description);

  const patternCards = useMemo(
    () => [
      {
        title: "Documents become structured work",
        body:
          "Contracts, invoices, PDFs, and source packets can become reviewable fields, exception queues, and decision-ready summaries.",
        source: importedCaseStudyArtifacts[0]?.category,
      },
      {
        title: "Field data reaches the back office cleanly",
        body:
          "Crew notes, time, materials, approvals, and job details can move through a controlled workflow instead of another manual cleanup loop.",
        source: importedCaseStudyArtifacts[1]?.category,
      },
      {
        title: "Spreadsheet logic gets guardrails",
        body:
          "Recurring workbooks, operating reports, estimates, and model refreshes need validation checks, audit trails, and clear owner handoffs.",
        source: importedCaseStudyArtifacts[3]?.category,
      },
    ],
    [],
  );

  useEffect(() => {
    const root = revealRoot.current;
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
      { threshold: 0.16 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  function focusSignup() {
    const input = heroSignupRef.current?.querySelector("input");
    input?.focus();
  }

  return (
    <div className="teaser-page" ref={revealRoot}>
      <header className="landing-nav" aria-label="Launch page status">
        <div>
          <img
            className="landing-logo"
            src="/brand/hiremark-ai-logo-header.png"
            alt="markbuilds.ai"
          />
        </div>
        <button type="button" onClick={focusSignup}>
          Get the free pack
        </button>
      </header>

      <section className="teaser-hero landing-reveal">
        <div className="landing-hero-copy">
          <p className="landing-kicker">SMB AI and process automation consulting</p>
          <h1>
            Automate the SMB work stuck in inboxes, spreadsheets, and PDFs.
          </h1>
          <p className="landing-description">{landingCopy.description}</p>
          <p className="landing-coming-soon">{landingCopy.comingSoon}</p>
          <div className="landing-pack-strip" aria-label="Free launch pack includes">
            {packItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="landing-cta-panel" ref={heroSignupRef}>
            <div>
              <p className="landing-panel-label">{landingCopy.ctaTitle}</p>
              <p>{landingCopy.ctaBody}</p>
            </div>
            <SignupForm compact />
          </div>
        </div>

        <aside className="landing-visual" aria-label="AI automation operating system preview">
          <div className="landing-image-frame">
            <img
              src={landingImages.hero.src}
              alt={landingImages.hero.alt}
            />
          </div>
          <div className="landing-image-strip" aria-label="Supporting automation image concepts">
            {landingImages.support.map((image) => (
              <img src={image.src} alt={image.alt} key={image.src} />
            ))}
            <p>Workflow map, exception triage, and reporting desk.</p>
          </div>
        </aside>
      </section>

      <section className="landing-section landing-reveal" aria-label="Service model">
        <div className="landing-section-heading">
          <p className="landing-kicker">Forward deployed services</p>
          <h2>Not strategy theater. Practical builds in the actual operating layer.</h2>
        </div>
        <div className="landing-offer-grid">
          <article className="landing-card landing-card-lead">
            <h3>Most teams do not need a bigger AI vision. They need one painful workflow made measurable, repeatable, and easier to run.</h3>
            <p>
              The work starts where the process already leaks time: intake, cleanup, review, routing, reporting, and exception handling.
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

      <section className="landing-section landing-split landing-reveal" aria-label="Work patterns">
        <div>
          <p className="landing-kicker">Patterns behind the offer</p>
          <h2>Useful AI work usually starts with the same business problems.</h2>
          <p>
            The public case-study artifacts are grounding material, not a narrow service menu.
            The larger pattern is turning scattered operational context into repeatable systems
            that people trust enough to use every week.
          </p>
          <button className="landing-text-button" type="button" onClick={focusSignup}>
            Send me the launch pack
          </button>
        </div>
        <div className="landing-pattern-list">
          {patternCards.map((card) => (
            <article className="landing-pattern" key={card.title}>
              <p>{card.source || "Operating workflow"}</p>
              <h3>{card.title}</h3>
              <span>{card.body}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-bottom landing-reveal" aria-label="Audience and launch status">
        <div className="landing-audience">
          <p className="landing-kicker">Built for</p>
          <ul>
            {audienceSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </div>
        <div className="landing-final-cta">
          <p className="landing-panel-label">Coming soon, no public date</p>
          <h2>Join the list before the full site rolls out.</h2>
          <SignupForm />
        </div>
      </section>
    </div>
  );
}

export default TeaserPage;
