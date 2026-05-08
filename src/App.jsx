import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TeaserPage from "./pages/TeaserPage";
import ProofPage from "./pages/ProofPage";
import AboutPage from "./pages/AboutPage";
import LibraryPage from "./pages/LibraryPage";
import ToolsPage from "./pages/ToolsPage";
import NotFoundPage from "./pages/NotFoundPage";
import RedirectTo from "./components/RedirectTo";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <TeaserPage /> },
      { path: "/home", element: <HomePage /> },
      { path: "/home-preview", element: <HomePage /> },
      { path: "/proof", element: <ProofPage /> },
      { path: "/projects", element: <RedirectTo to="/proof" /> },
      { path: "/projects/:slug", element: <RedirectTo to="/proof" /> },
      { path: "/prompts", element: <RedirectTo to="/library" /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/newsletter", element: <RedirectTo to="/library" /> },
      { path: "/library", element: <LibraryPage /> },
      { path: "/tools", element: <ToolsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
