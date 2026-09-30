import Image from "next/image";
import Link from "next/link";
import type { StoryPreview } from "@/lib/content";

export function StoryJournal({ stories }: { stories: StoryPreview[] }) {
  return (
    <section className="section section-white composed-section story-journal">
      <div className="shell story-journal-list">
        {stories.map((story) => {
          const date = story.dateLabel || (story.publishedAt && !Number.isNaN(Date.parse(story.publishedAt)) ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(story.publishedAt)) : "");
          return (
          <article className="story-journal-entry" key={story.slug}>
            <Link className="story-journal-link" href={`/stories/${story.slug}`} prefetch={false}>
              <div className="story-journal-media"><Image src={story.image} alt="" fill sizes="(max-width: 800px) calc(100vw - 32px), 40vw" quality={75} /></div>
              <div className="story-journal-copy">
                <p className="eyebrow">{story.category}</p>
                <h2>{story.title}</h2>
                <p>{story.excerpt}</p>
                {(date || story.readingTime) && <div className="story-journal-meta">
                  {date && <time dateTime={story.publishedAt}>{date}</time>}
                  {story.readingTime && <span>{story.readingTime}</span>}
                </div>}
                <span className="text-link">Read the story <span aria-hidden="true">→</span></span>
              </div>
            </Link>
          </article>
          );
        })}
        {!stories.length && <p>No stories have been published yet.</p>}
      </div>
    </section>
  );
}
