"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EditorialCard } from "@/components/EditorialCard";
import type { InsightPreview, StoryPreview } from "@/lib/content";
import "@/app/collections.css";

type Collection = "Blogs" | "My Stories";

export function InsightsCollection({ insights, stories }: { insights: InsightPreview[]; stories: StoryPreview[] }) {
  const [collection, setCollection] = useState<Collection>("Blogs");

  useEffect(() => {
    const syncFromHash = () => setCollection(window.location.hash.toLowerCase() === "#stories" ? "My Stories" : "Blogs");
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  function selectCollection(name: Collection) {
    setCollection(name);
    window.location.hash = name === "Blogs" ? "blogs" : "stories";
  }

  const isBlogs = collection === "Blogs";
  const items = isBlogs ? insights : stories;
  const featured = items.find((item) => item.featured) ?? items[0];
  const remaining = items.filter((item) => item.slug !== featured?.slug);
  const href = featured ? `${isBlogs ? "/insights" : "/stories"}/${featured.slug}` : "";

  return (
    <section className="section section-white composed-section insights-collection" aria-label="Insights collections">
      <div className="shell">
        <div className="collection-switcher" role="group" aria-label="Choose a content collection">
          {(["Blogs", "My Stories"] as const).map((name) => (
            <button
              key={name}
              type="button"
              className={collection === name ? "is-active" : ""}
              aria-pressed={collection === name}
              aria-controls="collection-results"
              onClick={() => selectCollection(name)}
            >
              <span>{name}</span>
              <span className="collection-count">{name === "Blogs" ? insights.length : stories.length}</span>
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {collection}: {items.length} {items.length === 1 ? "piece" : "pieces"}
        </p>
        <div id="collection-results" className="collection-results">
          <div className="collection-heading">
            <div>
              <p className="eyebrow">{isBlogs ? "Editorial notes" : "Field perspectives"}</p>
              <h2>{collection}</h2>
            </div>
            <p>{items.length} {items.length === 1 ? "piece" : "pieces"}</p>
          </div>

          {featured ? (
            <>
              <article className="collection-featured">
                <Link href={href} className="collection-featured-link" prefetch={false}>
                  <div className="collection-featured-media">
                    <Image src={featured.image} alt="" fill sizes="(max-width: 800px) 100vw, 46vw" loading={isBlogs ? "eager" : "lazy"} fetchPriority={isBlogs ? "high" : undefined} quality={70} />
                  </div>
                  <div className="collection-featured-copy">
                    <p className="eyebrow light">Featured {isBlogs ? "blog" : "story"} · {featured.category}</p>
                    <h3>{featured.title}</h3>
                    <p>{featured.excerpt}</p>
                    {isBlogs && <span className="collection-featured-meta">{(featured as InsightPreview).date} · {(featured as InsightPreview).readingTime}</span>}
                    <span className="collection-featured-action">Read {isBlogs ? "blog" : "story"} <span aria-hidden="true">↗</span></span>
                  </div>
                </Link>
              </article>

              {remaining.length > 0 && (
                <div className="editorial-card-grid collection-card-grid">
                  {isBlogs
                    ? (remaining as InsightPreview[]).map((insight) => (
                        <EditorialCard
                          key={insight.slug}
                          href={`/insights/${insight.slug}`}
                          image={insight.image}
                          eyebrow={insight.category}
                          title={insight.title}
                          summary={insight.excerpt}
                          meta={`${insight.date} · ${insight.readingTime}`}
                          headingLevel={3}
                        />
                      ))
                    : (remaining as StoryPreview[]).map((story) => (
                        <EditorialCard
                          key={story.slug}
                          href={`/stories/${story.slug}`}
                          image={story.image}
                          eyebrow={story.category}
                          title={story.title}
                          summary={story.excerpt}
                          tags={story.stack}
                          headingLevel={3}
                        />
                      ))}
                </div>
              )}
            </>
          ) : (
            <p className="collection-empty">No {isBlogs ? "blogs" : "stories"} are available yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
