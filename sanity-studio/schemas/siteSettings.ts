import { defineField, defineType } from "sanity";

const textField = (
  name: string,
  title: string,
  rows = 2,
  options: { hidden?: boolean; readOnly?: boolean; description?: string } = {},
) => defineField({ name, title, type: "text", rows, ...options });

// Keep legacy keys so earlier editions and stored documents remain compatible.
const archivedCopy = {
  hidden: true,
  readOnly: true,
  description: "Retained for earlier editions; not displayed in the client-required website.",
};

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
      description: "Edit the homepage labels, headings, images and link text here. The main headline, introduction, portrait, biography and profile highlights are in Profile. Layout, spacing and button destinations are managed in the website code.",
      fields: [
        defineField({ name: "heroEyebrow", title: "Hero role line", type: "string" }),
        defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),
        defineField({ name: "heroImageAlt", title: "Hero image description", type: "string", ...archivedCopy }),
        defineField({ name: "heroImageLabel", title: "Hero image caption", type: "string" }),
        defineField({ name: "heroPrimaryCta", title: "Primary button label", type: "string" }),
        defineField({ name: "heroSecondaryCta", title: "Secondary link label", type: "string" }),
        defineField({ name: "profileEyebrow", title: "Profile label", type: "string" }),
        defineField({ name: "profileTitle", title: "Profile heading", type: "string" }),
        defineField({ name: "practiceEyebrow", title: "Practice label", type: "string" }),
        defineField({ name: "practiceTitle", title: "Practice heading", type: "string" }),
        textField("practiceIntro", "Practice introduction", 2, archivedCopy),
        defineField({ name: "practiceAction", title: "Practice archive link", type: "string" }),
        defineField({ name: "projectsEyebrow", title: "Projects label", type: "string" }),
        defineField({ name: "projectsTitle", title: "Projects heading", type: "string" }),
        textField("projectsIntro", "Projects introduction", 2, archivedCopy),
        defineField({ name: "projectsAction", title: "Projects archive link", type: "string" }),
        defineField({ name: "storiesEyebrow", title: "My Stories label", type: "string" }),
        defineField({ name: "storiesTitle", title: "My Stories heading", type: "string" }),
        textField("storiesIntro", "Stories introduction", 2, archivedCopy),
        defineField({ name: "storiesAction", title: "My Stories archive link", type: "string" }),
        defineField({ name: "publicationsEyebrow", title: "Publications label", type: "string" }),
        defineField({ name: "publicationsTitle", title: "Publications heading", type: "string" }),
        textField("publicationsIntro", "Publications introduction", 2, archivedCopy),
        defineField({ name: "publicationsAction", title: "Publications archive link", type: "string" }),
        defineField({ name: "insightsEyebrow", title: "Homepage blog section label", type: "string" }),
        defineField({ name: "insightsTitle", title: "Homepage blog section heading", type: "string" }),
        textField("insightsIntro", "Insights introduction", 2, archivedCopy),
        defineField({ name: "insightsAction", title: "Blogs archive link", type: "string", description: "Text of the homepage link to Blogs. The Insights hub has a separate page introduction below." }),
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
        pageIntro("stories", "My Stories"),
        pageIntro("insights", "Insights hub"),
        pageIntro("blogs", "Blogs"),
        pageIntro("credentials", "Credentials"),
      ],
    }),
    defineField({
      name: "about",
      title: "About page sections",
      type: "object",
      group: "about",
      description: "Headings for the About-page profile, education and certifications. Biography, portrait and degrees are in Profile; certification records are in Professional Certifications.",
      fields: [
        defineField({ name: "profileEyebrow", title: "Profile label", type: "string" }),
        defineField({ name: "profileTitle", title: "Profile heading", type: "string" }),
        defineField({ name: "educationEyebrow", title: "Education label", type: "string" }),
        defineField({ name: "educationTitle", title: "Education heading", type: "string" }),
        textField("educationIntro", "Education introduction"),
        defineField({ name: "relevantCoursesLabel", title: "Relevant courses label", type: "string" }),
        defineField({ name: "certificationsEyebrow", title: "Certifications label", type: "string" }),
        defineField({ name: "certificationsTitle", title: "Certifications heading", type: "string" }),
        textField("certificationsIntro", "Certifications introduction"),
        defineField({ name: "principlesEyebrow", title: "Professional approach label", type: "string", ...archivedCopy }),
        defineField({ name: "principlesTitle", title: "Professional approach heading", type: "string", ...archivedCopy }),
        textField("principlesIntro", "Professional approach introduction", 2, archivedCopy),
        defineField({
          name: "principles",
          title: "Professional approach points",
          type: "array",
          ...archivedCopy,
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
