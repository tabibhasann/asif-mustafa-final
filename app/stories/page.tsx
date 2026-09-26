import { EditorialCard } from "@/components/EditorialCard";
import { PageHero } from "@/components/Primitives";
import { getSiteSettings, getStories } from "@/lib/cms";
import { createPageMetadata } from "@/lib/seo";
import "../collections.css";

export const metadata = createPageMetadata({
  title: "My Stories",
  description: "Field stories connecting research, technical systems and industrial practice.",
  path: "/stories",
});

export const revalidate = 60;

export default async function StoriesPage() {
  const [stories, settings] = await Promise.all([getStories(), getSiteSettings()]);
  const copy = settings.pages.stories;
  return (
    <>
      <PageHero
        eyebrow="My Stories"
        title="My Stories"
        intro={copy.intro}
      />
      <section className="section section-white composed-section">
        <div className="shell editorial-card-grid collection-card-grid">
          {stories.map((story, index) => (
            <EditorialCard
              key={story.slug}
              href={`/stories/${story.slug}`}
              image={story.image}
              eyebrow={story.category}
              title={story.title}
              summary={story.excerpt}
              tags={story.stack}
              priority={index === 0}
              headingLevel={2}
            />
          ))}
          {!stories.length && <p className="collection-empty">No stories are available yet.</p>}
        </div>
      </section>
    </>
  );
}
