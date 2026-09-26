import { defineField, defineType } from "sanity";
import { richContentOf } from "./richContent";

export const story = defineType({
  name: "story",
  title: "My Story",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "category", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", type: "text", rows: 3, validation: (rule) => rule.required().max(280) }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageAlt", title: "Image description", type: "string", description: "Describe the image for visitors using screen readers." }),
    defineField({ name: "fallbackImage", title: "Fallback image path", type: "string", hidden: true, readOnly: true }),
    defineField({ name: "stack", title: "Methods and context", type: "array", of: [{ type: "string" }], validation: (rule) => rule.required().min(1) }),
    defineField({ name: "featured", title: "Feature on homepage", type: "boolean", initialValue: false }),
    defineField({ name: "intro", title: "Legacy opening paragraph", type: "text", rows: 4, description: "Used when rich story content is empty." }),
    defineField({
      name: "content", title: "Story content", type: "array", of: richContentOf,
      description: "Use paragraphs, headings, inline images with captions, graphs, charts, YouTube or Vimeo links, and MP4 uploads. Rich content replaces the legacy opening and sections on the website.",
      validation: (rule) => rule.custom((content, context) => {
        const parent = context.parent as { intro?: string; sections?: unknown[] } | undefined;
        return (Array.isArray(content) && content.length > 0) || (parent?.intro && Array.isArray(parent.sections) && parent.sections.length > 0)
          ? true : "Add rich story content or keep a legacy opening and section.";
      }),
    }),
    defineField({
      name: "sections", title: "Legacy story sections", description: "Existing stories use these sections. New stories should use Story content above.",
      hidden: ({ parent }) => Array.isArray(parent?.content) && parent.content.length > 0,
      type: "array",
      of: [{ type: "object", fields: [defineField({ name: "title", type: "string", validation: (rule) => rule.required() }), defineField({ name: "body", type: "text", rows: 6, validation: (rule) => rule.required() })] }],
    }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 10, validation: (rule) => rule.required() }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});
