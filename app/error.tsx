"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="not-found shell" role="alert">
      <div>
        <p className="eyebrow">Unable to load this page</p>
        <h1>Something interrupted the request.</h1>
        <p>The content is still available to retry, or you can return to the homepage.</p>
        <div className="button-row error-actions">
          <button className="button button-navy" type="button" onClick={reset}>Try again</button>
          <Link className="button button-ghost" href="/">Return home</Link>
        </div>
      </div>
    </section>
  );
}
