import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/Primitives";
import { Reveal } from "@/components/Reveal";
import { getStories } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Stories",
  description: "Field stories connecting research, technical systems and industrial practice.",
  alternates: { canonical: "/stories" },
};

export const revalidate = 60;

export default async function StoriesPage() {
  const stories = await getStories();
  return (
    <>
      <PageHero
        eyebrow="Stories"
        title="The work behind the technical record."
        intro="Editorial accounts of field research, systems work and industrial decision-making—focused on setting, method and what the process teaches."
      />
      <section className="section section-white">
        <div className="shell story-list">
          {stories.map((story, index) => (
            <Reveal key={story.slug}>
              <article className="story-row">
                <Link className="story-row-image" href={`/stories/${story.slug}`} aria-label={`Read story: ${story.title}`}>
                  <Image src={story.image} alt="" fill sizes="(max-width: 760px) 100vw, 40vw" />
                </Link>
                <div>
                  <p className="card-kicker">{story.category}</p>
                  <h2><Link href={`/stories/${story.slug}`}>{story.title}</Link></h2>
                  <p>{story.excerpt}</p>
                  <ul className="tag-list">
                    {story.stack.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <Link className="text-link" href={`/stories/${story.slug}`}>Read the story <span aria-hidden="true">→</span></Link>
                </div>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
