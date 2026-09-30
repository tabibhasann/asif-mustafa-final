import Link from "next/link";
import { CertificationList } from "@/components/CertificationList";
import { MonogramPortrait, PageHero, SectionHeading } from "@/components/Primitives";
import { StructuredData } from "@/components/StructuredData";
import { getCredentials, getProfile, getSiteSettings } from "@/lib/cms";
import { absoluteUrl, createPageMetadata, siteOrigin } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description: "Professional profile, education and certifications of Md Asif Mustafa.",
  path: "/about",
});

export const revalidate = 60;

export default async function AboutPage() {
  const [profile, settings, credentials] = await Promise.all([getProfile(), getSiteSettings(), getCredentials()]);
  const copy = settings.pages.about;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteOrigin}/about#profile-page`,
    url: absoluteUrl("/about"),
    name: `About ${profile.name}`,
    description: profile.introduction,
    mainEntity: { "@id": `${siteOrigin}/#person` },
  };

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
          <div className="editorial-image">
            <MonogramPortrait src={profile.portrait} name={profile.name} alt={profile.portraitAlt} priority />
          </div>
          <div className="editorial-copy">
            <p className="eyebrow">{settings.about.profileEyebrow}</p>
            <h2>{settings.about.profileTitle}</h2>
            {profile.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="profile-contact-grid" role="list" aria-label="Professional contact and profile links">
              <div role="listitem"><span>Email</span><a href={`mailto:${profile.email}`}>{profile.email}</a></div>
              <div role="listitem"><span>Phone</span><a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a></div>
              <div role="listitem"><span>LinkedIn</span><a href={profile.linkedin} target="_blank" rel="noreferrer">Professional profile ↗</a></div>
              <div role="listitem"><span>Google Scholar</span><a href={profile.scholar} target="_blank" rel="noreferrer">Research archive ↗</a></div>
              <div role="listitem"><span>GitHub</span><a href={profile.github} target="_blank" rel="noreferrer">Technical work ↗</a></div>
              {profile.youtube && <div role="listitem"><span>YouTube</span><a href={profile.youtube} target="_blank" rel="noreferrer">Video channel ↗</a></div>}
            </div>
            <ul className="profile-metrics-inline" aria-label="Professional profile highlights">
              {profile.metrics.map((metric) => <li key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></li>)}
            </ul>
            <div className="button-row">
              <Link className="button button-navy" href="/experience" prefetch={false}>Review experience</Link>
              {profile.cvUrl
                ? <a className="button button-ghost" href={profile.cvUrl} target="_blank" rel="noreferrer">Download CV ↗</a>
                : <a className="button button-ghost" href={`mailto:${profile.email}?subject=Professional enquiry`}>Contact Asif</a>}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-ash composed-section">
        <div className="shell">
          <SectionHeading
            eyebrow={settings.about.educationEyebrow}
            title={settings.about.educationTitle}
            text={settings.about.educationIntro}
          />
          <div className="education-grid">
            {profile.education.map((item, index) => (
              <article className="education-card" key={item.degree}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.degree}</h3>
                <strong>{item.institution}</strong>
                <p>{item.note}</p>
                {(item.cgpa || item.tgpa) && <dl className="education-grades">
                  {item.cgpa && <div><dt>CGPA</dt><dd>{item.cgpa}{item.gradeScale && ` / ${item.gradeScale}`}</dd></div>}
                  {item.tgpa && <div><dt>TGPA</dt><dd>{item.tgpa}{item.gradeScale && ` / ${item.gradeScale}`}</dd></div>}
                </dl>}
                {!!item.relevantCourses?.length && (
                  <div className="education-courses">
                    <h4>{settings.about.relevantCoursesLabel}</h4>
                    <ul>{item.relevantCourses.map((course) => <li key={course}>{course}</li>)}</ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white composed-section certifications-section" id="certifications">
        <div className="shell">
          <SectionHeading
            eyebrow={settings.about.certificationsEyebrow}
            title={settings.about.certificationsTitle}
            text={settings.about.certificationsIntro}
          />
          <CertificationList credentials={credentials} />
        </div>
      </section>
      <StructuredData id="profile-page-structured-data" data={structuredData} />
    </>
  );
}
