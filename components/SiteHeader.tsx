"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Profile } from "@/lib/content";
import { headerLinks, knowledgeLinks } from "@/lib/site";

export function SiteHeader({ profile }: { profile: Pick<Profile, "name" | "role" | "email" | "location"> }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const knowledgeButtonRef = useRef<HTMLButtonElement>(null);
  const knowledgeActive = knowledgeLinks.some((item) => pathname.startsWith(item.href));

  useEffect(() => {
    setOpen(false);
    setKnowledgeOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (open) {
          menuButtonRef.current?.focus();
        } else if (knowledgeOpen) {
          knowledgeButtonRef.current?.focus();
        }
        setOpen(false);
        setKnowledgeOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [knowledgeOpen, open]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="utility-bar">
        <div className="shell utility-inner">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <span>{profile.location}</span>
          <span>Research · Data Science · Industrial Systems</span>
        </div>
      </div>
      <div className="nav-bar">
        <div className="shell nav-inner">
          <Link className="brand" href="/" prefetch={false}>
            <span className="brand-mark" aria-hidden="true">AM</span>
            <span>
              <strong>{profile.name}</strong>
              <small>{profile.role}</small>
            </span>
          </Link>

          <button
            ref={menuButtonRef}
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="primary-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
            <span className="sr-only">{open ? "Close navigation" : "Open navigation"}</span>
          </button>

          <nav
            id="primary-navigation"
            className={`primary-nav ${open ? "is-open" : ""}`}
            aria-label="Primary navigation"
          >
            {headerLinks.map((item) => (
              <Link
                className={pathname.startsWith(item.href) ? "active" : ""}
                href={item.href}
                key={item.href}
                prefetch={false}
                onClick={() => setOpen(false)}
                aria-current={pathname.startsWith(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <div
              className={`more-menu ${knowledgeOpen ? "is-open" : ""}`}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setKnowledgeOpen(false);
              }}
            >
              <button
                ref={knowledgeButtonRef}
                type="button"
                className={knowledgeActive ? "active" : ""}
                aria-haspopup="menu"
                aria-expanded={knowledgeOpen}
                onClick={() => setKnowledgeOpen((value) => !value)}
              >
                Knowledge
              </button>
              <div className="more-panel" id="knowledge-navigation">
                {knowledgeLinks.map((item) => (
                  <Link
                    href={item.href}
                    key={item.href}
                    prefetch={false}
                    onClick={() => {
                      setOpen(false);
                      setKnowledgeOpen(false);
                    }}
                    aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <a className="nav-contact" href={`mailto:${profile.email}?subject=Professional enquiry`}>
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
