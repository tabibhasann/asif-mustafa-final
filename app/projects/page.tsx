import type { Metadata } from "next";
import { PageHero } from "@/components/Primitives";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { getProjects } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected data, AI, analytics and industrial systems projects.",
  alternates: { canonical: "/projects" },
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();
  const categoryCount = new Set(projects.flatMap((project) => project.categories)).size;
  const projectPreviews = projects.map(({ slug, title, category, categories, summary, image, stack }) => ({
    slug,
    title,
    category,
    categories,
    summary,
    image,
    stack,
  }));
  return (
    <>
      <PageHero
        eyebrow="Selected projects"
        title="Technical systems explained through context, approach and outcome."
        intro="A filterable record of applied work across data engineering, machine learning, semantic search, supply chains and business intelligence."
        meta={`${projects.length} selected records · ${categoryCount} fields of work`}
      />
      <section className="section section-ash">
        <div className="shell"><ProjectExplorer projects={projectPreviews} /></div>
      </section>
    </>
  );
}
