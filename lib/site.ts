export function normalizeNavigationPathname(pathname: string): string {
  // Vercel can prerender the homepage under /index while serving it at /.
  return pathname === "/index" ? "/" : pathname;
}

export const headerLinks = [
  { href: "/about", label: "About" },
  { href: "/practice", label: "Practice" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/publications", label: "Publications" },
  { href: "/insights", label: "Insights" },
];

export const knowledgeLinks = [
  { href: "/blogs", label: "Blogs" },
  { href: "/stories", label: "My Stories" },
  { href: "/credentials", label: "Credentials" },
];

export const projectFilterCategories = [
  "All",
  "Data Systems",
  "NLP & Search",
  "Machine Learning",
  "Streaming Analytics",
  "Supply Chain",
  "Business Intelligence",
  "Cloud Data",
];
