import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/StructuredData";
import { PortableArticle } from "@/components/PortableArticle";
import { getStories, getStory } from "@/lib/cms";
import { absoluteUrl, createPageMetadata, siteOrigin } from "@/lib/seo";
import { formatArticleDate } from "@/lib/article-date";

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
    publishedAt: story.publishedAt,
    updatedAt: story.updatedAt,
  });
}

export default async function StoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) notFound();
  const date = formatArticleDate(story.publishedAt, story.dateLabel);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(`/stories/${story.slug}`)}#article`,
    url: absoluteUrl(`/stories/${story.slug}`),
    headline: story.title,
    description: story.excerpt,
    image: absoluteUrl(story.image),
    author: { "@id": `${siteOrigin}/#person` },
    datePublished: story.publishedAt,
    dateModified: story.updatedAt,
    about: story.category,
    keywords: story.stack.join(", "),
  };

  return (
    <div className="story-detail">
      <header className="story-detail-header">
        <div className="shell story-detail-heading">
            <Link className="text-link" href="/stories" prefetch={false}>← My Stories</Link>
            <p className="eyebrow">{story.category}</p>
            <h1>{story.title}</h1>
            <p className="article-lead">{story.excerpt}</p>
            {(date || story.readingTime) && <div className="story-journal-meta">
              {date && <time dateTime={story.publishedAt}>{date}</time>}
              {story.readingTime && <span>{story.readingTime}</span>}
            </div>}
        </div>
        <div className="shell story-detail-cover"><Image src={story.image} alt={story.imageAlt ?? story.title} fill loading="eager" fetchPriority="high" sizes="(max-width: 800px) calc(100vw - 32px), 1220px" quality={75} /></div>
      </header>
      <section className="article-section section-white">
        <div className="shell story-detail-layout">
          {story.stack.length > 0 && <aside className="article-aside story-detail-sidebar">
            <p className="eyebrow">Methods & context</p>
            <ul className="article-stack">{story.stack.map((item) => <li key={item}>{item}</li>)}</ul>
          </aside>}
          <article className="article-body">
            {story.content?.length ? <PortableArticle value={story.content} /> : <>
            <p className="article-lead">{story.intro}</p>
            {story.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
            </>}
            <Link className="text-link" href="/stories" prefetch={false}>Browse My Stories <span aria-hidden="true">→</span></Link>
          </article>
        </div>
      </section>
      <StructuredData id="story-structured-data" data={structuredData} />
    </div>
  );
}
