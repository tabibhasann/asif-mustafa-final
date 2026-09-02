import { PageHero } from "@/components/Primitives";
import { getExperiences, getSiteSettings } from "@/lib/cms";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Experience",
  description: "Selected research, advisory, engineering and operational experience.",
  path: "/experience",
});

export const revalidate = 60;

export default async function ExperiencePage() {
  const [experiences, settings] = await Promise.all([getExperiences(), getSiteSettings()]);
  const copy = settings.pages.experience;

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
      />
      <section className="section section-white composed-section">
        <div className="shell experience-list experience-system">
          {experiences.map((experience, index) => (
            <article className="experience-entry" key={experience.slug}>
              <div className="experience-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{experience.period}</strong>
                <small>{experience.engagement}</small>
                {experience.projectValue && <em>{experience.projectValue}</em>}
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
          ))}
        </div>
      </section>
    </>
  );
}
