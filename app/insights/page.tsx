import Image from "next/image";
import Link from "next/link";
import { EditorialCard } from "@/components/EditorialCard";
import { PageHero } from "@/components/Primitives";
import { getInsights, getSiteSettings } from "@/lib/cms";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Insights",
  description: "Notes on applied research, data systems and responsible industrial decisions.",
  path: "/insights",
});

export const revalidate = 60;

export default async function InsightsPage() {
  const [insights, settings] = await Promise.all([getInsights(), getSiteSettings()]);
  const copy = settings.pages.insights;
  const featured = insights.find((insight) => insight.featured) ?? insights[0];
  const remaining = insights.filter((insight) => insight.slug !== featured?.slug);
  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
      />
      {featured && (
        <section className="section section-white composed-section insight-lead-section">
          <div className="shell featured-insight">
            <div className="featured-insight-media">
              <Image src={featured.image} alt={featured.imageAlt ?? featured.title} fill loading="eager" fetchPriority="high" quality={70} sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 800px) 100vw, 45vw" />
            </div>
            <div className="featured-insight-copy">
              <p className="eyebrow">Featured insight · {featured.category}</p>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <span>{featured.date} · {featured.readingTime}</span>
              <Link className="button button-navy" href={`/insights/${featured.slug}`} prefetch={false}>Read insight <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>
      )}
      <section className="section section-ash composed-section">
        <div className="shell editorial-card-grid insight-archive-grid">
          {remaining.map((insight) => (
            <EditorialCard
              key={insight.slug}
              href={`/insights/${insight.slug}`}
              image={insight.image}
              eyebrow={insight.category}
              title={insight.title}
              summary={insight.excerpt}
              meta={`${insight.date} · ${insight.readingTime}`}
              headingLevel={2}
            />
          ))}
        </div>
      </section>
    </>
  );
}
