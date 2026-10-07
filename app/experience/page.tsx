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
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <strong>{experience.period}</strong>
                <small>{experience.engagement}</small>
                {experience.projectValue && <em>{experience.projectValue}</em>}
              </div>
              <div className="experience-copy">
                <h2 className="experience-role">{experience.role}</h2>
                <p className="experience-organization">{experience.organization}</p>
                <p className="experience-description">{experience.description}</p>
                {(experience.contribution || experience.impacts.length > 0) && <div className="experience-contributions" role="group" aria-label="Selected contributions">
                  {experience.contribution && <p className="experience-contribution-lead">{experience.contribution}</p>}
                  {experience.impacts.map((impact) => (
                    <p key={impact}>{impact}</p>
                  ))}
                </div>}
                {experience.result && <dl className="experience-result"><dt>Impact and results</dt><dd>{experience.result}</dd></dl>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
