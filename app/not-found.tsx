import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="not-found shell">
      <p className="eyebrow">404 · Page not found</p>
      <h1>The requested record could not be found.</h1>
      <p>The page may have moved or no longer exists.</p>
      <Link className="button button-navy" href="/" prefetch={false}>Return to the homepage</Link>
    </section>
  );
}
