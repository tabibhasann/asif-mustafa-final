import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EditorialCard } from "@/components/EditorialCard";
import { MonogramPortrait, SectionHeading } from "@/components/Primitives";
import {
  getInsights,
  getPracticeAreas,
  getProfile,
  getProjects,
  getPublications,
  getSiteSettings,
  getStories,
} from "@/lib/cms";

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [profile, practiceAreas, projects, publications, stories, insights, settings] = await Promise.all([
    getProfile(),
    getPracticeAreas(),
    getProjects(),
    getPublications(),
    getStories(),
    getInsights(),
    getSiteSettings(),
  ]);
  const prioritisedProjects = [
    ...projects.filter((project) => project.featured),
    ...projects.filter((project) => !project.featured),
  ];
  const featuredProjects = [...new Map(prioritisedProjects.map((project) => [project.slug, project])).values()].slice(0, 4);
  const prioritisedStories = [
    ...stories.filter((story) => story.featured),
    ...stories.filter((story) => !story.featured),
  ];
  const featuredStories = [...new Map(prioritisedStories.map((story) => [story.slug, story])).values()].slice(0, 4);

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-media" aria-hidden="true">
          <Image
            src={settings.home.heroImage}
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            quality={70}
            sizes="100vw"
          />
        </div>
        <div className="shell home-hero-grid">
          <div className="hero-copy">
            <p className="eyebrow light">{profile.name} · {settings.home.heroEyebrow}</p>
            <h1>{profile.headline}</h1>
            <p className="hero-intro">{profile.introduction}</p>
            <div className="button-row">
              <Link className="button button-gold" href="/projects" prefetch={false}>
                {settings.home.heroPrimaryCta} <span aria-hidden="true">→</span>
              </Link>
              <Link className="button button-ghost-light" href="/practice" prefetch={false}>
                {settings.home.heroSecondaryCta}
              </Link>
            </div>
          </div>
          <div className="hero-media-label">
            <span>Professional practice</span>
            <strong>{settings.home.heroImageLabel}</strong>
          </div>
        </div>
        <a className="hero-scroll-cue" href="#professional-profile">
          <span>Explore the practice</span>
          <i aria-hidden="true" />
        </a>
      </section>

      <section className="section home-profile" id="professional-profile">
        <div className="shell home-profile-grid" data-reveal="section">
          <MonogramPortrait src={profile.portrait} name={profile.name} alt={profile.portraitAlt} className="home-profile-portrait" />
          <div className="home-profile-copy">
            <p className="eyebrow">{settings.home.profileEyebrow}</p>
            <h2>{settings.home.profileTitle}</h2>
            <p>{profile.biography[0]}</p>
            <div className="button-row">
              <Link className="text-link" href="/about" prefetch={false}>Full profile <span aria-hidden="true">→</span></Link>
              <Link className="text-link" href="/experience" prefetch={false}>Experience <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <div className="profile-facts" role="list" aria-label="Professional profile highlights">
            {profile.metrics.slice(0, 4).map((metric) => (
              <div className="profile-fact" role="listitem" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section composed-section practice-section">
        <div className="shell">
          <SectionHeading
            eyebrow={settings.home.practiceEyebrow}
            title={settings.home.practiceTitle}
            action={{ href: "/practice", label: settings.home.practiceAction }}
          />
          <div className="practice-card-grid">
            {practiceAreas.map((area) => (
              <article className="practice-card" key={area.slug} data-reveal="item">
                <Link href={`/practice#${area.slug}`} prefetch={false}>
                  <span className="practice-number">{area.number}</span>
                  <h3>{area.title}</h3>
                  <p>{area.summary}</p>
                  <div className="practice-card-tail">
                    <span>{area.capabilities.length} capabilities</span>
                    <span aria-hidden="true">↗</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section composed-section projects-section">
        <div className="shell">
          <SectionHeading
            eyebrow={settings.home.projectsEyebrow}
            title={settings.home.projectsTitle}
            action={{ href: "/projects", label: settings.home.projectsAction }}
          />
          <div className="editorial-card-grid project-preview-grid">
            {featuredProjects.map((project) => (
              <EditorialCard
                key={project.slug}
                href={`/projects/${project.slug}`}
                image={project.image}
                eyebrow={project.category}
                title={project.title}
                summary={project.summary}
                tags={project.stack}
                className="project-card"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"
                reveal
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section composed-section stories-section">
        <div className="shell">
          <SectionHeading
            eyebrow={settings.home.storiesEyebrow}
            title={settings.home.storiesTitle}
            action={{ href: "/stories", label: settings.home.storiesAction }}
          />
          <div className="editorial-card-grid story-preview-grid">
            {featuredStories.map((story) => (
              <EditorialCard
                key={story.slug}
                href={`/stories/${story.slug}`}
                image={story.image}
                eyebrow={story.category}
                title={story.title}
                summary={story.excerpt}
                tags={story.stack}
                className="story-card"
                sizes="(max-width: 640px) 100vw, (max-width: 900px) 38vw, 20vw"
                reveal
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section composed-section insights-section">
        <div className="shell home-insights-surface">
          <SectionHeading
            eyebrow={settings.home.insightsEyebrow}
            title={settings.home.insightsTitle}
            action={{ href: "/blogs", label: settings.home.insightsAction }}
            light
          />
          <div className="editorial-card-grid insight-preview-grid">
            {insights.slice(0, 3).map((insight) => (
              <EditorialCard
                key={insight.slug}
                href={`/blogs/${insight.slug}`}
                image={insight.image}
                eyebrow={insight.category}
                title={insight.title}
                summary={insight.excerpt}
                meta={[insight.date, insight.readingTime].filter(Boolean).join(" · ")}
                className="insight-card"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                reveal
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section composed-section publications-section">
        <div className="shell">
          <SectionHeading
            eyebrow={settings.home.publicationsEyebrow}
            title={settings.home.publicationsTitle}
            action={{ href: "/publications", label: settings.home.publicationsAction }}
          />
          <div className="publication-preview">
            {publications.slice(0, 4).map((publication) => (
              <article key={publication.title} data-reveal="item">
                <span>{publication.year}</span>
                <div>
                  <p className="card-kicker">{publication.type} · {publication.status}</p>
                  <h3>{publication.title}</h3>
                  <p>{publication.venue}</p>
                </div>
                {publication.href
                  ? <a href={publication.href} target="_blank" rel="noreferrer" aria-label={`Open ${publication.title} in a new tab`}>↗</a>
                  : null}
              </article>
            ))}
          </div>
          <div className="venue-inline" role="group" aria-label="Selected research and scholarly venues">
            <span>{settings.home.venuesLabel}</span>
            {settings.home.scholarlyVenues.map((venue) => <strong key={venue}>{venue}</strong>)}
          </div>
        </div>
      </section>

      <section className="sector-band compact-context">
        <div className="shell sector-grid" data-reveal="section">
          <div>
            <p className="eyebrow light">{settings.home.contextEyebrow}</p>
            <h2>{settings.home.contextTitle}</h2>
          </div>
          <ul>
            {settings.home.contexts.map((sector) => <li key={sector}>{sector}</li>)}
          </ul>
        </div>
      </section>
    </div>
  );
}
