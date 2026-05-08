import { useEffect } from "react";
import { siteMeta } from "../content/siteMeta";

export default function useDocumentTitle(title, description) {
  useEffect(() => {
    document.title = title === "markbuilds.ai"
      ? "markbuilds.ai"
      : title
        ? `${title} | Mark Melanson`
        : siteMeta.title;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", description);
    }
  }, [title, description]);
}
