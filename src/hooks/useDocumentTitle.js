import { useEffect } from "react";

export default function useDocumentTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | Mark Melanson` : "Mark Melanson | CRE Finance Tools, AI Workflows, and Research";
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", description);
    }
  }, [title, description]);
}
