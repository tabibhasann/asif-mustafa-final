import { PageHero } from "@/components/Primitives";
import { StoryJournal } from "@/components/StoryJournal";
import { getSiteSettings, getStories } from "@/lib/cms";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ title: "My Stories", description: "Personal reflections and research stories by Md Asif Mustafa.", path: "/stories" });
export const revalidate = 60;

export default async function StoriesPage() {
  const [stories, settings] = await Promise.all([getStories(), getSiteSettings()]);
  const copy = settings.pages.stories;
  return <div className="stories-page"><PageHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} /><StoryJournal stories={stories} /></div>;
}
