import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import type { PortableTextBlock } from "@portabletext/types";
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";

process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "gvgzuc20";
process.env.NEXT_PUBLIC_SANITY_DATASET = "asif";

async function render(blocks: unknown[]) {
  const { PortableArticle } = await import("../components/PortableArticle");
  return renderToStaticMarkup(
    <ImageConfigContext.Provider value={{ ...imageConfigDefault, remotePatterns: [{ hostname: "cdn.sanity.io", protocol: "https" }] }}>
      <PortableArticle value={blocks as PortableTextBlock[]} />
    </ImageConfigContext.Provider>,
  );
}

test("story images and charts retain their aspect ratio and captions", async () => {
  const html = await render([{ _type: "image", _key: "chart", asset: { _type: "reference", _ref: "image-abcdef123456-2000x1000-png" }, alt: "Energy consumption by month", caption: "Monthly energy data", figureType: "Chart" }]);
  assert.match(html, /width="1200" height="600"/);
  assert.match(html, /alt="Energy consumption by month"/);
  assert.match(html, /<figcaption>Monthly energy data<\/figcaption>/);
});

test("YouTube and Vimeo embeds have accessible titles and transcripts", async () => {
  const html = await render([
    { _type: "videoEmbed", _key: "youtube", url: "https://youtu.be/abcdefghijk", title: "Field documentary", transcript: "A transcript of the site visit." },
    { _type: "videoEmbed", _key: "vimeo", url: "https://vimeo.com/123456789", title: "Research interview" },
  ]);
  assert.match(html, /https:\/\/www.youtube-nocookie.com\/embed\/abcdefghijk/);
  assert.match(html, /https:\/\/player.vimeo.com\/video\/123456789/);
  assert.match(html, /title="Field documentary"/);
  assert.match(html, /Read video transcript/);
  assert.match(html, /loading="lazy"/);
});

test("uploaded MP4 files render controls and optional captions", async () => {
  const html = await render([{ _type: "videoFile", _key: "film", url: "https://cdn.sanity.io/files/gvgzuc20/asif/example.mp4", title: "Site documentary", captionsUrl: "https://cdn.sanity.io/files/gvgzuc20/asif/example.vtt", captionsLanguage: "en" }]);
  assert.match(html, /<video[^>]*controls=""/);
  assert.match(html, /preload="none"/);
  assert.match(html, /<track kind="captions"/);
  assert.match(html, /srcLang="en"/);
});

test("untrusted video hosts and unsafe rich-text links are not rendered", async () => {
  const links = ["javascript:alert(1)", "/\\evil.example", "//evil.example"];
  const html = await render([
    { _type: "videoEmbed", _key: "bad-video", url: "https://youtube.com.evil.example/watch?v=abcdefghijk" },
    ...links.map((href, index) => ({ _type: "block", _key: `block-${index}`, style: "normal", markDefs: [{ _type: "link", _key: "link", href }], children: [{ _type: "span", _key: "text", text: "Link text", marks: ["link"] }] })),
  ]);
  assert.doesNotMatch(html, /<iframe|<a /);
  assert.match(html, /Link text/);
});
