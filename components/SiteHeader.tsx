"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Profile } from "@/lib/content";
import { headerLinks } from "@/lib/site";
import { InsightsNavigation } from "@/components/InsightsNavigation";

export function SiteHeader({ profile }: { profile: Pick<Profile, "name" | "role" | "email"> }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        menuButtonRef.current?.focus();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  useEffect(() => {
    let previousY = window.scrollY;
    let frame = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateHeader = () => {
      const currentY = window.scrollY;
      const delta = currentY - previousY;
      setScrolled(currentY > 24);
      if (currentY < 80 || open || reduceMotion) {
        setHidden(false);
      } else if (delta > 8 && currentY > 160) {
        setHidden(true);
      } else if (delta < -8) {
        setHidden(false);
      }
      previousY = currentY;
      frame = 0;
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHeader);
    };

    updateHeader();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [open]);

  return (
    <header className={`site-header${pathname === "/" ? " is-home" : ""}${scrolled ? " is-scrolled" : ""}${hidden ? " is-hidden" : ""}${open ? " menu-open" : ""}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
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
            {headerLinks.map((item) => item.href === "/insights" ? (
              <InsightsNavigation key={item.href} active={pathname.startsWith("/insights") || pathname.startsWith("/blogs") || pathname.startsWith("/stories")} onNavigate={() => setOpen(false)} />
            ) : (
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
            <a className="nav-contact" href={`mailto:${profile.email}?subject=Professional enquiry`}>
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
