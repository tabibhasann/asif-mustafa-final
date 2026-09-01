import { defineField, defineType } from "sanity";

export const publication = defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "venue", type: "string" }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "type", type: "string", options: { list: ["Journal article", "Conference paper", "Dataset"] } }),
    defineField({ name: "status", type: "string", options: { list: ["Published", "Conference", "Dataset"] } }),
    defineField({ name: "keywords", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "href", title: "Publication URL", type: "url" }),
  ],
  orderings: [{ title: "Newest first", name: "yearDesc", by: [{ field: "year", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "venue" } },
});
