import { Link, Outlet, useLocation } from "react-router-dom";
import { siteMeta } from "../content/siteMeta";
import ScrollToTop from "./ScrollToTop";

function NavLink({ item, isActive }) {
  const className = isActive ? "nav-active" : undefined;
  const isRoute = item.href.startsWith("/");
  if (isRoute) {
    return <Link to={item.href} className={className}>{item.label}</Link>;
  }
  return <a href={item.href} className={className}>{item.label}</a>;
}

function Layout() {
  const location = useLocation();
  const isContentHome =
    location.pathname === "/home" || location.pathname === "/home-preview";
  const isTeaserHome = location.pathname === "/";
  const isTeaserShell = isTeaserHome;

  return (
    <div className={isTeaserShell ? "page-shell teaser-layout" : "page-shell"}>
      <header className={isTeaserShell ? "site-header teaser-header" : "site-header"}>
        <Link className="wordmark" to="/">
          <span className="wordmark-main">{siteMeta.wordmark.main}</span>
          <span className="wordmark-accent">{siteMeta.wordmark.accent}</span>
        </Link>
        {isTeaserShell ? null : (
          <nav className="site-nav" aria-label="Primary">
            {siteMeta.navigation.map((item) => {
              const isHash = item.href.startsWith("#");
              if (isHash && !isContentHome) return null;
              const isActive = item.href.startsWith("/") && location.pathname.startsWith(item.href);
              return <NavLink key={item.href} item={item} isActive={isActive} />;
            })}
          </nav>
        )}
      </header>

      <ScrollToTop />
      <main id="top">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
