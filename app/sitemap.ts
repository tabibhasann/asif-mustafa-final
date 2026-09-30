import type { MetadataRoute } from "next";
import { getInsights, getProjects, getStories } from "@/lib/cms";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/about", "/practice", "/experience", "/projects", "/publications", "/stories", "/blogs", "/insights", "/credentials"];
  const [projects, stories, insights] = await Promise.all([getProjects(), getStories(), getInsights()]);
  return [
    ...routes.map((route) => ({ url: absoluteUrl(route || "/"), changeFrequency: "monthly" as const, priority: route === "" ? 1 : 0.8 })),
    ...projects.map((item) => ({ url: absoluteUrl(`/projects/${item.slug}`), lastModified: item.updatedAt, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...stories.map((item) => ({ url: absoluteUrl(`/stories/${item.slug}`), lastModified: item.updatedAt, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...insights.map((item) => ({ url: absoluteUrl(`/blogs/${item.slug}`), lastModified: item.updatedAt || item.publishedAt, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
