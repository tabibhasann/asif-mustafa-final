"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    const revealFocusedElement = (event: FocusEvent) => {
      const element = (event.target as HTMLElement).closest<HTMLElement>("[data-reveal]");
      if (!element) return;
      element.classList.add("is-visible");
      observer.unobserve(element);
    };

    elements.forEach((element) => {
      if (element.getBoundingClientRect().top <= window.innerHeight * 0.95) {
        element.classList.add("is-visible");
        return;
      }
      element.classList.add("reveal-pending");
      observer.observe(element);
    });
    document.addEventListener("focusin", revealFocusedElement);

    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", revealFocusedElement);
    };
  }, [pathname]);

  return null;
}
