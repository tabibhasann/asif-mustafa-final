import { defineField, defineType } from "sanity";

const categories = ["Data Systems", "NLP & Search", "Machine Learning", "Streaming Analytics", "Supply Chain", "Business Intelligence", "Cloud Data"];

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Primary category", type: "string", options: { list: categories }, validation: (rule) => rule.required() }),
    defineField({ name: "categories", title: "All categories", type: "array", of: [{ type: "string", options: { list: categories } }] }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "fallbackImage", title: "Fallback image path", type: "string", description: "Example: /images/data-systems.jpg" }),
    defineField({ name: "stack", title: "Methods and technology", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "context", type: "text", rows: 4 }),
    defineField({ name: "challenge", type: "text", rows: 4 }),
    defineField({ name: "approach", type: "array", of: [{ type: "text", rows: 2 }] }),
    defineField({ name: "outcome", type: "text", rows: 4 }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 10 }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});
