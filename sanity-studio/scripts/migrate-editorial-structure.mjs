import { getCliClient } from "sanity/cli";

// Dry run by default. Pass --apply explicitly after reviewing the planned changes.
const apply = process.argv.includes("--apply");
const client = getCliClient({ apiVersion: "2026-09-01" });
const changes = [];
const revisions = new Map();
const add = (id, description, patch) => changes.push({ id, description, patch });

const settings = await client.fetch(`*[_id == "siteSettings"][0]{_rev, home, pages, about}`);
if (settings?._rev) revisions.set("siteSettings", settings._rev);
const copy = [
  ["home.practiceTitle", "Five areas of research and technical practice.", "Research and technical practice."],
  ["home.practiceIntro", "Research, analysis and engineering across five connected areas.", "Research, analysis and engineering across connected areas."],
  ["home.storiesEyebrow", "Field stories", "My Stories"],
  ["home.storiesAction", "View all field stories", "View all stories"],
  ["home.insightsEyebrow", "Insights", "Blogs"],
  ["home.insightsAction", "View all insights", "Read all blogs"],
  ["pages.practice.title", "Five connected areas of practice.", "Connected areas of practice."],
  ["pages.stories.eyebrow", "Field stories", "My Stories"],
  ["pages.insights.title", "Ideas, methods and field perspectives.", "Ideas, experiences and the work behind them."],
  ["pages.insights.intro", "Editorial notes on evidence, intelligent systems and responsible industrial decisions.", "Blogs and stories on research methods, technical work and decisions shaped by field experience."],
  ["about.principlesEyebrow", "Working principles", "Professional approach"],
  ["about.principlesTitle", "Principles that guide the work.", "How I approach the work."],
  ["about.principlesIntro", "Four principles guide how I frame questions, analyse evidence and develop practical recommendations.", "Engineering context, statistical analysis and practical use shape my research and technical work."],
];
if (settings) {
  for (const [path, expected, next] of copy) {
    const current = path.split(".").reduce((value, key) => value?.[key], settings);
    if (current === expected) add("siteSettings", `${path}: ${JSON.stringify(next)}`, { set: { [path]: next } });
  }
}

const publications = await client.fetch(`*[_type == "publication"]{_id, _rev, status, type}`);
for (const item of publications) {
  if (item.status === "Conference" || item.status === "Dataset") {
    revisions.set(item._id, item._rev);
    add(item._id, `Normalize ${item.type} status to Published`, { set: { status: "Published" } });
  }
}

const oldPractice = await client.fetch(`*[_id == "practice-area-sustainability-energy"][0]{_id, _rev, number, title, summary, capabilities, slug}`);
const newEnergy = await client.fetch(`*[_id == "practice-area-energy-systems"][0]{_id}`);
const expectedCapabilities = ["GIS, EIA and life-cycle assessment", "Environmental and energy modelling", "Resource-efficiency analysis", "SEM, FTIR, UV-Vis and analytical testing"];
const unchangedOld = oldPractice?.number === "05"
  && oldPractice?.title === "Sustainability, Environmental & Energy Systems"
  && oldPractice?.summary === "Practical research for resource efficiency, environmental responsibility and energy decisions."
  && oldPractice?.slug?.current === "sustainability-energy"
  && JSON.stringify(oldPractice?.capabilities) === JSON.stringify(expectedCapabilities);
if (unchangedOld && !newEnergy) {
  revisions.set(oldPractice._id, oldPractice._rev);
  add(oldPractice._id, "Split the untouched combined practice while preserving its existing slug", {
    set: {
      title: "Environmental & Sustainability Systems",
      summary: "Practical research for resource efficiency and environmental responsibility.",
      capabilities: ["GIS, EIA and life-cycle assessment", "Environmental modelling", "Resource-efficiency analysis", "SEM, FTIR, UV-Vis and analytical testing"],
    },
  });
  add("practice-area-energy-systems", "Create Energy Systems from the existing combined capability", {
    create: {
      _id: "practice-area-energy-systems", _type: "practiceArea", number: "06",
      slug: { _type: "slug", current: "energy-systems" }, title: "Energy Systems",
      summary: "Analysis and modelling to inform practical energy decisions.",
      capabilities: ["Energy modelling", "Resource-efficiency analysis"],
    },
  });
} else if (oldPractice && !newEnergy) {
  console.log("SKIP practice split: the existing combined record was edited or a target record already exists. Review it manually to preserve custom content.");
}

for (const change of changes) console.log(`${apply ? "APPLY" : "PLAN"} ${change.id}: ${change.description}`);
if (!apply) {
  console.log(`Dry run: ${changes.length} planned changes. Re-run with --apply after review.`);
} else {
  const grouped = new Map();
  const creations = [];
  for (const change of changes) {
    if (change.patch.create) creations.push(change.patch.create);
    else grouped.set(change.id, { ...(grouped.get(change.id) ?? {}), ...change.patch.set });
  }
  const transaction = client.transaction();
  for (const [id, values] of grouped) {
    const revision = revisions.get(id);
    if (!revision) throw new Error(`Missing revision for ${id}; no changes applied.`);
    transaction.patch(id, (patch) => patch.ifRevisionId(revision).set(values));
  }
  for (const document of creations) transaction.createIfNotExists(document);
  if (changes.length) await transaction.commit();
  console.log(`Applied ${changes.length} guarded changes.`);
}
