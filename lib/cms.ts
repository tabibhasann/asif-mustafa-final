import { createClient } from "@sanity/client";
import { cache } from "react";
import {
  credentials as fallbackCredentials,
  experiences as fallbackExperiences,
  insights as fallbackInsights,
  practiceAreas as fallbackPracticeAreas,
  profile as fallbackProfile,
  projects as fallbackProjects,
  publications as fallbackPublications,
  siteSettings as fallbackSiteSettings,
  stories as fallbackStories,
  type Credential,
  type Experience,
  type Insight,
  type PracticeArea,
  type Profile,
  type Project,
  type Publication,
  type SiteSettings,
  type Story,
} from "./content";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-09-01";

const client =
  projectId && dataset
    ? createClient({ projectId, dataset, apiVersion, useCdn: true })
    : null;

async function collectionOrFallback<T>(
  query: string,
  fallback: T[],
): Promise<T[]> {
  if (!client) return fallback;
  try {
    const result = await client.fetch<T[]>(query, {}, { next: { revalidate: 60 } });
    return Array.isArray(result) ? result : fallback;
  } catch {
    return fallback;
  }
}

export const getProfile = cache(async (): Promise<Profile> => {
  if (!client) return fallbackProfile;
  try {
    const result = await client.fetch<Partial<Profile>>(
      `*[_type == "profile"][0]{
        name, shortName, role, location, email, phone, linkedin, scholar, github,
        headline, introduction, "portrait": portrait.asset->url, biography, metrics, education
      }`,
      {},
      { next: { revalidate: 60 } },
    );
    if (!result?.name) return fallbackProfile;
    const definedResult = Object.fromEntries(
      Object.entries(result).filter(([, value]) => value !== null && value !== undefined),
    ) as Partial<Profile>;
    return {
      ...fallbackProfile,
      ...definedResult,
      biography: Array.isArray(result.biography) ? result.biography : fallbackProfile.biography,
      metrics: Array.isArray(result.metrics) ? result.metrics : fallbackProfile.metrics,
      education: Array.isArray(result.education) ? result.education : fallbackProfile.education,
    };
  } catch {
    return fallbackProfile;
  }
});

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!client) return fallbackSiteSettings;
  try {
    const result = await client.fetch<Partial<SiteSettings>>(
      `*[_type == "siteSettings" && _id == "siteSettings"][0]{
        home{..., "heroImage": heroImage.asset->url},
        pages{about, practice, experience, projects, publications, stories, insights, credentials},
        about,
        footer
      }`,
      {},
      { next: { revalidate: 60 } },
    );
    if (!result) return fallbackSiteSettings;
    return {
      home: {
        ...fallbackSiteSettings.home,
        ...result.home,
        heroImage: result.home?.heroImage || fallbackSiteSettings.home.heroImage,
        contexts: Array.isArray(result.home?.contexts) ? result.home.contexts : fallbackSiteSettings.home.contexts,
        scholarlyVenues: Array.isArray(result.home?.scholarlyVenues)
          ? result.home.scholarlyVenues
          : fallbackSiteSettings.home.scholarlyVenues,
      },
      pages: {
        about: { ...fallbackSiteSettings.pages.about, ...result.pages?.about },
        practice: { ...fallbackSiteSettings.pages.practice, ...result.pages?.practice },
        experience: { ...fallbackSiteSettings.pages.experience, ...result.pages?.experience },
        projects: { ...fallbackSiteSettings.pages.projects, ...result.pages?.projects },
        publications: { ...fallbackSiteSettings.pages.publications, ...result.pages?.publications },
        stories: { ...fallbackSiteSettings.pages.stories, ...result.pages?.stories },
        insights: { ...fallbackSiteSettings.pages.insights, ...result.pages?.insights },
        credentials: { ...fallbackSiteSettings.pages.credentials, ...result.pages?.credentials },
      },
      about: {
        ...fallbackSiteSettings.about,
        ...result.about,
        principles: Array.isArray(result.about?.principles)
          ? result.about.principles
          : fallbackSiteSettings.about.principles,
      },
      footer: { ...fallbackSiteSettings.footer, ...result.footer },
    };
  } catch {
    return fallbackSiteSettings;
  }
});

export const getPracticeAreas = cache(() =>
  collectionOrFallback<PracticeArea>(
    `*[_type == "practiceArea"]|order(number asc){
      number, "slug": slug.current, title, summary, "capabilities": coalesce(capabilities, [])
    }`,
    fallbackPracticeAreas,
  ));

export const getExperiences = cache(() =>
  collectionOrFallback<Experience>(
    `*[_type == "experience"]|order(order asc){
      "slug": slug.current, organization, role, period, engagement, projectValue, description,
      "impacts": coalesce(impacts, [])
    }`,
    fallbackExperiences,
  ));

export const getProjects = cache(() =>
  collectionOrFallback<Project>(
    `*[_type == "project"]|order(featured desc, order asc){
      "slug": slug.current, title, category, "categories": coalesce(categories, []), summary,
      "image": coalesce(image.asset->url, fallbackImage, "/images/data-systems.jpg"), imageAlt,
      "stack": coalesce(stack, []), featured,
      context, challenge, "approach": coalesce(approach, []), outcome
    }`,
    fallbackProjects,
  ));

export const getProject = cache(async (slug: string) => {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
});

export const getPublications = cache(() =>
  collectionOrFallback<Publication>(
    `*[_type == "publication"]|order(year desc, title asc){
      title, venue, year, type, status, "keywords": coalesce(keywords, []), href
    }`,
    fallbackPublications,
  ));

export const getStories = cache(() =>
  collectionOrFallback<Story>(
    `*[_type == "story"]|order(order asc){
      "slug": slug.current, title, category, excerpt,
      "image": coalesce(image.asset->url, fallbackImage, "/images/fieldwork.jpg"), imageAlt, featured,
      "stack": coalesce(stack, []), intro, "sections": coalesce(sections, [])
    }`,
    fallbackStories,
  ));

export const getStory = cache(async (slug: string) => {
  const stories = await getStories();
  return stories.find((story) => story.slug === slug);
});

export const getInsights = cache(() =>
  collectionOrFallback<Insight>(
    `*[_type == "insight"]|order(featured desc, publishedAt desc){
      "slug": slug.current, title, category,
      "date": coalesce(dateLabel, string::split(publishedAt, "T")[0]),
      readingTime, excerpt,
      "image": coalesce(image.asset->url, fallbackImage, "/images/data-systems.jpg"), imageAlt,
      featured, "body": coalesce(body, [])
    }`,
    fallbackInsights,
  ));

export const getInsight = cache(async (slug: string) => {
  const insights = await getInsights();
  return insights.find((insight) => insight.slug === slug);
});

export const getCredentials = cache(() =>
  collectionOrFallback<Credential>(
    `*[_type == "credential"]|order(order asc){title, issuer, area, year, credentialId, href}`,
    fallbackCredentials,
  ));
