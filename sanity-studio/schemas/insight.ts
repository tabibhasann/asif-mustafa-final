import { defineField, defineType } from "sanity";

export const insight = defineType({
  name: "insight",
  title: "Insight / Blog Article",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "category", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "publishedAt", type: "datetime", validation: (rule) => rule.required() }),
    defineField({ name: "dateLabel", title: "Optional display date", type: "string" }),
    defineField({ name: "readingTime", title: "Reading time", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", type: "text", rows: 3, validation: (rule) => rule.required().max(280) }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageAlt", title: "Image description", type: "string", description: "Describe the image for visitors using screen readers." }),
    defineField({ name: "fallbackImage", title: "Fallback image path", type: "string", hidden: true, readOnly: true }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({
      name: "content",
      title: "Article content",
      description: "Use headings, paragraphs, lists, links, quotations and images to build the article.",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quotation", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) => rule.required().uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
                  }),
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Image description", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "caption", type: "string" }),
          ],
        },
      ],
      validation: (rule) => rule.custom((content, context) => {
        const legacySections = (context.parent as { body?: unknown[] } | undefined)?.body;
        return (Array.isArray(content) && content.length > 0) || (Array.isArray(legacySections) && legacySections.length > 0)
          ? true
          : "Add article content or at least one legacy article section.";
      }),
    }),
    defineField({
      name: "body",
      title: "Legacy article sections",
      description: "Existing articles use these sections. New articles should use Article content above.",
      hidden: ({ parent }) => Array.isArray(parent?.content) && parent.content.length > 0,
      type: "array",
      of: [{ type: "object", fields: [
        defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "paragraphs", type: "array", of: [{ type: "text", rows: 5 }], validation: (rule) => rule.required().min(1) }),
      ] }],
    }),
  ],
  orderings: [{ title: "Newest first", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});
