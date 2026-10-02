import assert from "node:assert/strict";
import test from "node:test";
import { estimateReadingTime } from "../lib/reading-time";

test("short articles are not presented as four or five minute reads", () => {
  assert.equal(estimateReadingTime({ body: [{ title: "Evidence", paragraphs: ["A short article about practical research."] }] }), "1 min read");
});

test("rich content replaces legacy text in the estimate", () => {
  assert.equal(estimateReadingTime({
    content: [{ _type: "block", children: [{ text: "word ".repeat(401) }] }],
    intro: "old ".repeat(1000),
  }), "3 min read");
});

test("media-only stories do not receive invented reading times", () => {
  assert.equal(estimateReadingTime({ content: [{ _type: "image" }] }), "");
  assert.equal(estimateReadingTime({}), "");
});

test("legacy story introductions and sections are included", () => {
  assert.equal(estimateReadingTime({ intro: "word ".repeat(150), sections: [{ title: "Findings", body: "word ".repeat(150) }] }), "2 min read");
});
