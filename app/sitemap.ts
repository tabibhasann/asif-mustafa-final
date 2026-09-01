import type { MetadataRoute } from "next";
import { getInsights, getProjects, getStories } from "@/lib/cms";

const baseUrl = "https://asif-mustafa-final.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/about", "/practice", "/experience", "/projects", "/publications", "/stories", "/insights", "/credentials"];
  const [projects, stories, insights] = await Promise.all([getProjects(), getStories(), getInsights()]);
  return [
    ...routes.map((route) => ({ url: `${baseUrl}${route}`, changeFrequency: "monthly" as const, priority: route === "" ? 1 : 0.8 })),
    ...projects.map((item) => ({ url: `${baseUrl}/projects/${item.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...stories.map((item) => ({ url: `${baseUrl}/stories/${item.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...insights.map((item) => ({ url: `${baseUrl}/insights/${item.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
