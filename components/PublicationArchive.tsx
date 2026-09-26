"use client";

import { useDeferredValue, useMemo, useState } from "react";
import type { Publication } from "@/lib/content";
import "@/app/collections.css";

const preferredStatuses = ["Published", "In press", "Under review", "Under submission", "Submitted", "Ongoing"] as const;
const preferredTypes = ["Journal article", "Conference paper", "Dataset", "Book chapter", "Working paper"] as const;

function displayStatus(status: string): string {
  return status === "Conference" || status === "Dataset" ? "Published" : status;
}

export function PublicationArchive({ publications }: { publications: Publication[] }) {
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [typeFilter, setTypeFilter] = useState("All types");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const availableTypes = new Set(publications.map((publication) => publication.type));
  const availableStatuses = new Set(publications.map((publication) => displayStatus(publication.status)));
  const statuses = [
    ...preferredStatuses,
    ...[...availableStatuses].filter((status) => !preferredStatuses.includes(status as typeof preferredStatuses[number])).sort(),
  ];
  const statusCounts = new Map<string, number>(statuses.map((status): [string, number] => [
    status,
    publications.filter((publication) => displayStatus(publication.status) === status).length,
  ]));
  const types = [
    ...preferredTypes.filter((item) => availableTypes.has(item)),
    ...[...availableTypes].filter((item) => !preferredTypes.includes(item as typeof preferredTypes[number])),
  ];
  const visible = useMemo(() => {
    const needle = deferredQuery.toLowerCase().trim();
    return publications.filter((publication) => {
      const matchesStatus = statusFilter === "All statuses" || displayStatus(publication.status) === statusFilter;
      const matchesType = typeFilter === "All types" || publication.type === typeFilter;
      const matchesQuery = !needle || [publication.title, publication.venue, ...publication.keywords]
        .join(" ")
        .toLowerCase()
        .includes(needle);
      return matchesStatus && matchesType && matchesQuery;
    });
  }, [deferredQuery, statusFilter, typeFilter, publications]);
  const isUpdating = query !== deferredQuery;
  const hasFilters = statusFilter !== "All statuses" || typeFilter !== "All types" || query.trim() !== "";

  function clearFilters() {
    setStatusFilter("All statuses");
    setTypeFilter("All types");
    setQuery("");
  }

  return (
    <div className="publication-archive">
      <div className="publication-filters" role="group" aria-label="Filter publications">
        <label>
          <span>Status</span>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option>All statuses</option>
            {statuses.map((status) => <option key={status} value={status}>{status} ({statusCounts.get(status)})</option>)}
          </select>
        </label>
        <label>
          <span>Type</span>
          <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
            <option>All types</option>
            {types.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </label>
        <label className="publication-search">
          <span>Search</span>
          <input
            type="search"
            placeholder="Search title, venue or keyword"
            aria-describedby="publication-results-summary"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <button className="publication-clear" type="button" onClick={clearFilters} disabled={!hasFilters}>Clear filters</button>
      </div>
      <p className="filter-summary" id="publication-results-summary" aria-live="polite">
        Showing {visible.length} of {publications.length} {publications.length === 1 ? "record" : "records"}
      </p>
      <div className={`publication-list ${isUpdating ? "is-updating" : ""}`} aria-busy={isUpdating}>
        {visible.map((publication) => (
          <article className="publication-row" key={`${publication.title}-${publication.year}`}>
            <div className="publication-icon" aria-hidden="true">§</div>
            <div>
              <div className="publication-meta">
                <span>{publication.type}</span>
                <span>{displayStatus(publication.status)}</span>
              </div>
              <h2>{publication.title}</h2>
              {publication.venue && <p>{publication.venue}</p>}
              <ul className="tag-list">
                {publication.keywords.map((keyword) => <li key={keyword}>{keyword}</li>)}
              </ul>
            </div>
            <div className="publication-year">
              {publication.year && <strong>{publication.year}</strong>}
              {publication.href
                ? <a href={publication.href} target="_blank" rel="noreferrer" aria-label={`Open publication: ${publication.title} in a new tab`}>↗</a>
                : null}
            </div>
          </article>
        ))}
        {!visible.length && (
          <div className="publication-empty">
            <p>{publications.length ? "No publications match these filters." : "No publications are available yet."}</p>
            {hasFilters && <button type="button" onClick={clearFilters}>Clear filters</button>}
          </div>
        )}
      </div>
    </div>
  );
}
