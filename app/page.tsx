import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { MonogramPortrait, SectionHeading } from "@/components/Primitives";
import {
  getInsights,
  getPracticeAreas,
  getProfile,
  getProjects,
  getPublications,
  getStories,
} from "@/lib/cms";
import { processSteps, scholarlyVenues, sectors } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [profile, practiceAreas, projects, publications, stories, insights] = await Promise.all([
    getProfile(),
    getPracticeAreas(),
    getProjects(),
    getPublications(),
    getStories(),
    getInsights(),
  ]);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
  const featuredStory = stories[0];

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-grid">
          <div className="hero-copy">
            <p className="eyebrow light">Research · Analytics · Industrial systems</p>
            <h1>{profile.headline}</h1>
            <p className="hero-intro">{profile.introduction}</p>
            <div className="button-row">
              <Link className="button button-gold" href="/projects">
                Explore selected work <span aria-hidden="true">→</span>
              </Link>
              <Link className="button button-ghost-light" href="/practice">
                View professional practice
              </Link>
            </div>
            <div className="hero-identity">
              <span className="identity-rule" />
              <div>
                <strong>{profile.name}</strong>
                <small>{profile.role}</small>
              </div>
            </div>
          </div>
          <div className="hero-media">
            <Image
              src="/images/hero.jpg"
              alt="An engineering researcher reviewing operational data in a modern industrial facility"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 55vw"
            />
            <div className="hero-media-label">
              <span>Applied intelligence</span>
              <strong>From field evidence to working systems</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="credibility-strip" aria-label="Professional profile highlights">
        <div className="shell credibility-grid">
          {profile.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
          <div>
            <strong>B.Sc.</strong>
            <span>Leather Engineering · KUET</span>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Research & professional practice"
              title="Five connected fields. One evidence-led approach."
              text="The work moves between research, digital systems and industrial reality—without losing sight of the decision that needs to be made."
              action={{ href: "/practice", label: "Explore the full practice" }}
            />
          </Reveal>
          <div className="practice-list">
            {practiceAreas.map((area, index) => (
              <Reveal key={area.slug} delay={index * 45}>
                <Link className="practice-row" href={`/practice#${area.slug}`}>
                  <span className="practice-number">{area.number}</span>
                  <div>
                    <h3>{area.title}</h3>
                    <p>{area.summary}</p>
                  </div>
                  <ul>
                    {area.capabilities.slice(0, 2).map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <span className="row-arrow" aria-hidden="true">↗</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-ash">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Selected projects"
              title="Technical work designed around real questions."
              text="Selected research and systems work. Each project opens into a concise editorial record of context, approach and outcome."
              action={{ href: "/projects", label: "View all projects" }}
            />
          </Reveal>
          <div className="featured-projects">
            {featuredProjects.map((project, index) => (
              <Reveal className={index === 0 ? "featured-project large" : "featured-project"} key={project.slug} delay={index * 70}>
                <Link className="featured-project-link" href={`/projects/${project.slug}`}>
                  <div className="featured-project-image">
                    <Image src={project.image} alt="" fill sizes={index === 0 ? "(max-width: 800px) 100vw, 60vw" : "(max-width: 800px) 100vw, 32vw"} />
                  </div>
                  <div className="featured-project-copy">
                    <p className="card-kicker">{project.category}</p>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <span className="text-link">Read project <span aria-hidden="true">→</span></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sector-band">
        <div className="shell sector-grid">
          <div>
            <p className="eyebrow light">Contexts of work</p>
            <h2>Across industry, institutions and applied research.</h2>
          </div>
          <ul>
            {sectors.map((sector) => <li key={sector}>{sector}</li>)}
          </ul>
        </div>
      </section>

      <section className="section section-white">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Working method"
              title="A disciplined path from uncertainty to use."
              text="The method is intentionally simple: define the decision, examine the system, build around reality and leave the work usable."
            />
          </Reveal>
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 70}>
                <article className="process-step">
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {featuredStory && (
        <section className="story-feature">
          <div className="story-feature-media">
            <Image src={featuredStory.image} alt="A multidisciplinary industrial research team conducting a field assessment" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div className="story-feature-copy">
            <p className="eyebrow light">Field story · {featuredStory.category}</p>
            <h2>{featuredStory.title}</h2>
            <p>{featuredStory.excerpt}</p>
            <ul className="tag-list dark-tags">
              {featuredStory.stack.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <Link className="button button-gold" href={`/stories/${featuredStory.slug}`}>
              Read the story <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      )}

      <section className="section section-ash">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Publications"
              title="Research published. Knowledge shared."
              text="A selected record across sustainable manufacturing, workplace safety, machine learning and decision analysis."
              action={{ href: "/publications", label: "Browse the publication archive" }}
            />
          </Reveal>
          <div className="publication-preview">
            {publications.slice(0, 4).map((publication) => (
              <article key={publication.title}>
                <span>{publication.year}</span>
                <div>
                  <p className="card-kicker">{publication.type} · {publication.status}</p>
                  <h3>{publication.title}</h3>
                  <p>{publication.venue}</p>
                </div>
                <a href={publication.href} target="_blank" rel="noreferrer" aria-label={`Open ${publication.title}`}>↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="profile-band">
        <div className="shell profile-band-grid">
          <MonogramPortrait src={profile.portrait} name={profile.name} className="profile-monogram" />
          <div>
            <p className="eyebrow light">Professional profile</p>
            <h2>Engineering context. Statistical discipline. Applied intelligence.</h2>
            <p>{profile.biography[0]}</p>
            <div className="button-row">
              <Link className="button button-gold" href="/about">Read the full profile <span aria-hidden="true">→</span></Link>
              <Link className="button button-ghost-light" href="/experience">Review experience</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Insights"
              title="Ideas, research and field perspectives."
              text="Short editorial notes on evidence, systems and responsible industrial decisions."
              action={{ href: "/insights", label: "View all insights" }}
            />
          </Reveal>
          <div className="insight-grid">
            {insights.slice(0, 3).map((insight, index) => (
              <Reveal key={insight.slug} delay={index * 70}>
                <article className="insight-card">
                  <Link className="insight-image" href={`/insights/${insight.slug}`} aria-label={`Read insight: ${insight.title}`}>
                    <Image src={insight.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
                  </Link>
                  <div>
                    <p className="card-kicker">{insight.category}</p>
                    <h3><Link href={`/insights/${insight.slug}`}>{insight.title}</Link></h3>
                    <p>{insight.excerpt}</p>
                    <span>{insight.readingTime}</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="venues-band" aria-label="Selected research and scholarly venues">
        <div className="shell">
          <p className="eyebrow">Selected research & scholarly venues</p>
          <div className="venue-list">
            {scholarlyVenues.map((venue) => <span key={venue}>{venue}</span>)}
          </div>
        </div>
      </section>
    </>
  );
}
