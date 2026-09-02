import { HashAnchorHandler } from "@/components/HashAnchorHandler";
import { PageHero } from "@/components/Primitives";
import { getPracticeAreas, getSiteSettings } from "@/lib/cms";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Research & Professional Practice",
  description: "Five connected areas of research, analytics and technical advisory practice.",
  path: "/practice",
});

export const revalidate = 60;

export default async function PracticePage() {
  const [practiceAreas, settings] = await Promise.all([getPracticeAreas(), getSiteSettings()]);
  const copy = settings.pages.practice;

  return (
    <>
      <HashAnchorHandler />
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
      />
      <section className="section section-white composed-section">
        <div className="shell practice-chapter-grid">
          {practiceAreas.map((area) => (
            <article className="practice-chapter" id={area.slug} tabIndex={-1} key={area.slug}>
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
          ))}
        </div>
      </section>
    </>
  );
}
