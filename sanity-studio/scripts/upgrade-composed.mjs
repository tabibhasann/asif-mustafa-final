import { getCliClient } from "sanity/cli";
import { profile as fallbackProfile, siteSettings as fallbackSiteSettings } from "../../lib/content.ts";

const client = getCliClient({ apiVersion: "2026-09-01" });

const previousHeadline = "Research, analytics and intelligent systems for industry.";
const previousIntroduction =
  "I work across applied statistics, artificial intelligence, industrial engineering and sustainability\u2014turning complex evidence into practical systems, clearer decisions and responsible improvement.";

const profile = await client.fetch(`*[_id == "profile"][0]{headline, introduction, metrics}`);
if (profile) {
  const metrics = Array.isArray(profile.metrics) ? profile.metrics : [];
  const nextMetrics = metrics.some((item) => item?.label?.includes("Leather Engineering"))
    ? metrics
    : [
        ...metrics,
        {
          _key: "metric-4",
          _type: "object",
          value: "B.Sc.",
          label: "Leather Engineering · KUET",
        },
      ];

  const patch = client.patch("profile").set({ metrics: nextMetrics });
  if (!profile.headline || profile.headline === previousHeadline) {
    patch.set({ headline: fallbackProfile.headline });
  }
  if (!profile.introduction || profile.introduction === previousIntroduction) {
    patch.set({ introduction: fallbackProfile.introduction });
  }
  await patch.commit();
}

await client
  .patch("siteSettings")
  .setIfMissing({
    "home.venuesLabel": fallbackSiteSettings.home.venuesLabel,
    "home.practiceAction": fallbackSiteSettings.home.practiceAction,
    "home.projectsAction": fallbackSiteSettings.home.projectsAction,
    "home.storiesAction": fallbackSiteSettings.home.storiesAction,
    "home.publicationsAction": fallbackSiteSettings.home.publicationsAction,
    "home.insightsAction": fallbackSiteSettings.home.insightsAction,
  })
  .commit();

const mediaDocuments = await client.fetch(
  `*[_type in ["project", "story", "insight"]]{_id, _type, title, imageAlt, featured, order}`,
);

for (const document of mediaDocuments) {
  const values = {};
  if (!document.imageAlt) values.imageAlt = document.title;
  if (document._type === "story" && typeof document.featured !== "boolean") {
    values.featured = Number(document.order ?? 99) <= 4;
  }
  if (Object.keys(values).length) await client.patch(document._id).set(values).commit();
}

console.log("Applied the compact-composition content upgrade without replacing later editorial changes.");
