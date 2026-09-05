import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

/**
 * Crawl everything that is a page about Aidam; keep crawlers out of the two
 * things that are neither.
 *
 * `/guestbook/admin` is behind Basic Auth anyway, so this is belt-and-braces
 * rather than the control. `/api` is excluded because an indexed JSON endpoint
 * competes with the page that renders the same content.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/guestbook/admin"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
