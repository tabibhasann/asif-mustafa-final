import Image from "next/image";
import Link from "next/link";

export function EditorialCard({
  href,
  image,
  imageAlt,
  eyebrow,
  title,
  summary,
  meta,
  tags = [],
  headingLevel = 3,
  className = "",
  priority = false,
}: {
  href: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  summary: string;
  meta?: string;
  tags?: string[];
  headingLevel?: 2 | 3;
  className?: string;
  priority?: boolean;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article className={`editorial-card ${className}`.trim()}>
      <Link className="editorial-card-link" href={href}>
        <div className="editorial-card-media">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 34vw, (max-width: 1024px) 50vw, 25vw"
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
