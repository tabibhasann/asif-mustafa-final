import { getCliClient } from "sanity/cli";
import {
  credentials,
  experiences,
  insights,
  practiceAreas,
  profile,
  projects,
  publications,
  siteSettings,
  stories,
} from "../../lib/content.ts";

const client = getCliClient({ apiVersion: "2026-09-01" });

const slug = (current) => ({ _type: "slug", current });
const keyedObject = (value, key) => ({ ...value, _key: key, _type: "object" });
const object = (value) => ({ ...value, _type: "object" });
const textBlock = (text, style, key) => ({
  _key: key,
  _type: "block",
  style,
  markDefs: [],
  children: [{ _key: `${key}-span`, _type: "span", marks: [], text }],
});

const { heroImage: _fallbackHeroImage, ...editableHome } = siteSettings.home;
const { socialImage: _fallbackSocialImage, ...editableSeo } = siteSettings.seo;
const editablePages = Object.fromEntries(
  Object.entries(siteSettings.pages).map(([key, value]) => [key, object(value)]),
);

const documents = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    seo: object(editableSeo),
    home: object(editableHome),
    pages: object(editablePages),
    about: object({
      ...siteSettings.about,
      principles: siteSettings.about.principles.map((item, index) =>
        keyedObject(item, `principle-${index + 1}`),
      ),
    }),
    footer: object(siteSettings.footer),
  },
  {
    ...profile,
    _id: "profile",
    _type: "profile",
    metrics: profile.metrics.map((item, index) => keyedObject(item, `metric-${index + 1}`)),
    education: profile.education.map((item, index) => keyedObject(item, `education-${index + 1}`)),
  },
  ...practiceAreas.map(({ slug: current, ...item }) => ({
    ...item,
    _id: `practice-area-${current}`,
    _type: "practiceArea",
    slug: slug(current),
  })),
  ...experiences.map(({ slug: current, ...item }, index) => ({
    ...item,
    _id: `experience-${current}`,
    _type: "experience",
    slug: slug(current),
    order: index + 1,
  })),
  ...projects.map(({ slug: current, image, ...item }, index) => ({
    ...item,
    _id: `project-${current}`,
    _type: "project",
    slug: slug(current),
    fallbackImage: image,
    imageAlt: item.imageAlt ?? item.title,
    order: index + 1,
  })),
  ...publications.map((item, index) => ({
    ...item,
    _id: `publication-${index + 1}`,
    _type: "publication",
  })),
  ...stories.map(({ slug: current, image, sections, ...item }, index) => ({
    ...item,
    _id: `story-${current}`,
    _type: "story",
    slug: slug(current),
    fallbackImage: image,
    imageAlt: item.imageAlt ?? item.title,
    featured: item.featured ?? index < 4,
    order: index + 1,
    sections: sections.map((section, sectionIndex) =>
      keyedObject(section, `section-${sectionIndex + 1}`),
    ),
  })),
  ...insights.map(({ slug: current, image, date, body, ...item }, index) => ({
    ...item,
    _id: `insight-${current}`,
    _type: "insight",
    slug: slug(current),
    dateLabel: date,
    fallbackImage: image,
    imageAlt: item.imageAlt ?? item.title,
    content: body.flatMap((section, sectionIndex) => [
      textBlock(section.title, "h2", `section-${sectionIndex + 1}-title`),
      ...section.paragraphs.map((paragraph, paragraphIndex) =>
        textBlock(paragraph, "normal", `section-${sectionIndex + 1}-paragraph-${paragraphIndex + 1}`),
      ),
    ]),
    publishedAt: new Date(Date.UTC(2026, 7, 31 - index)).toISOString(),
  })),
  ...credentials.map((item, index) => ({
    ...item,
    _id: `credential-${index + 1}`,
    _type: "credential",
    order: index + 1,
  })),
];

let transaction = client.transaction();
for (const document of documents) {
  transaction = transaction.createIfNotExists(document);
}

const result = await transaction.commit({ visibility: "async" });
console.log(`Seeded ${documents.length} editable documents into ${client.config().dataset}.`);
console.log(`Transaction: ${result.transactionId}`);
