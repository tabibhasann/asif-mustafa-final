import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Primary category", type: "string", description: "Keep the archive to roughly 7 or 8 clear categories.", validation: (rule) => rule.required() }),
    defineField({ name: "categories", title: "All categories", type: "array", of: [{ type: "string" }], options: { layout: "tags" }, validation: (rule) => rule.required().min(1) }),
    defineField({ name: "summary", type: "text", rows: 3, validation: (rule) => rule.required().max(280) }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageAlt", title: "Image description", type: "string", description: "Describe the image for visitors using screen readers." }),
    defineField({ name: "fallbackImage", title: "Fallback image path", type: "string", hidden: true, readOnly: true }),
    defineField({ name: "stack", title: "Methods and technology", type: "array", of: [{ type: "string" }], validation: (rule) => rule.required().min(1).max(8) }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "status", title: "Project status", type: "string", description: "Optional. Defaults to ‘Selected portfolio work’ on the website." }),
    defineField({ name: "context", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "challenge", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "approach", type: "array", of: [{ type: "text", rows: 2 }], validation: (rule) => rule.required().min(1) }),
    defineField({ name: "outcome", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "detailLabels", title: "Detail section labels", type: "object", description: "Optional small labels above each section. Leave blank for website defaults.", fields: [
      defineField({ name: "context", type: "string" }), defineField({ name: "challenge", type: "string" }),
      defineField({ name: "approach", type: "string" }), defineField({ name: "outcome", type: "string" }),
    ] }),
    defineField({ name: "detailHeadings", title: "Detail section headings", type: "object", description: "Optional large headings. Leave blank for website defaults.", fields: [
      defineField({ name: "context", type: "string" }), defineField({ name: "challenge", type: "string" }),
      defineField({ name: "approach", type: "string" }), defineField({ name: "outcome", type: "string" }),
    ] }),
    defineField({ name: "recordLabels", title: "Project record labels", type: "object", description: "Optional heading and field labels in the project sidebar. Leave blank for website defaults.", fields: [
      defineField({ name: "heading", title: "Record heading", type: "string" }),
      defineField({ name: "primaryField", title: "Primary field label", type: "string" }),
      defineField({ name: "connectedFields", title: "Connected fields label", type: "string" }),
      defineField({ name: "status", title: "Status label", type: "string" }),
    ] }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 10, validation: (rule) => rule.required() }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});
