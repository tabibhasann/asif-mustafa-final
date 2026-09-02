import type { Metadata } from "next";
import { EditorialCard } from "@/components/EditorialCard";
import { PageHero } from "@/components/Primitives";
import { getSiteSettings, getStories } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Stories",
  description: "Field stories connecting research, technical systems and industrial practice.",
  alternates: { canonical: "/stories" },
};

export const revalidate = 60;

export default async function StoriesPage() {
  const [stories, settings] = await Promise.all([getStories(), getSiteSettings()]);
  const copy = settings.pages.stories;
  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
      />
      <section className="section section-white composed-section">
        <div className="shell editorial-card-grid story-archive-grid">
          {stories.map((story, index) => (
            <EditorialCard
              key={story.slug}
              href={`/stories/${story.slug}`}
              image={story.image}
              imageAlt={story.imageAlt ?? story.title}
              eyebrow={story.category}
              title={story.title}
              summary={story.excerpt}
              tags={story.stack}
              headingLevel={2}
              priority={index === 0}
            />
          ))}
        </div>
      </section>
    </>
  );
}
