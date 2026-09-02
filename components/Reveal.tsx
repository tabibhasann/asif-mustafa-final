import type { ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`reveal is-visible ${className}`.trim()}
      style={{ animationDelay: `${Math.min(delay, 180)}ms` }}
    >
      {children}
    </div>
  );
}
