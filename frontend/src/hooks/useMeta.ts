import { useEffect } from "react";

interface MetaProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
}

export function useMeta({ title, description, canonicalUrl }: MetaProps) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", description);
    }

    if (canonicalUrl) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement("link");
        linkCanonical.setAttribute("rel", "canonical");
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute("href", canonicalUrl);
    }
  }, [title, description, canonicalUrl]);
}
export default useMeta;
