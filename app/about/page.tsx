import type { Metadata } from "next";
import Link from "next/link";
import { MonogramPortrait, PageHero, SectionHeading } from "@/components/Primitives";
import { Reveal } from "@/components/Reveal";
import { getProfile, getSiteSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "About",
  description: "Professional profile, education and working principles of Md Asif Mustafa.",
  alternates: { canonical: "/about" },
};

export const revalidate = 60;

export default async function AboutPage() {
  const [profile, settings] = await Promise.all([getProfile(), getSiteSettings()]);
  const copy = settings.pages.about;

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
        meta={profile.location}
      />

      <section className="section section-white composed-section">
        <div className="shell editorial-grid about-profile-grid">
          <Reveal className="editorial-image">
            <MonogramPortrait src={profile.portrait} name={profile.name} priority />
          </Reveal>
          <Reveal className="editorial-copy" delay={80}>
            <p className="eyebrow">{settings.about.profileEyebrow}</p>
            <h2>{settings.about.profileTitle}</h2>
            {profile.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="profile-contact-grid" role="list" aria-label="Professional contact and profile links">
              <div role="listitem"><span>Email</span><a href={`mailto:${profile.email}`}>{profile.email}</a></div>
              <div role="listitem"><span>Phone</span><a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a></div>
              <div role="listitem"><span>LinkedIn</span><a href={profile.linkedin} target="_blank" rel="noreferrer">Professional profile ↗</a></div>
              <div role="listitem"><span>Google Scholar</span><a href={profile.scholar} target="_blank" rel="noreferrer">Research archive ↗</a></div>
              <div role="listitem"><span>GitHub</span><a href={profile.github} target="_blank" rel="noreferrer">Technical work ↗</a></div>
            </div>
            <ul className="profile-metrics-inline" aria-label="Professional profile highlights">
              {profile.metrics.map((metric) => <li key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></li>)}
            </ul>
            <div className="button-row">
              <Link className="button button-navy" href="/experience">Review experience</Link>
              <a className="button button-ghost" href={`mailto:${profile.email}?subject=Professional enquiry`}>Contact Asif</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-ash composed-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow={settings.about.educationEyebrow}
              title={settings.about.educationTitle}
              text={settings.about.educationIntro}
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

      <section className="section section-white composed-section principles-section">
        <div className="shell">
          <SectionHeading
            eyebrow={settings.about.principlesEyebrow}
            title={settings.about.principlesTitle}
            text={settings.about.principlesIntro}
          />
          <div className="principles-grid">
            {settings.about.principles.map((principle, index) => (
              <article className="principle-card" key={principle.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
