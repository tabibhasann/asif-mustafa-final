import { defineField, defineType } from "sanity";

export const story = defineType({
  name: "story",
  title: "Story",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "category", type: "string" }),
    defineField({ name: "excerpt", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageAlt", title: "Image description", type: "string", description: "Describe the image for visitors using screen readers." }),
    defineField({ name: "fallbackImage", title: "Fallback image path", type: "string", description: "Example: /images/fieldwork.jpg" }),
    defineField({ name: "stack", title: "Methods and context", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featured", title: "Feature on homepage", type: "boolean", initialValue: false }),
    defineField({ name: "intro", title: "Opening paragraph", type: "text", rows: 4 }),
    defineField({
      name: "sections",
      type: "array",
      of: [{ type: "object", fields: [defineField({ name: "title", type: "string" }), defineField({ name: "body", type: "text", rows: 6 })] }],
    }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 10 }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});
