import type { Project } from "@/lib/content";

type Narrative = Pick<Project, "context" | "approach" | "outcome" | "detailLabels" | "detailHeadings">;

export function ProjectNarrative({ project }: { project: Narrative }) {
  if (!project.context && project.approach.length === 0 && !project.outcome) return null;

  return (
    <article className="project-narrative">
      {project.context && (
        <section className="project-narrative-section">
          <div className="project-narrative-heading">
            <p className="eyebrow">{project.detailLabels?.context || "Context"}</p>
            <h2>{project.detailHeadings?.context || "Why the work was needed"}</h2>
          </div>
          <p className="project-narrative-copy">{project.context}</p>
        </section>
      )}
      {project.approach.length > 0 && (
        <section className="project-narrative-section">
          <div className="project-narrative-heading">
            <p className="eyebrow">{project.detailLabels?.approach || "Approach"}</p>
            <h2>{project.detailHeadings?.approach || "How the system was developed"}</h2>
          </div>
          <ol className="project-approach-list">
            {project.approach.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </section>
      )}
      {project.outcome && (
        <section className="project-narrative-section project-narrative-outcome">
          <div className="project-narrative-heading">
            <p className="eyebrow">{project.detailLabels?.outcome || "Outcome"}</p>
            <h2>{project.detailHeadings?.outcome || "What the work established"}</h2>
          </div>
          <p className="project-narrative-copy">{project.outcome}</p>
        </section>
      )}
    </article>
  );
}
