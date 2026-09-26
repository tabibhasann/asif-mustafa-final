import type { Metadata } from "next";

const fallbackOrigin = "https://asif-mustafa-final.vercel.app";
const configuredOrigin =
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : fallbackOrigin);

const withProtocol = /^https?:\/\//i.test(configuredOrigin)
  ? configuredOrigin
  : `https://${configuredOrigin}`;

export const siteOrigin = withProtocol.replace(/\/$/, "");
export const metadataBase = new URL(siteOrigin);

export function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path.startsWith("/") ? path : `/${path}`, metadataBase).toString();
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedAt?: string;
  updatedAt?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = "/images/og-asif-mustafa.png",
  imageAlt = "Md Asif Mustafa, Research, Data Science and Industrial Systems",
  type = "website",
  publishedAt,
  updatedAt,
}: PageMetadataOptions): Metadata {
  const socialTitle = `${title} | Md Asif Mustafa`;
  const socialImage = absoluteUrl(image);
  const shared = {
    title: socialTitle,
    description,
    url: absoluteUrl(path),
    siteName: "Md Asif Mustafa",
    images: [{ url: socialImage, alt: imageAlt }],
  };

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: { index: process.env.DESIGN_VARIANT !== "alternative", follow: true },
    openGraph:
      type === "article"
        ? {
            ...shared,
            type: "article",
            publishedTime: publishedAt,
            modifiedTime: updatedAt,
            authors: [absoluteUrl("/about")],
          }
        : { ...shared, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: socialImage, alt: imageAlt }],
    },
  };
}
