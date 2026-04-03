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
  const isHome = location.pathname === "/";

  return (
    <div className="page-shell">
      <header className="site-header">
        <Link className="wordmark" to="/">
          <span className="wordmark-main">{siteMeta.wordmark.main}</span>
          <span className="wordmark-accent">{siteMeta.wordmark.accent}</span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {siteMeta.navigation.map((item) => {
            const isHash = item.href.startsWith("#");
            if (isHash && !isHome) return null;
            const isActive = item.href.startsWith("/") && location.pathname.startsWith(item.href);
            return <NavLink key={item.href} item={item} isActive={isActive} />;
          })}
        </nav>
      </header>

      <ScrollToTop />
      <main id="top">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
