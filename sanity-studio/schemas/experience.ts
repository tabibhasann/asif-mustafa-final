import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "organization", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "organization" }, validation: (rule) => rule.required() }),
    defineField({ name: "period", type: "string" }),
    defineField({ name: "engagement", title: "Engagement type", type: "string" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "impacts", title: "Selected contributions (maximum 3)", type: "array", of: [{ type: "text", rows: 2 }], validation: (rule) => rule.max(3) }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 10 }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "organization", subtitle: "role" } },
});
