import { siteMeta } from "../content/siteMeta";
import {
  contactSection,
  hero,
  launchSection,
  launchStrip,
  positioningSection,
  stats,
  toolsSection,
} from "../content/home";
import { newsletterContent } from "../content/newsletter";
import { workSection } from "../content/caseStudies";
import { researchSection } from "../content/research";
import ContactSection from "../sections/ContactSection";
import HeroSection from "../sections/HeroSection";
import LaunchSection from "../sections/LaunchSection";
import PositioningSection from "../sections/PositioningSection";
import ResearchSection from "../sections/ResearchSection";
import StatsSection from "../sections/StatsSection";
import ToolsSection from "../sections/ToolsSection";
import WorkSection from "../sections/WorkSection";

function HomePage() {
  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="wordmark" href="#top">
          <span className="wordmark-main">{siteMeta.wordmark.main}</span>
          <span className="wordmark-accent">{siteMeta.wordmark.accent}</span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          {siteMeta.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <HeroSection launchStrip={launchStrip} hero={hero} />
        <StatsSection stats={stats} />
        <LaunchSection content={launchSection} />
        <PositioningSection content={positioningSection} />
        <WorkSection content={workSection} />
        <ResearchSection
          content={researchSection}
          newsletterContent={newsletterContent}
        />
        <ToolsSection content={toolsSection} />
        <ContactSection content={contactSection} contact={siteMeta.contact} />
      </main>
    </div>
  );
}

export default HomePage;
