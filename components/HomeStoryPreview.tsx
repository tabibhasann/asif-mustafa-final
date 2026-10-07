import Image from "next/image";
import Link from "next/link";
import type { StoryPreview } from "@/lib/content";

export function HomeStoryPreview({ stories }: { stories: StoryPreview[] }) {
  if (stories.length === 0) return null;

  return (
    <ul className="home-story-list">
      {stories.map((story) => (
        <li className="home-story-entry" key={story.slug}>
          <article>
            <Link
              className={`home-story-link${story.image ? "" : " home-story-link-text-only"}`}
              href={`/stories/${story.slug}`}
              prefetch={false}
            >
              {story.image && (
                <div className="home-story-media">
                  <Image
                    src={story.image}
                    alt=""
                    fill
                    loading="lazy"
                    quality={60}
                    sizes="(max-width: 640px) 88px, (max-width: 900px) 144px, 188px"
                  />
                </div>
              )}
              <div className="home-story-copy">
                {story.category && <p className="card-kicker">{story.category}</p>}
                <h3>{story.title}</h3>
                {story.excerpt && <p className="home-story-excerpt">{story.excerpt}</p>}
              </div>
              <span className="home-story-action">
                Read the story <span aria-hidden="true">→</span>
              </span>
            </Link>
          </article>
        </li>
      ))}
    </ul>
  );
}
