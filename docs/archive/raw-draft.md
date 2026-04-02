import { useState, useEffect, useRef } from “react”;  
  
const COLORS = {  
bg: “#0a0f1a”,  
bgCard: “#111827”,  
bgCardHover: “#1a2235”,  
accent: “#3b82f6”,  
accentGlow: “rgba(59,130,246,0.15)”,  
accentSoft: “#60a5fa”,  
green: “#34d399”,  
amber: “#fbbf24”,  
text: “#e2e8f0”,  
textMuted: “#94a3b8”,  
textDim: “#64748b”,  
border: “#1e293b”,  
borderLight: “#334155”,  
};  
  
// Intersection Observer hook for scroll animations  
function useInView(threshold = 0.15) {  
const ref = useRef(null);  
const [inView, setInView] = useState(false);  
useEffect(() => {  
const el = ref.current;  
if (!el) return;  
const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });  
obs.observe(el);  
return () => obs.disconnect();  
}, [threshold]);  
return [ref, inView];  
}  
  
// Animated counter  
function Counter({ end, suffix = “”, duration = 2000 }) {  
const [val, setVal] = useState(0);  
const [ref, inView] = useInView(0.3);  
useEffect(() => {  
if (!inView) return;  
let start = 0;  
const step = end / (duration / 16);  
const timer = setInterval(() => {  
start += step;  
if (start >= end) { setVal(end); clearInterval(timer); }  
else setVal(Math.floor(start));  
}, 16);  
return () => clearInterval(timer);  
}, [inView, end, duration]);  
return <span ref={ref}>{val}{suffix}</span>;  
}  
  
// Section wrapper with fade-in  
function Section({ children, id, className = “” }) {  
const [ref, inView] = useInView(0.08);  
return (  
<section  
ref={ref}  
id={id}  
className={className}  
style={{  
opacity: inView ? 1 : 0,  
transform: inView ? “translateY(0)” : “translateY(40px)”,  
transition: “opacity 0.8s ease, transform 0.8s ease”,  
}}  
>  
{children}  
</section>  
);  
}  
  
// Portfolio card  
function PortfolioCard({ icon, title, tag, desc, details, delay = 0 }) {  
const [hovered, setHovered] = useState(false);  
return (  
<div  
onMouseEnter={() => setHovered(true)}  
onMouseLeave={() => setHovered(false)}  
style={{  
background: hovered ? COLORS.bgCardHover : COLORS.bgCard,  
border: `1px solid ${hovered ? COLORS.accent : COLORS.border}`,  
borderRadius: 12,  
padding: “28px 24px”,  
transition: “all 0.35s ease”,  
transform: hovered ? “translateY(-4px)” : “translateY(0)”,  
boxShadow: hovered ? `0 8px 32px ${COLORS.accentGlow}` : “0 2px 8px rgba(0,0,0,0.2)”,  
cursor: “default”,  
position: “relative”,  
overflow: “hidden”,  
}}  
>  
{hovered && (  
<div style={{  
position: “absolute”, top: 0, left: 0, right: 0, height: 2,  
background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,  
}} />  
)}  
<div style={{ display: “flex”, alignItems: “center”, gap: 12, marginBottom: 12 }}>  
<span style={{ fontSize: 28 }}>{icon}</span>  
<span style={{  
fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: “uppercase”,  
color: COLORS.accent, background: COLORS.accentGlow, padding: “3px 10px”, borderRadius: 4,  
}}>{tag}</span>  
</div>  
<h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, margin: “0 0 8px”, fontFamily: “‘DM Sans’, sans-serif” }}>{title}</h3>  
<p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.6, margin: “0 0 16px” }}>{desc}</p>  
<div style={{ display: “flex”, flexWrap: “wrap”, gap: 6 }}>  
{details.map((d, i) => (  
<span key={i} style={{  
fontSize: 11, color: COLORS.textDim, background: “rgba(255,255,255,0.04)”,  
border: `1px solid ${COLORS.border}`, borderRadius: 4, padding: “3px 8px”,  
}}>{d}</span>  
))}  
</div>  
</div>  
);  
}  
  
// Newsletter form  
function NewsletterForm() {  
const [email, setEmail] = useState(””);  
const [submitted, setSubmitted] = useState(false);  
const handleSubmit = (e) => {  
e.preventDefault();  
if (email) setSubmitted(true);  
};  
if (submitted) {  
return (  
<div style={{  
textAlign: “center”, padding: “32px 24px”, background: “rgba(52,211,153,0.06)”,  
border: `1px solid ${COLORS.green}`, borderRadius: 12,  
}}>  
<div style={{ fontSize: 36, marginBottom: 12 }}>✓</div>  
<p style={{ fontSize: 18, fontWeight: 600, color: COLORS.green, margin: 0 }}>You’re on the list.</p>  
<p style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 8 }}>First issue drops soon. Watch your inbox.</p>  
</div>  
);  
}  
return (  
<div onSubmit={handleSubmit} style={{ display: “flex”, gap: 12, maxWidth: 480, flexWrap: “wrap” }}>  
<input  
type=“email”  
value={email}  
onChange={(e) => setEmail(e.target.value)}  
placeholder=“your@email.com”  
style={{  
flex: “1 1 240px”, padding: “14px 16px”, fontSize: 15, borderRadius: 8,  
border: `1px solid ${COLORS.borderLight}`, background: COLORS.bgCard,  
color: COLORS.text, outline: “none”, fontFamily: “‘DM Mono’, monospace”,  
}}  
onFocus={(e) => e.target.style.borderColor = COLORS.accent}  
onBlur={(e) => e.target.style.borderColor = COLORS.borderLight}  
/>  
<button  
onClick={handleSubmit}  
style={{  
padding: “14px 28px”, fontSize: 14, fontWeight: 700, borderRadius: 8,  
border: “none”, background: COLORS.accent, color: “#fff”, cursor: “pointer”,  
letterSpacing: 0.5, fontFamily: “‘DM Sans’, sans-serif”,  
transition: “all 0.2s ease”,  
}}  
onMouseEnter={(e) => e.target.style.background = “#2563eb”}  
onMouseLeave={(e) => e.target.style.background = COLORS.accent}  
>  
Subscribe  
</button>  
</div>  
);  
}  
  
export default function HireMarkSite() {  
const [scrollY, setScrollY] = useState(0);  
const [menuOpen, setMenuOpen] = useState(false);  
  
useEffect(() => {  
const link = document.createElement(“link”);  
link.href = “https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap”;  
link.rel = “stylesheet”;  
document.head.appendChild(link);  
const onScroll = () => setScrollY(window.scrollY);  
window.addEventListener(“scroll”, onScroll);  
return () => window.removeEventListener(“scroll”, onScroll);  
}, []);  
  
const nav = [  
{ label: “About”, href: “#about” },  
{ label: “Work”, href: “#work” },  
{ label: “Newsletter”, href: “#newsletter” },  
{ label: “Contact”, href: “#contact” },  
];  
  
return (  
<div style={{ background: COLORS.bg, color: COLORS.text, minHeight: “100vh”, fontFamily: “‘DM Sans’, sans-serif” }}>  
{/* Ambient background */}  
<div style={{  
position: “fixed”, inset: 0, zIndex: 0, pointerEvents: “none”,  
background: `radial-gradient(ellipse 80% 60% at 50% -20%, rgba(59,130,246,0.08), transparent), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(52,211,153,0.04), transparent)`,  
}} />  
  
```  
  {/* Nav */}  
  <nav style={{  
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,  
    background: scrollY > 60 ? "rgba(10,15,26,0.92)" : "transparent",  
    backdropFilter: scrollY > 60 ? "blur(16px)" : "none",  
    borderBottom: scrollY > 60 ? `1px solid ${COLORS.border}` : "1px solid transparent",  
    transition: "all 0.3s ease",  
  }}>  
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>  
      <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: 6 }}>  
        <span style={{ fontSize: 20, fontWeight: 700, color: COLORS.text, fontFamily: "'DM Sans', sans-serif" }}>hire</span>  
        <span style={{ fontSize: 20, fontWeight: 700, color: COLORS.accent }}>-mark</span>  
        <span style={{ fontSize: 14, color: COLORS.textDim }}>.com</span>  
      </a>  
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>  
        {nav.map((n) => (  
          <a key={n.label} href={n.href} style={{  
            fontSize: 13, fontWeight: 500, color: COLORS.textMuted, textDecoration: "none",  
            letterSpacing: 0.5, transition: "color 0.2s",  
          }}  
          onMouseEnter={(e) => e.target.style.color = COLORS.text}  
          onMouseLeave={(e) => e.target.style.color = COLORS.textMuted}  
          >{n.label}</a>  
        ))}  
      </div>  
    </div>  
  </nav>  
  
  {/* Hero */}  
  <div style={{  
    position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", alignItems: "center",  
    padding: "120px 24px 80px",  
  }}>  
    <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>  
      {/* Eyebrow */}  
      <div style={{  
        display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24,  
        padding: "6px 14px", borderRadius: 20, border: `1px solid ${COLORS.border}`,  
        background: "rgba(255,255,255,0.02)",  
      }}>  
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.green, display: "inline-block",  
          boxShadow: `0 0 8px ${COLORS.green}` }} />  
        <span style={{ fontSize: 12, fontWeight: 500, color: COLORS.textMuted, letterSpacing: 0.5 }}>Open to opportunities — Burlington / Boston metro</span>  
      </div>  
  
      <h1 style={{ margin: "0 0 20px", lineHeight: 1.1 }}>  
        <span style={{ display: "block", fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 300, color: COLORS.textMuted, fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}>  
          Finance executive.  
        </span>  
        <span style={{ display: "block", fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 700, color: COLORS.text, fontFamily: "'DM Sans', sans-serif" }}>  
          Systems builder.  
        </span>  
      </h1>  
  
      <p style={{  
        fontSize: "clamp(16px, 2vw, 20px)", color: COLORS.textMuted, maxWidth: 620,  
        lineHeight: 1.65, margin: "0 0 40px",  
      }}>  
        I've spent 9 years running financial operations for institutional real estate portfolios.  
        Along the way, I started building the tools I wished existed — AI workflows, automated reporting,  
        custom applications. Now I'm looking for the company that wants both.  
      </p>  
  
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>  
        <a href="#work" style={{  
          padding: "14px 32px", borderRadius: 8, background: COLORS.accent, color: "#fff",  
          textDecoration: "none", fontWeight: 600, fontSize: 15, transition: "all 0.2s",  
          display: "inline-flex", alignItems: "center", gap: 8,  
        }}>  
          See my work <span style={{ fontSize: 18 }}>→</span>  
        </a>  
        <a href="#contact" style={{  
          padding: "14px 32px", borderRadius: 8, background: "transparent",  
          border: `1px solid ${COLORS.borderLight}`, color: COLORS.text,  
          textDecoration: "none", fontWeight: 500, fontSize: 15, transition: "all 0.2s",  
        }}>  
          Get in touch  
        </a>  
      </div>  
  
      {/* Stats strip */}  
      <div style={{  
        display: "flex", gap: 48, marginTop: 64, flexWrap: "wrap",  
        paddingTop: 32, borderTop: `1px solid ${COLORS.border}`,  
      }}>  
        {[  
          { num: 9, suffix: "+", label: "Years in Finance" },  
          { num: 70, suffix: "+", label: "Properties Managed" },  
          { num: 800, suffix: "M", label: "AUM Overseen ($)" },  
          { num: 34, suffix: "M", label: "Capital Projects ($)" },  
        ].map((s, i) => (  
          <div key={i}>  
            <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.text, fontFamily: "'DM Mono', monospace" }}>  
              <Counter end={s.num} suffix={s.suffix} />  
            </div>  
            <div style={{ fontSize: 12, color: COLORS.textDim, letterSpacing: 0.5, marginTop: 4 }}>{s.label}</div>  
          </div>  
        ))}  
      </div>  
    </div>  
  </div>  
  
  {/* About */}  
  <Section id="about">  
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>  
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>  
        <div>  
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: COLORS.accent, textTransform: "uppercase", marginBottom: 16 }}>About</p>  
          <h2 style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, margin: "0 0 24px", fontFamily: "'DM Sans', sans-serif" }}>  
            The rare intersection of <span style={{ color: COLORS.accent }}>deep finance</span> and <span style={{ color: COLORS.green }}>real technical ability</span>  
          </h2>  
          <p style={{ fontSize: 16, color: COLORS.textMuted, lineHeight: 1.7, margin: "0 0 16px" }}>  
            Most finance leaders describe their tech skills as "proficient in Excel." I build AI-driven automation workflows, Python scripts that replace manual processes, and custom applications deployed to production teams.  
          </p>  
          <p style={{ fontSize: 16, color: COLORS.textMuted, lineHeight: 1.7, margin: 0 }}>  
            Most technologists building finance tools have never sat through a month-end close, managed a construction draw, or explained a DSCR covenant breach to a lender. I've done all of it — for years, across 70+ properties and $800M in assets.  
          </p>  
        </div>  
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>  
          {[  
            { icon: "🏢", title: "CRE Financial Operations", desc: "Full-cycle accounting, JV reporting, lender compliance, budgeting & forecasting across institutional portfolios" },  
            { icon: "⚙️", title: "Systems & Process Design", desc: "Built reporting frameworks, standardized workflows, and financial infrastructure from scratch at scale" },  
            { icon: "🤖", title: "AI & Automation", desc: "Production AI workflows, Python automation, OCR extraction, custom app development — not POCs, real tools in daily use" },  
            { icon: "📊", title: "Financial Modeling", desc: "Institutional-grade Excel templates, asset management models, dynamic dashboards adopted company-wide" },  
          ].map((item, i) => (  
            <div key={i} style={{  
              padding: "20px", borderRadius: 10, border: `1px solid ${COLORS.border}`,  
              background: COLORS.bgCard, display: "flex", gap: 14, alignItems: "flex-start",  
            }}>  
              <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>  
              <div>  
                <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, marginBottom: 4 }}>{item.title}</div>  
                <div style={{ fontSize: 13, color: COLORS.textDim, lineHeight: 1.5 }}>{item.desc}</div>  
              </div>  
            </div>  
          ))}  
        </div>  
      </div>  
    </div>  
  </Section>  
  
  {/* Work / Portfolio */}  
  <Section id="work">  
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>  
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: COLORS.accent, textTransform: "uppercase", marginBottom: 16 }}>Portfolio</p>  
      <h2 style={{ fontSize: 36, fontWeight: 700, margin: "0 0 12px", fontFamily: "'DM Sans', sans-serif" }}>Things I've built</h2>  
      <p style={{ fontSize: 16, color: COLORS.textMuted, marginBottom: 48, maxWidth: 560 }}>  
        A selection of tools, templates, and systems designed at the intersection of finance operations and technology.  
      </p>  
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>  
        <PortfolioCard  
          icon="📐"  
          tag="Excel"  
          title="Institutional Operating Budget Framework"  
          desc="Multi-tab Excel modeling system with dynamic assumption inputs, cross-departmental coordination structure, and automated variance calculations. Deployed across 54 JV properties."  
          details={["Power Query", "Dynamic Arrays", "Data Validation", "54 Properties"]}  
        />  
        <PortfolioCard  
          icon="📈"  
          tag="Financial Model"  
          title="Asset Management Reporting Model"  
          desc="Semi-live post-close accounting data integrated with forward Argus projections. Incorporates NWC changes with drill-down to transaction-level detail. Adopted company-wide."  
          details={["Argus Integration", "Balance Sheet Drill-Down", "NWC Modeling", "Company-Wide Adoption"]}  
        />  
        <PortfolioCard  
          icon="🤖"  
          tag="AI Workflow"  
          title="CRE Report Consolidation Engine"  
          desc="Python application that ingests monthly Yardi financial exports and lead sheets, consolidates into branded PDF packages with parallel processing and persistent configuration."  
          details={["Python", "PyInstaller", "PDF Generation", "Parallel Processing"]}  
        />  
        <PortfolioCard  
          icon="📱"  
          tag="Custom App"  
          title="Field Time-Tracking Application"  
          desc="Mobile-first application deployed to 20+ field construction and maintenance staff. Replaced paper submittals and compressed monthly JV billing cycles by ~20x."  
          details={["Mobile-First", "20+ Users", "20x Cycle Reduction", "Production Deploy"]}  
        />  
        <PortfolioCard  
          icon="🔍"  
          tag="AI Workflow"  
          title="Lease & Loan Document OCR Pipeline"  
          desc="Automated extraction and structuring of key terms from lease agreements and loan documents using OCR and AI classification. Feeds directly into reporting templates."  
          details={["OCR", "Document AI", "Data Extraction", "Template Integration"]}  
        />  
        <PortfolioCard  
          icon="📊"  
          tag="Excel"  
          title="Portfolio Debt & Performance Dashboard"  
          desc="Executive-facing reporting suite with trailing-12 and forward DSCR/LTV calculations, dynamic AR aging, and consolidated dashboards for leadership review."  
          details={["DSCR/LTV Calcs", "AR Aging", "Drill-Down", "Executive Reporting"]}  
        />  
      </div>  
    </div>  
  </Section>  
  
  {/* Career Timeline */}  
  <Section id="timeline">  
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>  
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: COLORS.accent, textTransform: "uppercase", marginBottom: 16 }}>Experience</p>  
      <h2 style={{ fontSize: 36, fontWeight: 700, margin: "0 0 48px", fontFamily: "'DM Sans', sans-serif" }}>The trajectory</h2>  
      <div style={{ position: "relative", paddingLeft: 32 }}>  
        <div style={{  
          position: "absolute", left: 7, top: 8, bottom: 8, width: 2,  
          background: `linear-gradient(to bottom, ${COLORS.accent}, ${COLORS.border})`,  
        }} />  
        {[  
          { year: "2024–2026", title: "VP, Financial Operations", co: "RJ Kelly Co.", desc: "Directed all financial operations for 70+ property, $800M portfolio. Built institutional budget frameworks, standardized lender workflows, created company-wide reporting tools." },  
          { year: "2022–2023", title: "Accounting Manager", co: "RJ Kelly Co.", desc: "Promoted to lead accounting operations. Designed asset management models, executive dashboards, and automated billing systems." },  
          { year: "2019–2021", title: "Property Accountant → Senior", co: "RJ Kelly Co.", desc: "Rapid promotion through property accounting. Managed full-cycle accounting, JV reporting, and began building automation tools." },  
          { year: "2017–2019", title: "Portfolio Accountant", co: "AEW Capital Management", desc: "Fund-level accounting and institutional investor reporting for one of the world's largest real estate investment managers." },  
          { year: "2014–2017", title: "Audit Associate & Co-op", co: "BDO USA / Feeley & Driscoll", desc: "20+ audit engagements across construction, manufacturing, healthcare, and tech. 1,000+ billable hours. GAAP and internal controls foundation." },  
        ].map((item, i) => (  
          <div key={i} style={{ position: "relative", marginBottom: 36, paddingLeft: 24 }}>  
            <div style={{  
              position: "absolute", left: -29, top: 6, width: 12, height: 12, borderRadius: "50%",  
              background: i === 0 ? COLORS.accent : COLORS.bgCard,  
              border: `2px solid ${i === 0 ? COLORS.accent : COLORS.borderLight}`,  
              boxShadow: i === 0 ? `0 0 12px ${COLORS.accentGlow}` : "none",  
            }} />  
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent, fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>{item.year}</div>  
            <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.text }}>{item.title}</div>  
            <div style={{ fontSize: 13, color: COLORS.textDim, marginBottom: 6 }}>{item.co}</div>  
            <div style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.6 }}>{item.desc}</div>  
          </div>  
        ))}  
      </div>  
    </div>  
  </Section>  
  
  {/* Newsletter */}  
  <Section id="newsletter">  
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>  
      <div style={{  
        padding: "56px 48px", borderRadius: 16,  
        background: `linear-gradient(135deg, ${COLORS.bgCard}, rgba(59,130,246,0.06))`,  
        border: `1px solid ${COLORS.border}`, position: "relative", overflow: "hidden",  
      }}>  
        <div style={{  
          position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%",  
          background: `radial-gradient(circle, rgba(59,130,246,0.1), transparent)`,  
        }} />  
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: COLORS.amber, textTransform: "uppercase", marginBottom: 16 }}>Newsletter</p>  
        <h2 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 12px", fontFamily: "'DM Sans', sans-serif" }}>  
          The Finance × Tech Briefing  
        </h2>  
        <p style={{ fontSize: 16, color: COLORS.textMuted, maxWidth: 520, lineHeight: 1.7, marginBottom: 32 }}>  
          Weekly insights at the intersection of commercial real estate finance, AI automation, and operational technology. What's actually working, what's hype, and what you should be building.  
        </p>  
        <NewsletterForm />  
        <p style={{ fontSize: 12, color: COLORS.textDim, marginTop: 16 }}>No spam. Unsubscribe anytime. Written by a finance person, for finance people who want to build.</p>  
      </div>  
    </div>  
  </Section>  
  
  {/* Contact */}  
  <Section id="contact">  
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 120px" }}>  
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>  
        <div>  
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: COLORS.accent, textTransform: "uppercase", marginBottom: 16 }}>Contact</p>  
          <h2 style={{ fontSize: 36, fontWeight: 700, margin: "0 0 16px", fontFamily: "'DM Sans', sans-serif" }}>Let's talk.</h2>  
          <p style={{ fontSize: 16, color: COLORS.textMuted, lineHeight: 1.7, marginBottom: 32 }}>  
            I'm actively exploring Director and VP-level finance roles where I can combine operational accounting leadership with systems thinking and automation.  
            If your company needs both — let's connect.  
          </p>  
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>  
            {[  
              { icon: "✉️", label: "melanson633@gmail.com", href: "mailto:melanson633@gmail.com" },  
              { icon: "📞", label: "(781) 484-6804", href: "tel:7814846804" },  
              { icon: "📍", label: "Burlington / Boston Metro, MA", href: null },  
            ].map((c, i) => (  
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>  
                <span style={{ fontSize: 20 }}>{c.icon}</span>  
                {c.href ? (  
                  <a href={c.href} style={{ color: COLORS.text, textDecoration: "none", fontSize: 15, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 2 }}>{c.label}</a>  
                ) : (  
                  <span style={{ fontSize: 15, color: COLORS.textMuted }}>{c.label}</span>  
                )}  
              </div>  
            ))}  
          </div>  
        </div>  
        <div style={{  
          padding: "40px 32px", borderRadius: 12, border: `1px solid ${COLORS.border}`,  
          background: COLORS.bgCard,  
        }}>  
          <h3 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 20px" }}>What I'm looking for</h3>  
          {[  
            { check: true, text: "Director / VP Finance & Accounting roles" },  
            { check: true, text: "Companies scaling operations (startup → growth stage)" },  
            { check: true, text: "Capital-intensive or manufacturing environments" },  
            { check: true, text: "Organizations that value systems thinking" },  
            { check: true, text: "Burlington / Route 128 corridor preferred" },  
            { check: false, text: "Open to hybrid or on-site" },  
          ].map((item, i) => (  
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>  
              <span style={{  
                width: 20, height: 20, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",  
                background: item.check ? COLORS.accentGlow : "rgba(255,255,255,0.04)",  
                border: `1px solid ${item.check ? COLORS.accent : COLORS.border}`,  
                fontSize: 12, color: item.check ? COLORS.accent : COLORS.textDim,  
              }}>{item.check ? "✓" : "○"}</span>  
              <span style={{ fontSize: 14, color: COLORS.textMuted }}>{item.text}</span>  
            </div>  
          ))}  
        </div>  
      </div>  
    </div>  
  </Section>  
  
  {/* Footer */}  
  <footer style={{  
    borderTop: `1px solid ${COLORS.border}`, padding: "32px 24px",  
    maxWidth: 1100, margin: "0 auto",  
    display: "flex", justifyContent: "space-between", alignItems: "center",  
  }}>  
    <div style={{ fontSize: 13, color: COLORS.textDim }}>  
      © 2026 Mark Melanson. Built with code, caffeine, and Claude.  
    </div>  
    <div style={{ display: "flex", gap: 24 }}>  
      <a href="https://www.linkedin.com/in/markmelanson633/" target="_blank" rel="noopener" style={{ fontSize: 13, color: COLORS.textDim, textDecoration: "none" }}>LinkedIn</a>  
    </div>  
  </footer>  
</div>  
```  
  
);  
}  
