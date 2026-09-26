"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function InsightsNavigation({ active, onNavigate }: { active: boolean; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const groupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!expanded) return;
    const dismissOutside = (event: PointerEvent) => {
      if (!groupRef.current?.contains(event.target as Node)) setExpanded(false);
    };
    document.addEventListener("pointerdown", dismissOutside);
    return () => document.removeEventListener("pointerdown", dismissOutside);
  }, [expanded]);

  function navigate() {
    setExpanded(false);
    onNavigate();
  }

  return (
    <div
      ref={groupRef}
      className={`nav-insights${active ? " active" : ""}`}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setExpanded(true); }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse" && !groupRef.current?.contains(document.activeElement)) setExpanded(false);
      }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false); }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && expanded) {
          event.preventDefault();
          event.stopPropagation();
          setExpanded(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <Link href="/insights" prefetch={false} onClick={navigate} aria-current={active ? "true" : undefined}>Insights</Link>
      <button
        ref={buttonRef}
        type="button"
        className="nav-insights-toggle"
        aria-label="Show Blogs and My Stories"
        aria-expanded={expanded}
        aria-controls="insights-navigation"
        onClick={() => setExpanded((value) => !value)}
      >
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true"><path d="m1 1 5 5 5-5" stroke="currentColor" strokeWidth="1.5" /></svg>
      </button>
      <div className="nav-insights-menu" id="insights-navigation" hidden={!expanded}>
        <Link href="/insights#blogs" prefetch={false} onClick={navigate}>Blogs</Link>
        <Link href="/insights#stories" prefetch={false} onClick={navigate}>My Stories</Link>
      </div>
    </div>
  );
}
