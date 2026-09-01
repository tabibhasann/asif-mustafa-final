import type { Metadata } from "next";
import Link from "next/link";
import { MonogramPortrait, PageHero, SectionHeading } from "@/components/Primitives";
import { Reveal } from "@/components/Reveal";
import { getProfile } from "@/lib/cms";

export const metadata: Metadata = {
  title: "About",
  description: "Professional profile, education and working principles of Md Asif Mustafa.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const profile = await getProfile();

  return (
    <>
      <PageHero
        eyebrow="About"
        title="A multidisciplinary practice grounded in engineering and evidence."
        intro="Researcher, data scientist and technical advisor working where industrial questions meet statistical discipline, digital systems and responsible improvement."
        meta={profile.location}
      />

      <section className="section section-white">
        <div className="shell editorial-grid">
          <Reveal className="editorial-image">
            <MonogramPortrait />
          </Reveal>
          <Reveal className="editorial-copy" delay={80}>
            <p className="eyebrow">Professional profile</p>
            <h2>Engineering context. Statistical discipline. Applied intelligence.</h2>
            {profile.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="button-row">
              <Link className="button button-navy" href="/experience">Review experience</Link>
              <a className="button button-ghost" href={`mailto:${profile.email}?subject=Professional enquiry`}>Contact Asif</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-ash">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Education"
              title="A foundation built across engineering and data science."
              text="Formal study provides the technical grounding; applied work connects it to organisations, people and operating systems."
            />
          </Reveal>
          <div className="education-grid">
            {profile.education.map((item, index) => (
              <Reveal key={item.degree} delay={index * 80}>
                <article className="education-card">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h2>{item.degree}</h2>
                  <strong>{item.institution}</strong>
                  <p>{item.note}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-navy">
        <div className="shell">
          <SectionHeading
            eyebrow="Working principles"
            title="Useful work balances possibility, need and responsibility."
            text="The aim is not complexity for its own sake. It is a clear, traceable response to the conditions around a real decision."
            light
          />
          <div className="process-grid">
            {[
              ["01", "Context before method", "Understand the organisation, people and constraints before choosing the technical response."],
              ["02", "Evidence with traceability", "Keep recommendations connected to source records, assumptions and analytical choices."],
              ["03", "Systems people can use", "Design workflows around actual responsibilities rather than idealised diagrams."],
              ["04", "Progress with responsibility", "Consider productivity, safety and environmental impact as connected priorities."],
            ].map(([number, title, text]) => (
              <article className="process-step" key={number}>
                <span>{number}</span><h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
