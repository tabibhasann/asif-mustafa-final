"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { headerLinks, headerProfile, knowledgeLinks } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const primaryLinks = headerLinks;

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="utility-bar">
        <div className="shell utility-inner">
          <a href={`mailto:${headerProfile.email}`}>{headerProfile.email}</a>
          <span>{headerProfile.location}</span>
          <span>Research · Data Science · Industrial Systems</span>
        </div>
      </div>
      <div className="nav-bar">
        <div className="shell nav-inner">
          <Link className="brand" href="/" aria-label="Md Asif Mustafa homepage">
            <span className="brand-mark" aria-hidden="true">AM</span>
            <span>
              <strong>Md Asif Mustafa</strong>
              <small>Researcher · Data Scientist · Advisor</small>
            </span>
          </Link>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="primary-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
            <span className="sr-only">Toggle navigation</span>
          </button>

          <nav
            id="primary-navigation"
            className={`primary-nav ${open ? "is-open" : ""}`}
            aria-label="Primary navigation"
          >
            {primaryLinks.map((item) => (
              <Link
                className={pathname.startsWith(item.href) ? "active" : ""}
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="more-menu">
              <button
                type="button"
                className={knowledgeLinks.some((item) => pathname.startsWith(item.href)) ? "active" : ""}
                aria-haspopup="true"
              >
                Knowledge
              </button>
              <div className="more-panel">
                {knowledgeLinks.map((item) => (
                  <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <a className="nav-contact" href={`mailto:${headerProfile.email}?subject=Professional enquiry`}>
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
