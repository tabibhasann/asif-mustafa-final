import { InsightsCollection } from "@/components/InsightsCollection";
import { PageHero } from "@/components/Primitives";
import { getInsights, getSiteSettings, getStories } from "@/lib/cms";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Insights",
  description: "Blogs and stories on applied research, data systems and responsible industrial decisions.",
  path: "/insights",
});

export const revalidate = 60;

export default async function InsightsPage() {
  const [insights, stories, settings] = await Promise.all([getInsights(), getStories(), getSiteSettings()]);
  const copy = settings.pages.insights;
  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />
      <InsightsCollection insights={insights} stories={stories} pages={settings.pages} />
    </>
  );
}
