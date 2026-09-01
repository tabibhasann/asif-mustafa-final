import { defineField, defineType } from "sanity";

export const insight = defineType({
  name: "insight",
  title: "Insight / Blog Article",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "category", type: "string" }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "dateLabel", title: "Optional display date", type: "string" }),
    defineField({ name: "readingTime", title: "Reading time", type: "string" }),
    defineField({ name: "excerpt", type: "text", rows: 3 }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "fallbackImage", title: "Fallback image path", type: "string", description: "Example: /images/data-systems.jpg" }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({
      name: "body",
      title: "Article sections",
      type: "array",
      of: [{ type: "object", fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "paragraphs", type: "array", of: [{ type: "text", rows: 5 }] }),
      ] }],
    }),
  ],
  orderings: [{ title: "Newest first", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});
