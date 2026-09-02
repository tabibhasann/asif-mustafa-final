import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/cms";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getProjects()).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.title, description: project.summary, images: [project.image] },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  return (
    <>
      <section className="detail-hero">
        <div className="shell detail-hero-grid">
          <div className="detail-hero-copy">
            <Link className="text-link" href="/projects">← All projects</Link>
            <p className="eyebrow light">Selected project · {project.category}</p>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
            <ul className="tag-list dark-tags">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="detail-hero-media">
            <Image src={project.image} alt={project.imageAlt ?? project.title} fill priority sizes="(max-width: 800px) 100vw, 46vw" />
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
            <section><p className="eyebrow">Context</p><h2>Why the work was needed</h2><p>{project.context}</p></section>
            <section><p className="eyebrow">Challenge</p><h2>The question to resolve</h2><p>{project.challenge}</p></section>
            <section>
              <p className="eyebrow">Approach</p><h2>How the system was developed</h2>
              <ol>{project.approach.map((item) => <li key={item}>{item}</li>)}</ol>
            </section>
            <section><p className="eyebrow">Outcome</p><h2>What the work established</h2><p>{project.outcome}</p></section>
          </article>
        </div>
      </section>
    </>
  );
}
