import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableArticle } from "@/components/PortableArticle";
import { StructuredData } from "@/components/StructuredData";
import { getInsight, getInsights } from "@/lib/cms";
import { absoluteUrl, createPageMetadata, siteOrigin } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getInsights()).map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) return { title: "Insight not found" };
  return createPageMetadata({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${insight.slug}`,
    image: insight.image,
    imageAlt: insight.imageAlt || insight.title,
    type: "article",
    publishedAt: insight.publishedAt,
    updatedAt: insight.updatedAt,
  });
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) notFound();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(`/insights/${insight.slug}`)}#article`,
    url: absoluteUrl(`/insights/${insight.slug}`),
    headline: insight.title,
    description: insight.excerpt,
    image: absoluteUrl(insight.image),
    author: { "@id": `${siteOrigin}/#person` },
    datePublished: insight.publishedAt,
    dateModified: insight.updatedAt || insight.publishedAt,
    articleSection: insight.category,
  };
  return (
    <>
      <section className="detail-hero">
        <div className="shell detail-hero-grid">
          <div className="detail-hero-copy">
            <Link className="text-link" href="/insights" prefetch={false}>← All insights</Link>
            <p className="eyebrow light">{insight.category}</p>
            <h1>{insight.title}</h1>
            <p>{insight.excerpt}</p>
            <span>{insight.date} · {insight.readingTime}</span>
          </div>
          <div className="detail-hero-media">
            <Image src={insight.image} alt={insight.imageAlt ?? insight.title} fill loading="eager" fetchPriority="high" sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 800px) 100vw, 46vw" />
          </div>
        </div>
      </section>
      <section className="article-section section-white">
        <div className="shell article-layout">
          <aside className="article-aside">
            <p className="eyebrow">Editorial note</p>
            <p>A concise perspective from applied research and professional practice.</p>
          </aside>
          <article className="article-body">
            {insight.content?.length
              ? <PortableArticle value={insight.content} />
              : insight.body.map((section) => (
                  <section key={section.title}>
                    <h2>{section.title}</h2>
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </section>
                ))}
          </article>
        </div>
      </section>
      <StructuredData id="insight-structured-data" data={structuredData} />
    </>
  );
}
