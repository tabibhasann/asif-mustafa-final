import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { HomeStoryPreview } from "../components/HomeStoryPreview";
import type { StoryPreview } from "../lib/content";

const stories: StoryPreview[] = Array.from({ length: 4 }, (_, index) => ({
  slug: `story-${index + 1}`,
  title: `Field story ${index + 1}`,
  category: "Field research",
  excerpt: `An introduction to field story ${index + 1}.`,
  image: "/images/fieldwork.jpg",
  stack: ["Research"],
}));

function render(storyPreviews: StoryPreview[]) {
  return renderToStaticMarkup(
    <ImageConfigContext.Provider value={{ ...imageConfigDefault, qualities: [60, 70, 75] }}>
      <HomeStoryPreview stories={storyPreviews} />
    </ImageConfigContext.Provider>,
  );
}

test("homepage stories preserve input order with one accessible link per entry", () => {
  const html = render(stories);

  assert.equal((html.match(/<li class="home-story-entry"/g) ?? []).length, 4);
  assert.equal((html.match(/<a /g) ?? []).length, 4);
  assert.equal((html.match(/<h3>/g) ?? []).length, 4);
  assert.equal((html.match(/alt=""/g) ?? []).length, 4);
  assert.doesNotMatch(html, /data-reveal|editorial-card/);
  assert.doesNotMatch(html, /<a\b[^>]*>(?:(?!<\/a>)[\s\S])*<a\b/);

  for (const [index, story] of stories.entries()) {
    assert.match(html, new RegExp(`href="/stories/${story.slug}"`));
    assert.match(html, new RegExp(`<h3>${story.title}</h3>`));
    if (index > 0) {
      assert.ok(html.indexOf(stories[index - 1].title) < html.indexOf(story.title));
    }
  }
});

test("homepage stories omit unavailable images and optional copy cleanly", () => {
  const html = render([{ ...stories[0], image: "", category: "", excerpt: "" }]);

  assert.match(html, /home-story-link-text-only/);
  assert.match(html, /Read the story/);
  assert.doesNotMatch(html, /<img|<p|home-story-media/);
});

test("empty homepage stories do not render an empty list", () => {
  assert.equal(render([]), "");
});
