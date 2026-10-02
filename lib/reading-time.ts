export type ReadingSource = {
  content?: readonly { _type?: string; children?: readonly { _type?: string; text?: string }[] }[];
  intro?: string;
  sections?: readonly { title: string; body: string }[];
  body?: readonly { title: string; paragraphs: readonly string[] }[];
};

/** Estimate from the text actually rendered, not legacy hand-entered metadata. */
export function estimateReadingTime(source: ReadingSource): string {
  const text = source.content?.length
    ? source.content
        .filter((block) => block._type === "block")
        .map((block) => block.children?.map((span) => span.text ?? "").join(" ") ?? "")
        .join(" ")
    : [
        source.intro,
        ...((source.sections ?? []).map((section) => `${section.title} ${section.body}`)),
        ...((source.body ?? []).flatMap((section) => [section.title, ...section.paragraphs])),
      ].filter(Boolean).join(" ");
  const words = text.trim().match(/\S+/g)?.length ?? 0;
  return words ? `${Math.max(1, Math.ceil(words / 200))} min read` : "";
}
