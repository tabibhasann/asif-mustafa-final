import type { Metadata } from "next";
import { PageHero } from "@/components/Primitives";
import { Reveal } from "@/components/Reveal";
import { getPracticeAreas } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Research & Professional Practice",
  description: "Five connected areas of research, analytics and technical advisory practice.",
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
          {practiceAreas.map((area, index) => (
            <Reveal key={area.slug}>
              <article className="practice-chapter" id={area.slug}>
                <span className="chapter-number">{area.number}</span>
                <div className="practice-chapter-inner">
                  <div>
                    <p className="eyebrow">Practice area</p>
                    <h2>{area.title}</h2>
                    <p>{area.summary}</p>
                  </div>
                  <ul className="capability-list">
                    {area.capabilities.map((capability) => (
                      <li key={capability}><span>{String(index + 1).padStart(2, "0")}</span>{capability}</li>
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
