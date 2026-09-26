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
  type InsightPreview,
  type PracticeArea,
  type Profile,
  type Project,
  type ProjectPreview,
  type Publication,
  type SiteSettings,
  type Story,
  type StoryPreview,
} from "./content";
import { getSanityImageUrl, type SanityImageSource } from "./sanity-image";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-09-01";

const client =
  projectId && dataset
    ? createClient({ projectId, dataset, apiVersion, useCdn: true })
    : null;

type WithCmsImage<T extends { image: string }> = T & { cmsImage?: SanityImageSource };

function resolveCmsImage<T extends { image: string }>(
  item: WithCmsImage<T>,
  width = 1600,
  height = 1000,
): T {
  const { cmsImage, ...rest } = item;
  return {
    ...rest,
    image: getSanityImageUrl(cmsImage, width, height) ?? item.image,
  } as T;
}

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

async function itemOrFallback<T>(
  query: string,
  params: Record<string, string>,
  fallback: T | undefined,
): Promise<T | undefined> {
  if (!client) return fallback;
  try {
    const result = await client.fetch<T | null>(query, params, { next: { revalidate: 60 } });
    return result ?? fallback;
  } catch {
    return fallback;
  }
}

export const getProfile = cache(async (): Promise<Profile> => {
  if (!client) return fallbackProfile;
  try {
    const result = await client.fetch<Partial<Profile> & { cmsPortrait?: SanityImageSource }>(
      `*[_type == "profile" && _id == "profile"][0]{
        name, shortName, role, location, email, phone, linkedin, scholar, github, youtube,
        headline, introduction, "cmsPortrait": portrait, "portrait": portrait.asset->url, portraitAlt,
        "cvUrl": cvFile.asset->url, biography, metrics, education
      }`,
      {},
      { next: { revalidate: 60 } },
    );
    if (!result?.name) return fallbackProfile;
    const { cmsPortrait, ...profileResult } = result;
    const definedResult = Object.fromEntries(
      Object.entries(profileResult).filter(([, value]) => value !== null && value !== undefined),
    ) as Partial<Profile>;
    return {
      ...fallbackProfile,
      ...definedResult,
      portrait: getSanityImageUrl(cmsPortrait, 1000, 1400) ?? profileResult.portrait ?? fallbackProfile.portrait,
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
    const result = await client.fetch<Partial<SiteSettings> & {
      seo?: Partial<SiteSettings["seo"]> & { cmsSocialImage?: SanityImageSource };
      home?: Partial<SiteSettings["home"]> & { cmsHeroImage?: SanityImageSource };
    }>(
      `*[_type == "siteSettings" && _id == "siteSettings"][0]{
        seo{..., "cmsSocialImage": socialImage, "socialImage": socialImage.asset->url},
        home{..., "cmsHeroImage": heroImage, "heroImage": heroImage.asset->url},
        pages{about, practice, experience, projects, publications, stories, insights, credentials},
        about,
        footer
      }`,
      {},
      { next: { revalidate: 60 } },
    );
    if (!result) return fallbackSiteSettings;
    const { cmsSocialImage, ...seoResult } = result.seo ?? ({} as Partial<SiteSettings["seo"]> & {
      cmsSocialImage?: SanityImageSource;
    });
    const { cmsHeroImage, ...homeResult } = result.home ?? ({} as Partial<SiteSettings["home"]> & {
      cmsHeroImage?: SanityImageSource;
    });
    return {
      seo: {
        ...fallbackSiteSettings.seo,
        ...Object.fromEntries(Object.entries(seoResult).filter(([, value]) => value !== null && value !== undefined && value !== "")),
        socialImage: getSanityImageUrl(cmsSocialImage, 1200, 630)
          ?? seoResult.socialImage
          ?? fallbackSiteSettings.seo.socialImage,
      },
      home: {
        ...fallbackSiteSettings.home,
        ...homeResult,
        heroImage: getSanityImageUrl(cmsHeroImage, 1600, 1000)
          ?? homeResult.heroImage
          ?? fallbackSiteSettings.home.heroImage,
        contexts: Array.isArray(homeResult.contexts) ? homeResult.contexts : fallbackSiteSettings.home.contexts,
        scholarlyVenues: Array.isArray(homeResult.scholarlyVenues)
          ? homeResult.scholarlyVenues
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

export const getProjects = cache(async () => {
  const items = await collectionOrFallback<WithCmsImage<ProjectPreview>>(
    `*[_type == "project"]|order(featured desc, order asc){
      "slug": slug.current, title, category,
      "categories": select(count(coalesce(categories, [])) > 0 => categories, defined(category) => [category], []),
      summary, "cmsImage": image, "image": coalesce(fallbackImage, "/images/data-systems.jpg"),
      "stack": coalesce(stack, []), featured, "updatedAt": _updatedAt
    }`,
    fallbackProjects,
  );
  return items.map((item) => resolveCmsImage<ProjectPreview>(item));
});

export const getProject = cache(async (slug: string) => {
  const item = await itemOrFallback<WithCmsImage<Project>>(
    `*[_type == "project" && slug.current == $slug][0]{
      "slug": slug.current, title, category,
      "categories": select(count(coalesce(categories, [])) > 0 => categories, defined(category) => [category], []),
      summary, "cmsImage": image, "image": coalesce(fallbackImage, "/images/data-systems.jpg"), imageAlt,
      "stack": coalesce(stack, []), featured, context, challenge,
      "approach": coalesce(approach, []), outcome, detailLabels, detailHeadings, "updatedAt": _updatedAt
    }`,
    { slug },
    fallbackProjects.find((project) => project.slug === slug),
  );
  return item ? resolveCmsImage<Project>(item) : undefined;
});

export const getPublications = cache(async () => {
  const items = await collectionOrFallback<Omit<Publication, "status"> & { status: string }>(
    `*[_type == "publication"]|order(year desc, title asc){
      title, venue, year, type, status, "keywords": coalesce(keywords, []), href
    }`,
    fallbackPublications,
  );
  return items.map((item): Publication => ({
    ...item,
    status: item.status === "Conference" || item.status === "Dataset" ? "Published" : item.status || "Status not specified",
  }));
});

export const getStories = cache(async () => {
  const items = await collectionOrFallback<WithCmsImage<StoryPreview>>(
    `*[_type == "story"]|order(order asc){
      "slug": slug.current, title, category, excerpt,
      "cmsImage": image, "image": coalesce(fallbackImage, "/images/fieldwork.jpg"), featured,
      "stack": coalesce(stack, []), "updatedAt": _updatedAt
    }`,
    fallbackStories,
  );
  return items.map((item) => resolveCmsImage<StoryPreview>(item));
});

export const getStory = cache(async (slug: string) => {
  const item = await itemOrFallback<WithCmsImage<Story>>(
    `*[_type == "story" && slug.current == $slug][0]{
      "slug": slug.current, title, category, excerpt,
      "cmsImage": image, "image": coalesce(fallbackImage, "/images/fieldwork.jpg"), imageAlt, featured,
      "stack": coalesce(stack, []), intro, "sections": coalesce(sections, []),
      content[]{..., _type == "videoFile" => {"url": file.asset->url, "captionsUrl": captions.asset->url}}, "updatedAt": _updatedAt
    }`,
    { slug },
    fallbackStories.find((story) => story.slug === slug),
  );
  return item ? resolveCmsImage<Story>(item) : undefined;
});

export const getInsights = cache(async () => {
  const items = await collectionOrFallback<WithCmsImage<InsightPreview>>(
    `*[_type == "insight"]|order(featured desc, publishedAt desc){
      "slug": slug.current, title, category,
      "date": coalesce(dateLabel, string::split(publishedAt, "T")[0]),
      publishedAt, readingTime, excerpt,
      "cmsImage": image, "image": coalesce(fallbackImage, "/images/data-systems.jpg"), imageAlt,
      featured, "updatedAt": _updatedAt
    }`,
    fallbackInsights,
  );
  return items.map((item) => resolveCmsImage<InsightPreview>(item));
});

export const getInsight = cache(async (slug: string) => {
  const item = await itemOrFallback<WithCmsImage<Insight>>(
    `*[_type == "insight" && slug.current == $slug][0]{
      "slug": slug.current, title, category,
      "date": coalesce(dateLabel, string::split(publishedAt, "T")[0]), publishedAt,
      readingTime, excerpt,
      "cmsImage": image, "image": coalesce(fallbackImage, "/images/data-systems.jpg"), imageAlt,
      featured, "body": coalesce(body, []),
      content[]{..., _type == "videoFile" => {"url": file.asset->url, "captionsUrl": captions.asset->url}}, "updatedAt": _updatedAt
    }`,
    { slug },
    fallbackInsights.find((insight) => insight.slug === slug),
  );
  return item ? resolveCmsImage<Insight>(item) : undefined;
});

export const getCredentials = cache(() =>
  collectionOrFallback<Credential>(
    `*[_type == "credential"]|order(order asc){title, issuer, area, year, credentialId, href}`,
    fallbackCredentials,
  ));
