import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableArticle } from "@/components/PortableArticle";
import { StructuredData } from "@/components/StructuredData";
import { getInsight, getInsights, getProfile } from "@/lib/cms";
import { absoluteUrl, createPageMetadata, siteOrigin } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export const revalidate = 60;

export async function generateStaticParams() {
  return (await getInsights()).map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) return { title: "Article not found" };
  return createPageMetadata({ title: insight.title, description: insight.excerpt, path: `/blogs/${insight.slug}`, image: insight.image, imageAlt: insight.imageAlt || insight.title, type: "article", publishedAt: insight.publishedAt, updatedAt: insight.updatedAt });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const [insight, profile] = await Promise.all([getInsight(slug), getProfile()]);
  if (!insight) notFound();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(`/blogs/${insight.slug}`)}#article`,
    url: absoluteUrl(`/blogs/${insight.slug}`),
    headline: insight.title,
    description: insight.excerpt,
    image: absoluteUrl(insight.image),
    author: { "@id": `${siteOrigin}/#person` },
    datePublished: insight.publishedAt,
    dateModified: insight.updatedAt || insight.publishedAt,
    articleSection: insight.category,
  };
  return (
    <div className="blog-detail">
      <header className="blog-article-header">
        <div className="shell blog-article-heading">
          <Link className="text-link" href="/blogs" prefetch={false}>← All blogs</Link>
          <p className="eyebrow">{insight.category}</p>
          <h1>{insight.title}</h1>
          <p className="article-lead">{insight.excerpt}</p>
          <div className="blog-card-meta">
            <span>{profile.name}</span>
            {insight.date && <time dateTime={insight.publishedAt}>{insight.date}</time>}
            {insight.readingTime && <span>{insight.readingTime}</span>}
          </div>
        </div>
        <div className="shell blog-article-cover"><Image src={insight.image} alt={insight.imageAlt ?? insight.title} fill loading="eager" fetchPriority="high" sizes="(max-width: 800px) calc(100vw - 32px), 1000px" quality={75} /></div>
      </header>
      <section className="article-section section-white">
        <article className="shell article-body blog-article-body">
          {insight.content?.length
            ? <PortableArticle value={insight.content} />
            : insight.body.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
          <Link className="text-link" href="/blogs" prefetch={false}>Browse all blogs <span aria-hidden="true">→</span></Link>
        </article>
      </section>
      <StructuredData id="blog-structured-data" data={structuredData} />
    </div>
  );
}
