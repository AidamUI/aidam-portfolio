import type { MetadataRoute } from "next";
import { ALBUMS } from "@/content/gallery";
import { PROJECTS } from "@/content/projects";
import { SITE } from "@/content/site";
import { STATIONS } from "@/content/stations";

/**
 * Generated from the content modules, per tech-plan.md §5, so adding a project
 * or an album puts it in the sitemap with no second edit. A hand-maintained
 * list would drift the first time something shipped in a hurry.
 *
 * Every public route is listed, the guestbook included — it is a real page and
 * its contents are approved by hand before they appear. Only `/guestbook/admin`
 * and `/api` are held back, and those are excluded in robots.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (path: string) => `${SITE.url}${path}`;

  return [
    {
      url: url("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...STATIONS.map((station) => ({
      url: url(station.href),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: station.href === "/guestbook" ? 0.3 : 0.8,
    })),
    ...PROJECTS.map((project) => ({
      url: url(`/projects/${project.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.7 : 0.5,
    })),
    ...ALBUMS.map((album) => ({
      url: url(`/documentation/${album.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
  ];
}
