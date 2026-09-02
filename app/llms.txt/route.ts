import { getPracticeAreas, getProfile, getProjects, getPublications } from "@/lib/cms";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

export async function GET() {
  const [profile, practiceAreas, projects, publications] = await Promise.all([
    getProfile(),
    getPracticeAreas(),
    getProjects(),
    getPublications(),
  ]);

  const text = [
    `# ${profile.name}`,
    "",
    `> ${profile.role} based in ${profile.location}.`,
    "",
    profile.introduction,
    "",
    "## Main pages",
    `- [Professional profile](${absoluteUrl("/about")})`,
    `- [Research and professional practice](${absoluteUrl("/practice")})`,
    `- [Experience](${absoluteUrl("/experience")})`,
    `- [Projects](${absoluteUrl("/projects")})`,
    `- [Publications](${absoluteUrl("/publications")})`,
    `- [Field stories](${absoluteUrl("/stories")})`,
    `- [Insights](${absoluteUrl("/insights")})`,
    `- [Credentials](${absoluteUrl("/credentials")})`,
    "",
    "## Areas of practice",
    ...practiceAreas.map((area) => `- ${area.title}: ${area.summary}`),
    "",
    "## Selected projects",
    ...projects.slice(0, 8).map((project) => `- [${project.title}](${absoluteUrl(`/projects/${project.slug}`)}): ${project.summary}`),
    "",
    "## Publication record",
    ...publications.map((publication) => `- ${publication.title}. ${publication.venue}, ${publication.year}.`),
    "",
    "## Contact and identity",
    `- Email: ${profile.email}`,
    `- LinkedIn: ${profile.linkedin}`,
    `- Google Scholar: ${profile.scholar}`,
    `- GitHub: ${profile.github}`,
    ...(profile.youtube ? [`- YouTube: ${profile.youtube}`] : []),
  ].join("\n");

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
