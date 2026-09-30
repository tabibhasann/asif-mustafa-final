import assert from "node:assert/strict";
import test from "node:test";
import { formatArticleDate } from "../lib/article-date";

test("publication dates use a readable UTC date", () => {
  assert.equal(formatArticleDate("2026-08-31T23:30:00Z"), "31 August 2026");
});

test("custom display dates remain editable", () => {
  assert.equal(formatArticleDate("2026-08-31", " Autumn 2026 "), "Autumn 2026");
});

test("legacy placeholder labels give way to publication dates", () => {
  assert.equal(formatArticleDate("2026-08-31", "Editorial note"), "31 August 2026");
});

test("missing or invalid dates do not create misleading metadata", () => {
  assert.equal(formatArticleDate(), "");
  assert.equal(formatArticleDate("invalid", "Editorial note"), "");
});
