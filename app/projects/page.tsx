import { PageHero } from "@/components/Primitives";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { getProjects, getSiteSettings } from "@/lib/cms";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Projects",
  description: "Selected data, AI, analytics and industrial systems projects.",
  path: "/projects",
});

export const revalidate = 60;

export default async function ProjectsPage() {
  const [projects, settings] = await Promise.all([getProjects(), getSiteSettings()]);
  const copy = settings.pages.projects;
  const categoryCount = new Set(projects.flatMap((project) => project.categories)).size;
  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
        meta={`${projects.length} selected records · ${categoryCount} fields of work`}
      />
      <section className="section section-ash composed-section">
        <div className="shell"><ProjectExplorer projects={projects} /></div>
      </section>
    </>
  );
}
