import { BlogArchive } from "@/components/BlogArchive";
import { PageHero } from "@/components/Primitives";
import { getInsights, getSiteSettings } from "@/lib/cms";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ title: "Blogs", description: "Articles by Md Asif Mustafa on research, data systems and professional practice.", path: "/blogs" });
export const revalidate = 60;

export default async function BlogsPage() {
  const [insights, settings] = await Promise.all([getInsights(), getSiteSettings()]);
  const copy = settings.pages.blogs;
  return <><PageHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} /><BlogArchive insights={insights} /></>;
}
