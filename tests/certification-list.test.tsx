import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { CertificationList } from "../components/CertificationList";
import type { Credential } from "../lib/content";

const credential: Credential = {
  title:
    "Professional Certificate in Applied Data Science and Industrial Analytics",
  issuer: "Example University",
  area: "Data science",
};

test("certifications omit empty optional fields and support page-level headings", () => {
  const html = renderToStaticMarkup(
    <CertificationList credentials={[credential]} headingLevel="h2" />,
  );
  assert.match(html, /<h2>Professional Certificate/);
  assert.doesNotMatch(
    html,
    /certification-actions|certification-meta|certification-topics|<a /,
  );
});

test("certification details remain grouped before an accessible verification footer", () => {
  const html = renderToStaticMarkup(
    <CertificationList
      credentials={[
        {
          ...credential,
          year: "2026",
          href: "https://example.com/credentials/123",
          credentialId: "123",
          courseInfo: "Applied methods and practical exercises.",
          stack: ["Statistics", "Python"],
        },
      ]}
    />,
  );
  assert.match(html, /Credential ID: 123/);
  assert.match(html, /Course topics and technologies/);
  assert.match(
    html,
    /target="_blank" rel="noreferrer" aria-label="Verify Professional Certificate[^"<]* in a new tab"/,
  );
  assert.ok(
    html.indexOf("certification-topics") <
      html.indexOf("certification-actions"),
  );
  assert.equal((html.match(/<a /g) ?? []).length, 1);
});

test("certification years do not require a verification link", () => {
  const html = renderToStaticMarkup(
    <CertificationList credentials={[{ ...credential, year: "2026" }]} />,
  );
  assert.match(html, /certification-actions[^>]*><span>2026<\/span>/);
  assert.doesNotMatch(html, /<a /);
});
