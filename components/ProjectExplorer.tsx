"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/content";
import { projectFilterCategories } from "@/lib/site";

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState("All");
  const filtered = category === "All"
    ? projects
    : projects.filter((project) => project.categories.includes(category));

  return (
    <>
      <div className="filter-bar" aria-label="Filter projects by category">
        {projectFilterCategories.map((item) => (
          <button
            type="button"
            key={item}
            className={category === item ? "active" : ""}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="project-grid" aria-live="polite">
        {filtered.map((project) => (
          <article className="project-card" key={project.slug}>
            <Link className="project-image" href={`/projects/${project.slug}`} aria-label={`Read project: ${project.title}`}>
              <Image src={project.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" />
            </Link>
            <div className="project-card-body">
              <p className="card-kicker">{project.category}</p>
              <h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2>
              <p>{project.summary}</p>
              <ul className="tag-list" aria-label="Technology stack">
                {project.stack.slice(0, 5).map((item) => <li key={item}>{item}</li>)}
              </ul>
              <Link className="text-link" href={`/projects/${project.slug}`}>View project <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
