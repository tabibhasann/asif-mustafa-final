import { defineField } from "sanity";

export const richContentOf = [
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
      annotations: [{
        name: "link", title: "Link", type: "object",
        fields: [defineField({
          name: "href", title: "URL", type: "url",
          validation: (rule) => rule.required().uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
        })],
      }],
    },
  },
  {
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({ name: "alt", title: "Image description", type: "string", validation: (rule) => rule.required() }),
      defineField({ name: "caption", type: "string" }),
      defineField({ name: "figureType", title: "Visual type", type: "string", options: { list: ["Image", "Graph", "Chart"] }, initialValue: "Image" }),
    ],
  },
  {
    type: "object", name: "videoEmbed", title: "YouTube or Vimeo video",
    fields: [
      defineField({ name: "url", title: "Video URL", type: "url", validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }) }),
      defineField({ name: "title", title: "Accessible title", type: "string", validation: (rule) => rule.required() }),
      defineField({ name: "caption", type: "string" }),
      defineField({ name: "transcript", title: "Transcript (optional)", type: "text", rows: 5, description: "Provide a text alternative for spoken content." }),
    ],
    preview: { select: { title: "title", subtitle: "url" } },
  },
  {
    type: "object", name: "videoFile", title: "Uploaded MP4 video",
    fields: [
      defineField({ name: "file", title: "MP4 file", type: "file", options: { accept: "video/mp4" }, validation: (rule) => rule.required() }),
      defineField({ name: "title", title: "Accessible title", type: "string", validation: (rule) => rule.required() }),
      defineField({ name: "caption", type: "string" }),
      defineField({ name: "captions", title: "Captions (WebVTT)", type: "file", options: { accept: ".vtt,text/vtt" }, description: "Optional captions file for accessibility." }),
      defineField({ name: "captionsLanguage", title: "Captions language code", type: "string", description: "BCP 47 language code for the WebVTT file, such as en or bn.", validation: (rule) => rule.custom((value, context) => {
        const hasCaptions = Boolean((context.parent as { captions?: unknown } | undefined)?.captions);
        return !hasCaptions || (typeof value === "string" && /^[a-z]{2,3}(?:-[A-Za-z0-9]+)*$/.test(value)) ? true : "Enter the language code for the captions file.";
      }) }),
      defineField({ name: "transcript", title: "Transcript (optional)", type: "text", rows: 5, description: "Provide a text alternative for spoken content." }),
    ],
    preview: { select: { title: "title" } },
  },
];
