import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-09-01" });

const copyUpdates = new Map([
  ["I combine engineering context, statistics and AI to turn complex operational questions into practical, responsible systems.", "I use engineering knowledge, statistics and AI to investigate industrial problems and build tools that support practical decisions."],
  ["Engineering context · statistical discipline · applied intelligence", "Engineering research and data science for industry"],
  ["Connected expertise for complex industrial questions.", "Five areas of research and technical practice."],
  ["Five complementary fields, brought together around evidence, practical use and responsible improvement.", "Research, analysis and engineering across five connected areas."],
  ["Applied systems, clearly framed.", "Selected data and engineering projects."],
  ["A compact selection of work across data engineering, intelligent search, analytics and resilient operations.", "Five examples of work in data engineering, search, machine learning, analytics and supply chains."],
  ["What the technical record cannot show alone.", "Lessons from fieldwork and implementation."],
  ["Short cases from research settings, industrial systems and evidence-led decisions.", "Four short cases from industrial research, digital operations, energy audits and environmental studies."],
  ["Research published and shared.", "Selected publications and datasets."],
  ["Selected scholarly work across safety, sustainability, machine learning and decision analysis.", "Research on workplace safety, sustainable manufacturing, machine learning, energy and environmental decisions."],
  ["Notes from research and practice.", "Notes on research and practice."],
  ["Concise perspectives on evidence, intelligent systems and responsible industrial decisions.", "Short articles on research methods, data systems and industrial decision-making."],
  ["Across industry, institutions and applied research.", "Work across manufacturing, public institutions and research."],
  ["Research, analytics and engineering capabilities organised around the questions institutions and industries need to answer.", "Research, analytics and engineering applied to practical industrial questions."],
  ["A filterable record of data, AI, analytics, supply-chain and industrial systems work.", "A filterable record of data, AI, analytics, supply chain and industrial systems work."],
  ["Engineering context. Statistical discipline. Applied intelligence.", "A path from leather engineering to applied statistics and data science."],
  ["Clear evidence. Usable systems. Responsible outcomes.", "Principles that guide the work."],
  ["A restrained set of principles for moving from a difficult question to work that can be reviewed, used and improved.", "Four principles guide how I frame questions, analyse evidence and develop practical recommendations."],
  ["Have a question worth examining?", "Discuss a research or data challenge."],
  ["DANIDA-funded SusLeather Project · AUST-SDU", "DANIDA-funded SusLeather Project · AUST and SDU"],
  ["Production planning, costing and buyer-factory coordination for international footwear orders.", "Production planning, costing and coordination between buyers and factories for international footwear orders."],
  ["Modelled sparse user-item relationships for collaborative ranking.", "Modelled sparse relationships between users and items for collaborative ranking."],
  ["Orchestrated a local language model with grounded context and source-aware prompts.", "Orchestrated a local language model with prompts that cite the retrieved source material."],
  ["A production-oriented prototype for evidence-grounded product-review exploration.", "A working prototype for exploring product reviews while keeping answers tied to the source material."],
  ["A scalable reference architecture for churn analysis and iterative model development.", "A cloud data flow that supports churn analysis and repeated model testing."],
  ["A management and training architecture for operators, supervisors and regional teams working from one source of truth.", "A management and training platform that gives operators, supervisors and regional teams a shared set of records."],
  ["Connecting site observations, consumption data and engineering judgement in an actionable audit narrative.", "Connecting site observations, consumption data and engineering judgement in a clear set of findings and priorities."],
  ["/images/recommendation.jpg", "/images/recommendation-system.jpg"],
]);

const normaliseText = (value) =>
  (copyUpdates.get(value) ?? value)
    .replace(/\s+\u2014\s+/g, " to ")
    .replace(/\u2014/g, ", ")
    .replace(/\u2013/g, "-");

const normaliseValue = (value) => {
  if (typeof value === "string") return normaliseText(value);
  if (Array.isArray(value)) return value.map(normaliseValue);
  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, normaliseValue(item)]),
  );
};

const textBlock = (text, style, key) => ({
  _key: key,
  _type: "block",
  style,
  markDefs: [],
  children: [{ _key: `${key}-span`, _type: "span", marks: [], text: normaliseText(text) }],
});

const legacyBodyToContent = (body) => body.flatMap((section, sectionIndex) => [
  textBlock(section.title, "h2", `section-${sectionIndex + 1}-title`),
  ...(section.paragraphs ?? []).map((paragraph, paragraphIndex) =>
    textBlock(paragraph, "normal", `section-${sectionIndex + 1}-paragraph-${paragraphIndex + 1}`),
  ),
]);

const documents = await client.fetch(
  `*[_type in ["siteSettings", "profile", "practiceArea", "experience", "project", "publication", "story", "insight", "credential"]]{...}`,
);

let changedDocuments = 0;

for (const document of documents) {
  const updates = {};

  if (document._id === "siteSettings" && !document.seo) {
    updates.seo = {
      _type: "object",
      title: "Md Asif Mustafa | Research, Data Science and Industrial Systems",
      description: "Md Asif Mustafa applies engineering knowledge, statistics and AI to practical questions in research and industry.",
      socialImageAlt: "Md Asif Mustafa · Research · Data Science · Industrial Systems",
    };
  }

  for (const [key, value] of Object.entries(document)) {
    if (key.startsWith("_")) continue;
    const normalised = normaliseValue(value);
    if (JSON.stringify(normalised) !== JSON.stringify(value)) updates[key] = normalised;
  }

  if (document._type === "publication" && document.href === "https://scholar.google.com/citations?user=FjkMyr8AAAAJ&hl=en") {
    updates.href = undefined;
  }

  if (document._type === "insight" && !document.content?.length && document.body?.length) {
    updates.content = legacyBodyToContent(document.body);
  }

  if (document._id === "project-hybrid-recommendation-system") {
    updates.fallbackImage = "/images/recommendation-system.jpg";
  }

  if (document._id === "story-environmental-risk-bhairab-river") {
    updates.fallbackImage = "/images/bhairab-river-fieldwork.jpg";
  }

  if (!Object.keys(updates).length) continue;
  const values = Object.fromEntries(Object.entries(updates).filter(([, value]) => value !== undefined));
  const unset = Object.entries(updates).filter(([, value]) => value === undefined).map(([key]) => key);
  let patch = client.patch(document._id);
  if (Object.keys(values).length) patch = patch.set(values);
  if (unset.length) patch = patch.unset(unset);
  await patch.commit();
  changedDocuments += 1;
}

console.log(`Normalised punctuation in ${changedDocuments} published documents.`);
