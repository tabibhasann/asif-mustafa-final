import type { Metadata } from "next";
import { PageHero } from "@/components/Primitives";
import { Reveal } from "@/components/Reveal";
import { getExperiences } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Experience",
  description: "Selected research, advisory, engineering and operational experience.",
};

export const revalidate = 60;

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <>
      <PageHero
        eyebrow="Experience"
        title="Research, advisory and operations across connected sectors."
        intro="A concise record of roles, responsibilities and selected contributions—from international research collaboration to national digital operations and manufacturing."
      />
      <section className="section section-white">
        <div className="shell experience-list">
          {experiences.map((experience, index) => (
            <Reveal key={experience.slug}>
              <article className="experience-entry">
                <div className="experience-meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{experience.period}</strong>
                  <small>{experience.engagement}</small>
                </div>
                <div className="experience-copy">
                  <p className="experience-role">{experience.role}</p>
                  <h2>{experience.organization}</h2>
                  <p className="experience-description">{experience.description}</p>
                  <ul className="impact-list">
                    {experience.impacts.map((impact) => <li key={impact}>{impact}</li>)}
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
