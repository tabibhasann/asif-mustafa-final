import Image from "next/image";
import Link from "next/link";
import type { InsightPreview, SiteSettings, StoryPreview } from "@/lib/content";

export function InsightsCollection({ insights, stories, pages }: { insights: InsightPreview[]; stories: StoryPreview[]; pages: SiteSettings["pages"] }) {
  const destinations = [
    { id: "blogs", href: "/blogs", title: "Blogs", description: pages.blogs.intro, items: insights },
    { id: "stories", href: "/stories", title: "My Stories", description: pages.stories.intro, items: stories },
  ];
  return (
    <section className="section section-white composed-section">
      <div className="shell insights-destinations">
        {destinations.map((destination, index) => {
          const featured = destination.items.find((item) => item.featured) ?? destination.items[0];
          return (
            <article key={destination.id} id={destination.id} className="insights-destination">
              <Link href={destination.href} prefetch={false}>
                {featured && <div className="insights-destination-media"><Image src={featured.image} alt="" fill loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} sizes="(max-width: 700px) calc(100vw - 32px), 46vw" quality={75} /></div>}
                <div className="insights-destination-copy">
                  <h2>{destination.title}</h2>
                  <p>{destination.description}</p>
                  <span className="text-link">Explore {destination.title} <span aria-hidden="true">→</span></span>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
