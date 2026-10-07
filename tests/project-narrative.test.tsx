import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ProjectNarrative } from "../components/ProjectNarrative";

test("project narrative preserves content order and editable headings", () => {
  const html = renderToStaticMarkup(<ProjectNarrative project={{
    context: "Research context.",
    approach: ["First method.", "Second method."],
    outcome: "Observed result.",
    detailLabels: { context: "Background" },
    detailHeadings: { approach: "Methods used" },
  }} />);
  assert.match(html, />Background<\/p>/);
  assert.match(html, /<h2>Methods used<\/h2>/);
  assert.equal((html.match(/<h2>/g) ?? []).length, 3);
  assert.equal((html.match(/<li>/g) ?? []).length, 2);
  assert.ok(html.indexOf("Research context.") < html.indexOf("First method."));
  assert.ok(html.indexOf("Second method.") < html.indexOf("Observed result."));
});

test("project narrative omits empty optional sections without empty headings or lists", () => {
  const html = renderToStaticMarkup(<ProjectNarrative project={{context: "", approach: [], outcome: ""}} />);
  assert.equal(html, "");
});

test("project narrative treats client text as text, not markup", () => {
  const html = renderToStaticMarkup(<ProjectNarrative project={{
    context: "<script>alert('test')</script>", approach: [], outcome: "",
  }} />);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /&lt;script&gt;/);
});
