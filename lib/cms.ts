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
  stories as fallbackStories,
  type Credential,
  type Experience,
  type Insight,
  type PracticeArea,
  type Profile,
  type Project,
  type Publication,
  type Story,
} from "./content";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-09-01";

const client =
  projectId && dataset
    ? createClient({ projectId, dataset, apiVersion, useCdn: true })
    : null;

async function collectionOrFallback<T, K extends keyof T = keyof T>(
  query: string,
  fallback: T[],
  key: K,
): Promise<T[]> {
  if (!client) return fallback;
  try {
    const result = await client.fetch<T[]>(query, {}, { next: { revalidate: 60 } });
    if (!result?.length) return fallback;

    const publishedByKey = new Map(result.map((item) => [String(item[key]), item]));
    const fallbackKeys = new Set(fallback.map((item) => String(item[key])));
    const reconciled = fallback.map((item) => {
      const published = publishedByKey.get(String(item[key]));
      return published ? { ...item, ...published } : item;
    });

    return [...reconciled, ...result.filter((item) => !fallbackKeys.has(String(item[key])))];
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
    return result?.name ? { ...fallbackProfile, ...result } : fallbackProfile;
  } catch {
    return fallbackProfile;
  }
});

export const getPracticeAreas = cache(() =>
  collectionOrFallback<PracticeArea>(
    `*[_type == "practiceArea"]|order(number asc){
      number, "slug": slug.current, title, summary, capabilities
    }`,
    fallbackPracticeAreas,
    "slug",
  ));

export const getExperiences = cache(() =>
  collectionOrFallback<Experience>(
    `*[_type == "experience"]|order(order asc){
      "slug": slug.current, organization, role, period, engagement, projectValue, description, impacts
    }`,
    fallbackExperiences,
    "slug",
  ));

export const getProjects = cache(() =>
  collectionOrFallback<Project>(
    `*[_type == "project"]|order(featured desc, order asc){
      "slug": slug.current, title, category, categories, summary,
      "image": coalesce(image.asset->url, fallbackImage), stack, featured,
      context, challenge, approach, outcome
    }`,
    fallbackProjects,
    "slug",
  ));

export const getProject = cache(async (slug: string) => {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
});

export const getPublications = cache(() =>
  collectionOrFallback<Publication>(
    `*[_type == "publication"]|order(year desc, title asc){
      title, venue, year, type, status, keywords, href
    }`,
    fallbackPublications,
    "title",
  ));

export const getStories = cache(() =>
  collectionOrFallback<Story>(
    `*[_type == "story"]|order(order asc){
      "slug": slug.current, title, category, excerpt,
      "image": coalesce(image.asset->url, fallbackImage), stack, intro, sections
    }`,
    fallbackStories,
    "slug",
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
      readingTime, excerpt, "image": coalesce(image.asset->url, fallbackImage),
      featured, body
    }`,
    fallbackInsights,
    "slug",
  ));

export const getInsight = cache(async (slug: string) => {
  const insights = await getInsights();
  return insights.find((insight) => insight.slug === slug);
});

export const getCredentials = cache(() =>
  collectionOrFallback<Credential>(
    `*[_type == "credential"]|order(order asc){title, issuer, area, year, credentialId, href}`,
    fallbackCredentials,
    "title",
  ));
