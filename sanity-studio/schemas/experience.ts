import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "organization", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "organization" }, validation: (rule) => rule.required() }),
    defineField({ name: "period", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "engagement", title: "Engagement type", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "projectValue", title: "Programme or project value", type: "string", description: "Optional; use only when the value is approved for publication." }),
    defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "impacts", title: "Selected contributions (maximum 3)", type: "array", of: [{ type: "text", rows: 2 }], validation: (rule) => rule.required().min(1).max(3) }),
    defineField({ name: "contribution", title: "Contribution summary", type: "text", rows: 3, description: "Optional short account of your own work and responsibilities." }),
    defineField({ name: "result", title: "Verified result or impact", type: "text", rows: 3, description: "Optional. Describe a demonstrated result separately from activities or responsibilities." }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 10, validation: (rule) => rule.required() }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "organization", subtitle: "role" } },
});
