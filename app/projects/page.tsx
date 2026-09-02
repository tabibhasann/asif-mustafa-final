import type { Metadata } from "next";
import { PageHero } from "@/components/Primitives";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { getProjects, getSiteSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected data, AI, analytics and industrial systems projects.",
  alternates: { canonical: "/projects" },
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const [projects, settings] = await Promise.all([getProjects(), getSiteSettings()]);
  const copy = settings.pages.projects;
  const categoryCount = new Set(projects.flatMap((project) => project.categories)).size;
  const projectPreviews = projects.map(({ slug, title, category, categories, summary, image, imageAlt, stack }) => ({
    slug,
    title,
    category,
    categories,
    summary,
    image,
    imageAlt,
    stack,
  }));
  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
        meta={`${projects.length} selected records · ${categoryCount} fields of work`}
      />
      <section className="section section-ash composed-section">
        <div className="shell"><ProjectExplorer projects={projectPreviews} /></div>
      </section>
    </>
  );
}
