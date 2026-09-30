import { defineField, defineType } from "sanity";

export const credential = defineType({
  name: "credential",
  title: "Professional Certification",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "issuer", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "area", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "year", title: "Year awarded", type: "string" }),
    defineField({ name: "credentialId", title: "Credential ID", type: "string" }),
    defineField({ name: "href", title: "Verification URL", type: "url" }),
    defineField({ name: "stack", title: "Technology and skills", type: "array", of: [{ type: "string" }], options: { layout: "tags" }, description: "Optional technologies or skills covered by this certification." }),
    defineField({ name: "courseInfo", title: "Course information", type: "text", rows: 3, description: "Optional brief explanation of the verified course content." }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 10, validation: (rule) => rule.required() }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "issuer" } },
});
