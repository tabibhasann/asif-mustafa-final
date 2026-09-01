"use client";

import { useMemo, useState } from "react";
import type { Publication } from "@/lib/content";

const filters = ["All", "Published", "Conference", "Dataset"];

export function PublicationArchive({ publications }: { publications: Publication[] }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const needle = query.toLowerCase().trim();
    return publications.filter((publication) => {
      const matchesFilter = filter === "All" || publication.status === filter;
      const matchesQuery = !needle || [publication.title, publication.venue, ...publication.keywords]
        .join(" ")
        .toLowerCase()
        .includes(needle);
      return matchesFilter && matchesQuery;
    });
  }, [filter, publications, query]);

  return (
    <>
      <div className="publication-tools">
        <div className="filter-bar compact" aria-label="Filter publications">
          {filters.map((item) => (
            <button
              type="button"
              key={item}
              className={filter === item ? "active" : ""}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="search-field">
          <span className="sr-only">Search publications</span>
          <input
            type="search"
            placeholder="Search title, venue or keyword"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>
      <div className="publication-list" aria-live="polite">
        {visible.map((publication) => (
          <article className="publication-row" key={`${publication.title}-${publication.year}`}>
            <div className="publication-icon" aria-hidden="true">§</div>
            <div>
              <div className="publication-meta">
                <span>{publication.type}</span>
                <span>{publication.status}</span>
              </div>
              <h2>{publication.title}</h2>
              <p>{publication.venue}</p>
              <ul className="tag-list">
                {publication.keywords.map((keyword) => <li key={keyword}>{keyword}</li>)}
              </ul>
            </div>
            <div className="publication-year">
              <strong>{publication.year}</strong>
              <a href={publication.href} target="_blank" rel="noreferrer" aria-label={`Open publication: ${publication.title}`}>↗</a>
            </div>
          </article>
        ))}
        {!visible.length && <p className="empty-state">No publications match this filter.</p>}
      </div>
    </>
  );
}
