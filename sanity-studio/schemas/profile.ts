import { defineField, defineType } from "sanity";

export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "shortName", title: "Short name", type: "string" }),
    defineField({ name: "role", title: "Professional role line", type: "string" }),
    defineField({ name: "headline", title: "Homepage headline", type: "string" }),
    defineField({ name: "introduction", title: "Short introduction", type: "text", rows: 4 }),
    defineField({ name: "portrait", title: "Professional portrait", type: "image", options: { hotspot: true } }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "email", type: "email" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "scholar", title: "Google Scholar URL", type: "url" }),
    defineField({ name: "github", title: "GitHub URL", type: "url" }),
    defineField({ name: "biography", title: "Biography paragraphs", type: "array", of: [{ type: "text", rows: 5 }] }),
    defineField({
      name: "metrics",
      title: "Profile highlights",
      type: "array",
      of: [{ type: "object", fields: [defineField({ name: "value", type: "string" }), defineField({ name: "label", type: "string" })] }],
    }),
    defineField({
      name: "education",
      type: "array",
      of: [{ type: "object", fields: [
        defineField({ name: "degree", type: "string" }),
        defineField({ name: "institution", type: "string" }),
        defineField({ name: "note", type: "text", rows: 2 }),
      ] }],
    }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "portrait" } },
});
