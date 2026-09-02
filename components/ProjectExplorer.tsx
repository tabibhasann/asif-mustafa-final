"use client";

import { useState } from "react";
import { EditorialCard } from "@/components/EditorialCard";
import type { Project } from "@/lib/content";
import { projectFilterCategories } from "@/lib/site";

export type ProjectPreview = Pick<Project, "slug" | "title" | "category" | "categories" | "summary" | "image" | "imageAlt" | "stack">;

export function ProjectExplorer({ projects }: { projects: ProjectPreview[] }) {
  const [category, setCategory] = useState("All");
  const availableCategories = new Set(projects.flatMap((project) => project.categories));
  const extraCategories = [...availableCategories].filter((item) => !projectFilterCategories.includes(item));
  const categories = [
    "All",
    ...projectFilterCategories.filter((item) => item !== "All" && availableCategories.has(item)),
    ...extraCategories,
  ];
  const filtered = category === "All"
    ? projects
    : projects.filter((project) => project.categories.includes(category));

  return (
    <>
      <div className="filter-bar" role="group" aria-label="Filter projects by category">
        {categories.map((item) => (
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
      <p className="filter-summary" aria-live="polite">
        Showing {filtered.length} {filtered.length === 1 ? "project" : "projects"}{category === "All" ? "" : ` in ${category}`}
      </p>
      <div className="project-grid">
        {filtered.map((project, index) => (
          <EditorialCard
            key={project.slug}
            href={`/projects/${project.slug}`}
            image={project.image}
            imageAlt={project.imageAlt ?? project.title}
            eyebrow={project.category}
            title={project.title}
            summary={project.summary}
            tags={project.stack}
            headingLevel={2}
            priority={index === 0}
          />
        ))}
      </div>
    </>
  );
}
