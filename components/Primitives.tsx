import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  text,
  action,
  light = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  action?: { href: string; label: string };
  light?: boolean;
}) {
  return (
    <div className={`section-heading ${light ? "light" : ""}`}>
      <div>
        <p className={`eyebrow ${light ? "light" : ""}`}>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {(text || action) && (
        <div className="section-heading-aside">
          {text && <p>{text}</p>}
          {action && <Link className="text-link" href={action.href}>{action.label} <span aria-hidden="true">→</span></Link>}
        </div>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  meta,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  meta?: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="shell page-hero-grid">
        <div>
          <p className="eyebrow light">{eyebrow}</p>
          <h1>{title}</h1>
        </div>
        <div className="page-hero-intro">
          <p>{intro}</p>
          {meta && <span>{meta}</span>}
          {children}
        </div>
      </div>
    </section>
  );
}

export function MonogramPortrait({
  src,
  name = "Md Asif Mustafa",
  className = "",
  priority = false,
}: {
  src?: string;
  name?: string;
  className?: string;
  priority?: boolean;
}) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  if (src) {
    return (
      <div className={`monogram-portrait has-image ${className}`.trim()}>
        <Image
          src={src}
          alt={`Professional portrait of ${name}`}
          fill
          priority={priority}
          sizes="(max-width: 900px) 100vw, 42vw"
        />
        <div><strong>{name}</strong><small>Professional profile</small></div>
      </div>
    );
  }

  return (
    <div className={`monogram-portrait ${className}`.trim()} role="img" aria-label={`Professional portrait space for ${name}`}>
      <span>{initials || "AM"}</span>
      <div>
        <strong>{name}</strong>
        <small>Professional portrait</small>
      </div>
    </div>
  );
}
