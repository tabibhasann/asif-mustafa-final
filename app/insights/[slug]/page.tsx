import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getInsight, getInsights } from "@/lib/cms";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getInsights()).map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) return { title: "Insight not found" };
  return { title: insight.title, description: insight.excerpt };
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) notFound();
  return (
    <>
      <section className="detail-hero">
        <div className="shell detail-hero-copy">
          <Link className="text-link" href="/insights">← All insights</Link>
          <p className="eyebrow light">{insight.category}</p>
          <h1>{insight.title}</h1>
          <p>{insight.excerpt}</p>
          <span>{insight.date} · {insight.readingTime}</span>
        </div>
        <div className="detail-hero-media">
          <Image src={insight.image} alt="" fill priority sizes="100vw" />
        </div>
      </section>
      <section className="section section-white">
        <div className="shell article-layout">
          <aside className="article-aside">
            <p className="eyebrow">Editorial note</p>
            <p>Published through the Insights archive. Content, date and imagery are editable in Sanity.</p>
          </aside>
          <article className="article-body">
            {insight.body.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
