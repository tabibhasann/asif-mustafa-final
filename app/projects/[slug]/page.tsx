import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/StructuredData";
import { getProject, getProjects } from "@/lib/cms";
import { absoluteUrl, createPageMetadata, siteOrigin } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getProjects()).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };
  return createPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.image,
    imageAlt: project.imageAlt || project.title,
    updatedAt: project.updatedAt,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${absoluteUrl(`/projects/${project.slug}`)}#project`,
    url: absoluteUrl(`/projects/${project.slug}`),
    name: project.title,
    description: project.summary,
    image: absoluteUrl(project.image),
    creator: { "@id": `${siteOrigin}/#person` },
    about: project.categories,
    keywords: project.stack.join(", "),
    dateModified: project.updatedAt,
  };
  return (
    <>
      <section className="detail-hero">
        <div className="shell detail-hero-grid">
          <div className="detail-hero-copy">
            <Link className="text-link" href="/projects" prefetch={false}>← All projects</Link>
            <p className="eyebrow light">Selected project · {project.category}</p>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
            <ul className="tag-list dark-tags">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="detail-hero-media">
            <Image src={project.image} alt={project.imageAlt ?? project.title} fill loading="eager" fetchPriority="high" sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 800px) 100vw, 46vw" />
          </div>
        </div>
      </section>
      <section className="article-section section-white">
        <div className="shell article-layout">
          <aside className="article-aside">
            <p className="eyebrow">Project record</p>
            <div className="fact-list">
              <div className="fact-row"><span>Primary field</span><strong>{project.category}</strong></div>
              <div className="fact-row"><span>Connected fields</span><strong>{project.categories.join(" · ")}</strong></div>
              <div className="fact-row"><span>Status</span><strong>Selected portfolio work</strong></div>
            </div>
          </aside>
          <article className="article-body">
            <section><p className="eyebrow">{project.detailLabels?.context || "Context"}</p><h2>{project.detailHeadings?.context || "Why the work was needed"}</h2><p>{project.context}</p></section>
            <section><p className="eyebrow">{project.detailLabels?.challenge || "Challenge"}</p><h2>{project.detailHeadings?.challenge || "The question to resolve"}</h2><p>{project.challenge}</p></section>
            <section>
              <p className="eyebrow">{project.detailLabels?.approach || "Approach"}</p><h2>{project.detailHeadings?.approach || "How the system was developed"}</h2>
              <ol>{project.approach.map((item) => <li key={item}>{item}</li>)}</ol>
            </section>
            <section><p className="eyebrow">{project.detailLabels?.outcome || "Outcome"}</p><h2>{project.detailHeadings?.outcome || "What the work established"}</h2><p>{project.outcome}</p></section>
          </article>
        </div>
      </section>
      <StructuredData id="project-structured-data" data={structuredData} />
    </>
  );
}
