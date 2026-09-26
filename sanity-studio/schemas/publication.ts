import { defineField, defineType } from "sanity";

export const publication = defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "venue", type: "string", validation: (rule) => rule.custom((value, context) => {
      const status = context.document?.status;
      return (status === "Published" || status === "In press") && !(typeof value === "string" && value.trim())
        ? "Venue is required for Published and In press publications."
        : true;
    }) }),
    defineField({ name: "year", type: "string", validation: (rule) => rule.custom((value, context) => {
      const status = context.document?.status;
      return (status === "Published" || status === "In press") && !(typeof value === "string" && value.trim())
        ? "Year is required for Published and In press publications."
        : true;
    }) }),
    defineField({ name: "type", type: "string", options: { list: ["Journal article", "Conference paper", "Dataset", "Book chapter", "Working paper"] }, validation: (rule) => rule.required() }),
    defineField({ name: "status", type: "string", description: "Publication stage, separate from the publication type. Existing Conference and Dataset statuses display as Published until migrated.", options: { list: ["Published", "In press", "Under review", "Under submission", "Submitted", "Ongoing"] }, validation: (rule) => rule.required() }),
    defineField({ name: "keywords", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "href", title: "Publication URL", type: "url" }),
  ],
  orderings: [{ title: "Newest first", name: "yearDesc", by: [{ field: "year", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "venue" } },
});
