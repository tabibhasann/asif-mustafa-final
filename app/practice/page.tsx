import type { Metadata } from "next";
import { PageHero } from "@/components/Primitives";
import { Reveal } from "@/components/Reveal";
import { getPracticeAreas, getSiteSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Research & Professional Practice",
  description: "Five connected areas of research, analytics and technical advisory practice.",
  alternates: { canonical: "/practice" },
};

export const revalidate = 60;

export default async function PracticePage() {
  const [practiceAreas, settings] = await Promise.all([getPracticeAreas(), getSiteSettings()]);
  const copy = settings.pages.practice;

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
      />
      <section className="section section-white composed-section">
        <div className="shell practice-chapter-grid">
          {practiceAreas.map((area) => (
            <Reveal key={area.slug}>
              <article className="practice-chapter" id={area.slug}>
                <div className="practice-chapter-inner">
                  <span className="chapter-number">{area.number}</span>
                  <div>
                    <p className="eyebrow">Practice area</p>
                    <h2>{area.title}</h2>
                    <p>{area.summary}</p>
                  </div>
                  <ul className="capability-list">
                    {area.capabilities.map((capability) => (
                      <li key={capability}>{capability}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
