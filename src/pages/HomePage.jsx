import {
  contactSection,
  hero,
  launchSection,
  launchStrip,
  positioningSection,
  stats,
  toolsSection,
} from "../content/home";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { siteMeta } from "../content/siteMeta";
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
  useDocumentTitle(null);
  return (
    <>
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
    </>
  );
}

export default HomePage;
