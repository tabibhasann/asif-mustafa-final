import type { Metadata } from "next";
import { PageHero } from "@/components/Primitives";
import { PublicationArchive } from "@/components/PublicationArchive";
import { getProfile, getPublications } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Publications",
  description: "Research publications, conference papers and datasets by Md Asif Mustafa.",
};

export const revalidate = 60;

export default async function PublicationsPage() {
  const [profile, publications] = await Promise.all([getProfile(), getPublications()]);
  return (
    <>
      <PageHero
        eyebrow="Publications"
        title="A growing archive of research and scholarly work."
        intro="Journal articles, conference papers and datasets across industrial safety, sustainable manufacturing, machine learning, energy systems and decision analysis."
      >
        <a className="button button-gold" href={profile.scholar} target="_blank" rel="noreferrer">View Google Scholar ↗</a>
      </PageHero>
      <section className="section section-white">
        <div className="shell"><PublicationArchive publications={publications} /></div>
      </section>
    </>
  );
}
