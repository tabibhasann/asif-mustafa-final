import assert from "node:assert/strict";
import { test } from "node:test";
import { normalizeNavigationPathname } from "../lib/site";

test("homepage navigation is consistent between Vercel prerendering and the public URL", () => {
  assert.equal(normalizeNavigationPathname("/index"), "/");
  assert.equal(normalizeNavigationPathname("/"), "/");
});

test("navigation preserves other page and detail paths", () => {
  for (const pathname of ["/about", "/projects", "/projects/index", "/blogs/evidence-before-automation", "/stories/fieldwork"]) {
    assert.equal(normalizeNavigationPathname(pathname), pathname);
  }
});
