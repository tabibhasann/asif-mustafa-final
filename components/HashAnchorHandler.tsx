"use client";

import { useEffect } from "react";

export function HashAnchorHandler() {
  useEffect(() => {
    const moveToHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      const root = document.documentElement;
      const inlineScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      target.scrollIntoView({ block: "start" });
      target.focus({ preventScroll: true });
      root.style.scrollBehavior = inlineScrollBehavior;
    };

    moveToHash();
    const frame = window.requestAnimationFrame(moveToHash);
    window.addEventListener("hashchange", moveToHash);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", moveToHash);
    };
  }, []);

  return null;
}
