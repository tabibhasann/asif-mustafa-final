import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(process.env.DESIGN_VARIANT !== "alternative" && { sitemap: absoluteUrl("/sitemap.xml") }),
  };
}
