import type { Metadata } from "next";
import { PageHero } from "@/components/Primitives";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { getProjects } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected data, AI, analytics and industrial systems projects.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <>
      <PageHero
        eyebrow="Selected projects"
        title="Technical systems explained through context, approach and outcome."
        intro="A filterable record of applied work across data engineering, machine learning, semantic search, supply chains and business intelligence."
        meta={`${projects.length} selected records · Expandable through Sanity`}
      />
      <section className="section section-ash">
        <div className="shell"><ProjectExplorer projects={projects} /></div>
      </section>
    </>
  );
}
