import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Md Asif Mustafa",
    short_name: "Asif Mustafa",
    description: "Research, data science and industrial systems portfolio of Md Asif Mustafa.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#061A2E",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
