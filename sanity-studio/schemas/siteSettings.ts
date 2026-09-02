import { defineField, defineType } from "sanity";

const textField = (name: string, title: string, rows = 2) =>
  defineField({ name, title, type: "text", rows });

const introFields = [
  defineField({ name: "eyebrow", title: "Small label", type: "string" }),
  defineField({ name: "title", title: "Page title", type: "string" }),
  textField("intro", "Short introduction", 2),
];

const pageIntro = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    options: { collapsible: true, collapsed: true },
    fields: introFields,
  });

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Website Copy & Homepage",
  type: "document",
  groups: [
    { name: "home", title: "Homepage", default: true },
    { name: "seo", title: "Search & sharing" },
    { name: "pages", title: "Page introductions" },
    { name: "about", title: "About page" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "seo",
      title: "Search and social sharing",
      type: "object",
      group: "seo",
      fields: [
        defineField({ name: "title", title: "Default search title", type: "string", validation: (rule) => rule.required().max(65) }),
        textField("description", "Default search description", 3),
        defineField({ name: "socialImage", title: "Social sharing image", type: "image" }),
        defineField({ name: "socialImageAlt", title: "Social image description", type: "string" }),
      ],
    }),
    defineField({
      name: "home",
      title: "Homepage sections",
      type: "object",
      group: "home",
      fields: [
        defineField({ name: "heroEyebrow", title: "Hero role line", type: "string" }),
        defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),
        defineField({ name: "heroImageAlt", title: "Hero image description", type: "string", description: "Describe the image for visitors using screen readers." }),
        defineField({ name: "heroImageLabel", title: "Hero image caption", type: "string" }),
        defineField({ name: "heroPrimaryCta", title: "Primary button label", type: "string" }),
        defineField({ name: "heroSecondaryCta", title: "Secondary link label", type: "string" }),
        defineField({ name: "profileEyebrow", title: "Profile label", type: "string" }),
        defineField({ name: "profileTitle", title: "Profile heading", type: "string" }),
        defineField({ name: "practiceEyebrow", title: "Practice label", type: "string" }),
        defineField({ name: "practiceTitle", title: "Practice heading", type: "string" }),
        textField("practiceIntro", "Practice introduction"),
        defineField({ name: "practiceAction", title: "Practice archive link", type: "string" }),
        defineField({ name: "projectsEyebrow", title: "Projects label", type: "string" }),
        defineField({ name: "projectsTitle", title: "Projects heading", type: "string" }),
        textField("projectsIntro", "Projects introduction"),
        defineField({ name: "projectsAction", title: "Projects archive link", type: "string" }),
        defineField({ name: "storiesEyebrow", title: "Stories label", type: "string" }),
        defineField({ name: "storiesTitle", title: "Stories heading", type: "string" }),
        textField("storiesIntro", "Stories introduction"),
        defineField({ name: "storiesAction", title: "Stories archive link", type: "string" }),
        defineField({ name: "publicationsEyebrow", title: "Publications label", type: "string" }),
        defineField({ name: "publicationsTitle", title: "Publications heading", type: "string" }),
        textField("publicationsIntro", "Publications introduction"),
        defineField({ name: "publicationsAction", title: "Publications archive link", type: "string" }),
        defineField({ name: "insightsEyebrow", title: "Insights label", type: "string" }),
        defineField({ name: "insightsTitle", title: "Insights heading", type: "string" }),
        textField("insightsIntro", "Insights introduction"),
        defineField({ name: "insightsAction", title: "Insights archive link", type: "string" }),
        defineField({ name: "contextEyebrow", title: "Context label", type: "string" }),
        defineField({ name: "contextTitle", title: "Context heading", type: "string" }),
        defineField({ name: "contexts", title: "Contexts of work", type: "array", of: [{ type: "string" }], validation: (rule) => rule.max(8) }),
        defineField({ name: "venuesLabel", title: "Scholarly venues label", type: "string" }),
        defineField({ name: "scholarlyVenues", title: "Selected scholarly venues", type: "array", of: [{ type: "string" }], validation: (rule) => rule.max(8) }),
      ],
    }),
    defineField({
      name: "pages",
      title: "Page introductions",
      type: "object",
      group: "pages",
      fields: [
        pageIntro("about", "About"),
        pageIntro("practice", "Practice"),
        pageIntro("experience", "Experience"),
        pageIntro("projects", "Projects"),
        pageIntro("publications", "Publications"),
        pageIntro("stories", "Field stories"),
        pageIntro("insights", "Insights"),
        pageIntro("credentials", "Credentials"),
      ],
    }),
    defineField({
      name: "about",
      title: "About page sections",
      type: "object",
      group: "about",
      fields: [
        defineField({ name: "profileEyebrow", title: "Profile label", type: "string" }),
        defineField({ name: "profileTitle", title: "Profile heading", type: "string" }),
        defineField({ name: "educationEyebrow", title: "Education label", type: "string" }),
        defineField({ name: "educationTitle", title: "Education heading", type: "string" }),
        textField("educationIntro", "Education introduction"),
        defineField({ name: "principlesEyebrow", title: "Principles label", type: "string" }),
        defineField({ name: "principlesTitle", title: "Principles heading", type: "string" }),
        textField("principlesIntro", "Principles introduction"),
        defineField({
          name: "principles",
          title: "Working principles",
          type: "array",
          validation: (rule) => rule.max(4),
          of: [{
            type: "object",
            fields: [
              defineField({ name: "title", type: "string" }),
              textField("text", "Explanation", 3),
            ],
            preview: { select: { title: "title", subtitle: "text" } },
          }],
        }),
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer and contact prompt",
      type: "object",
      group: "footer",
      fields: [
        defineField({ name: "eyebrow", title: "Contact label", type: "string" }),
        defineField({ name: "title", title: "Contact heading", type: "string" }),
        textField("summary", "Short professional summary"),
        defineField({ name: "primaryCta", title: "Primary button label", type: "string" }),
        defineField({ name: "secondaryCta", title: "Secondary button label", type: "string" }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Website Copy & Homepage", subtitle: "Global headings, introductions and footer" }),
  },
});
