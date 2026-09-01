import type { ReactNode } from "react";
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

export function MonogramPortrait() {
  return (
    <div className="monogram-portrait" role="img" aria-label="Professional portrait placeholder managed in Sanity">
      <span>AM</span>
      <div>
        <strong>Professional portrait</strong>
        <small>Replace from Sanity</small>
      </div>
    </div>
  );
}
