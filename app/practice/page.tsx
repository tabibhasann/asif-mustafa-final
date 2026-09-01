import type { Metadata } from "next";
import { PageHero } from "@/components/Primitives";
import { Reveal } from "@/components/Reveal";
import { getPracticeAreas } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Research & Professional Practice",
  description: "Five connected areas of research, analytics and technical advisory practice.",
  alternates: { canonical: "/practice" },
};

export const revalidate = 60;

export default async function PracticePage() {
  const practiceAreas = await getPracticeAreas();

  return (
    <>
      <PageHero
        eyebrow="Research & professional practice"
        title="Connected capabilities for complex industrial questions."
        intro="Five fields brought together through one evidence-led method—from framing the question and examining the system to building a response that can be reviewed and used."
      />
      <section className="section section-white">
        <div className="shell">
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
