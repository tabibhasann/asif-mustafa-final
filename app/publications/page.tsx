import type { Metadata } from "next";
import { PageHero } from "@/components/Primitives";
import { PublicationArchive } from "@/components/PublicationArchive";
import { getProfile, getPublications, getSiteSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Publications",
  description: "Research publications, conference papers and datasets by Md Asif Mustafa.",
  alternates: { canonical: "/publications" },
};

export const revalidate = 60;

export default async function PublicationsPage() {
  const [profile, publications, settings] = await Promise.all([getProfile(), getPublications(), getSiteSettings()]);
  const copy = settings.pages.publications;
  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
      >
        <a className="button button-gold" href={profile.scholar} target="_blank" rel="noreferrer">View Google Scholar ↗</a>
      </PageHero>
      <section className="section section-white composed-section">
        <div className="shell"><PublicationArchive publications={publications} /></div>
      </section>
    </>
  );
}
