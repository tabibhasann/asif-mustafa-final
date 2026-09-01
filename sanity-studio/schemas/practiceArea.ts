import { defineField, defineType } from "sanity";

export const practiceArea = defineType({
  name: "practiceArea",
  title: "Practice Area",
  type: "document",
  fields: [
    defineField({ name: "number", title: "Display number", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "capabilities", type: "array", of: [{ type: "string" }] }),
  ],
  orderings: [{ title: "Display order", name: "numberAsc", by: [{ field: "number", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "number" } },
});
