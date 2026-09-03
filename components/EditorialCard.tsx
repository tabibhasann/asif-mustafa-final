import Image from "next/image";
import Link from "next/link";

export function EditorialCard({
  href,
  image,
  eyebrow,
  title,
  summary,
  meta,
  tags = [],
  priority = false,
  headingLevel = 3,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  reveal = false,
}: {
  href: string;
  image: string;
  eyebrow: string;
  title: string;
  summary: string;
  meta?: string;
  tags?: string[];
  priority?: boolean;
  headingLevel?: 2 | 3;
  className?: string;
  sizes?: string;
  reveal?: boolean;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article className={`editorial-card ${className}`.trim()} data-reveal={reveal ? "item" : undefined}>
      <Link className="editorial-card-link" href={href} prefetch={false}>
        <div className="editorial-card-media">
          <Image
            src={image}
            alt=""
            fill
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            quality={60}
            sizes={sizes}
          />
        </div>
        <div className="editorial-card-copy">
          <p className="card-kicker">{eyebrow}</p>
          <Heading>{title}</Heading>
          <p>{summary}</p>
          {tags.length > 0 && (
            <ul className="compact-tags" aria-label="Topics">
              {tags.slice(0, 3).map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          )}
          <div className="editorial-card-tail">
            {meta && <span>{meta}</span>}
            <span className="editorial-card-arrow" aria-hidden="true">↗</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
