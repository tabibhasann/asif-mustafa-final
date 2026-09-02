import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const builder = projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null;

export function getSanityImageUrl(
  source: SanityImageSource | null | undefined,
  width: number,
  height: number,
) {
  if (!builder || !source) return undefined;

  try {
    return builder.image(source).width(width).height(height).fit("crop").auto("format").url();
  } catch {
    return undefined;
  }
}

export type { SanityImageSource };
