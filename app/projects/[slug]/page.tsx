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
  const connectedFields = project.categories.filter((category) => category !== project.category);
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
          </div>
          <div className="detail-hero-media">
            <Image src={project.image} alt={project.imageAlt ?? project.title} fill loading="eager" fetchPriority="high" sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 800px) 100vw, 46vw" />
          </div>
        </div>
      </section>
      <section className="article-section section-white">
        <div className="shell project-record">
          <p className="eyebrow">{project.recordLabels?.heading || "Project record"}</p>
          <dl className="project-record-grid">
            <div>
              <dt>{project.recordLabels?.primaryField || "Area of interest"}</dt>
              <dd>{project.category}</dd>
              {connectedFields.length > 0 && <>
                <dt className="project-record-related-label">{project.recordLabels?.connectedFields || "Connected fields"}</dt>
                <dd className="project-record-secondary">{connectedFields.join(" · ")}</dd>
              </>}
            </div>
            <div className="project-record-problem">
              <dt>{project.recordLabels?.problem || project.detailHeadings?.challenge || project.detailLabels?.challenge || "Problem intended to solve"}</dt>
              <dd>{project.challenge}</dd>
            </div>
            {project.stack.length > 0 && <div>
              <dt>{project.recordLabels?.technologies || "Technologies and methods"}</dt>
              <dd><ul className="project-record-tags">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul></dd>
            </div>}
            {!!project.stakeholders?.length && <div>
              <dt>{project.recordLabels?.stakeholders || "Stakeholders"}</dt>
              <dd>{project.stakeholders.join(" · ")}</dd>
            </div>}
            {project.relevance && <div>
              <dt>{project.recordLabels?.relevance || "Relevant setting"}</dt>
              <dd>{project.relevance}</dd>
            </div>}
            {project.status && <div><dt>{project.recordLabels?.status || "Status"}</dt><dd>{project.status}</dd></div>}
          </dl>
        </div>
        <div className="shell project-detail-body">
          <article className="article-body">
            <section><p className="eyebrow">{project.detailLabels?.context || "Context"}</p><h2>{project.detailHeadings?.context || "Why the work was needed"}</h2><p>{project.context}</p></section>
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
