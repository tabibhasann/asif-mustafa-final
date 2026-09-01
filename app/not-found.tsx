import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found shell">
      <p className="eyebrow">404 · Page not found</p>
      <h1>The requested record could not be found.</h1>
      <p>It may have moved, or the content may still be awaiting publication.</p>
      <Link className="button button-navy" href="/">Return to the homepage</Link>
    </section>
  );
}
