import Image from "next/image";
import Link from "next/link";
import type { InsightPreview } from "@/lib/content";

export function BlogArchive({ insights }: { insights: InsightPreview[] }) {
  return (
    <section className="section section-white composed-section">
      <div className="shell blog-archive-grid">
        {insights.map((insight, index) => (
          <article className="blog-card" key={insight.slug}>
            <Link href={`/blogs/${insight.slug}`} className="blog-card-link" prefetch={false}>
              <div className="blog-card-media"><Image src={insight.image} alt="" fill loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1000px) 46vw, 30vw" quality={75} /></div>
              <div className="blog-card-copy">
                <p className="eyebrow">{insight.category}</p>
                <h2>{insight.title}</h2>
                <p>{insight.excerpt}</p>
                <div className="blog-card-meta">
                  {insight.date && <time dateTime={insight.publishedAt}>{insight.date}</time>}
                  {insight.readingTime && <span>{insight.readingTime}</span>}
                </div>
                <span className="blog-card-action">Read more <span aria-hidden="true">→</span></span>
              </div>
            </Link>
          </article>
        ))}
        {!insights.length && <p>No articles have been published yet.</p>}
      </div>
    </section>
  );
}
