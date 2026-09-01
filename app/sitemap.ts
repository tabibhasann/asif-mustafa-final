import type { MetadataRoute } from "next";
import { insights, projects, stories } from "@/lib/content";

const baseUrl = "https://asif-mustafa-final.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/practice", "/experience", "/projects", "/publications", "/stories", "/insights", "/credentials"];
  return [
    ...routes.map((route) => ({ url: `${baseUrl}${route}`, changeFrequency: "monthly" as const, priority: route === "" ? 1 : 0.8 })),
    ...projects.map((item) => ({ url: `${baseUrl}/projects/${item.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...stories.map((item) => ({ url: `${baseUrl}/stories/${item.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...insights.map((item) => ({ url: `${baseUrl}/insights/${item.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
