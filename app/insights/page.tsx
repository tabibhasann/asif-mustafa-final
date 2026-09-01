import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/Primitives";
import { Reveal } from "@/components/Reveal";
import { getInsights } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Insights",
  description: "Notes on applied research, data systems and responsible industrial decisions.",
  alternates: { canonical: "/insights" },
};

export const revalidate = 60;

export default async function InsightsPage() {
  const insights = await getInsights();
  const featured = insights.find((insight) => insight.featured) ?? insights[0];
  const remaining = insights.filter((insight) => insight.slug !== featured?.slug);
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Ideas, methods and field perspectives."
        intro="A publication-ready editorial space for concise thinking on evidence, intelligent systems, industrial practice and responsible improvement."
      />
      {featured && (
        <section className="section section-white">
          <div className="shell featured-insight">
            <div className="featured-insight-media">
              <Image src={featured.image} alt="" fill priority sizes="(max-width: 800px) 100vw, 54vw" />
            </div>
            <div className="featured-insight-copy">
              <p className="eyebrow">Featured insight · {featured.category}</p>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <span>{featured.date} · {featured.readingTime}</span>
              <Link className="button button-navy" href={`/insights/${featured.slug}`}>Read insight <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>
      )}
      <section className="section section-ash">
        <div className="shell insight-grid">
          {remaining.map((insight, index) => (
            <Reveal key={insight.slug} delay={index * 70}>
              <article className="insight-card">
                <Link className="insight-image" href={`/insights/${insight.slug}`}>
                  <Image src={insight.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
                </Link>
                <div>
                  <p className="card-kicker">{insight.category}</p>
                  <h2><Link href={`/insights/${insight.slug}`}>{insight.title}</Link></h2>
                  <p>{insight.excerpt}</p>
                  <span>{insight.date} · {insight.readingTime}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
