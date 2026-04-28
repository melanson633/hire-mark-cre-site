import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TeaserPage from "./pages/TeaserPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import PromptsPage from "./pages/PromptsPage";
import AboutPage from "./pages/AboutPage";
import NewsletterPage from "./pages/NewsletterPage";
import ToolsPage from "./pages/ToolsPage";
import NotFoundPage from "./pages/NotFoundPage";

const devRoutes = [];

if (import.meta.env.DEV) {
  const TeaserTestPage = lazy(() => import("./pages/TeaserTestPage"));

  devRoutes.push({
    path: "/teaser-test",
    element: (
      <Suspense fallback={null}>
        <TeaserTestPage />
      </Suspense>
    ),
  });
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <TeaserPage /> },
      ...devRoutes,
      { path: "/home", element: <HomePage /> },
      { path: "/home-preview", element: <HomePage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/projects/:slug", element: <ProjectDetailPage /> },
      { path: "/prompts", element: <PromptsPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/newsletter", element: <NewsletterPage /> },
      { path: "/tools", element: <ToolsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
