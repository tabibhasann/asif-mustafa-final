import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/StructuredData";
import { getStories, getStory } from "@/lib/cms";
import { absoluteUrl, createPageMetadata, siteOrigin } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getStories()).map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) return { title: "Story not found" };
  return createPageMetadata({
    title: story.title,
    description: story.excerpt,
    path: `/stories/${story.slug}`,
    image: story.image,
    imageAlt: story.imageAlt || story.title,
    type: "article",
    updatedAt: story.updatedAt,
  });
}

export default async function StoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) notFound();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(`/stories/${story.slug}`)}#article`,
    url: absoluteUrl(`/stories/${story.slug}`),
    headline: story.title,
    description: story.excerpt,
    image: absoluteUrl(story.image),
    author: { "@id": `${siteOrigin}/#person` },
    dateModified: story.updatedAt,
    about: story.category,
    keywords: story.stack.join(", "),
  };

  return (
    <>
      <section className="detail-hero">
        <div className="shell detail-hero-grid">
          <div className="detail-hero-copy">
            <Link className="text-link" href="/stories" prefetch={false}>← All stories</Link>
            <p className="eyebrow light">Field story · {story.category}</p>
            <h1>{story.title}</h1>
            <p>{story.excerpt}</p>
          </div>
          <div className="detail-hero-media">
            <Image src={story.image} alt={story.imageAlt ?? story.title} fill loading="eager" fetchPriority="high" sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 800px) 100vw, 46vw" />
          </div>
        </div>
      </section>
      <section className="article-section section-white">
        <div className="shell article-layout">
          <aside className="article-aside">
            <p className="eyebrow">Methods & context</p>
            <ul className="article-stack">{story.stack.map((item) => <li key={item}>{item}</li>)}</ul>
          </aside>
          <article className="article-body">
            <p className="article-lead">{story.intro}</p>
            {story.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </article>
        </div>
      </section>
      <StructuredData id="story-structured-data" data={structuredData} />
    </>
  );
}
