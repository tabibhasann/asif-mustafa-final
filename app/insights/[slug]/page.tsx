import { permanentRedirect } from "next/navigation";
import { getInsights } from "@/lib/cms";

export async function generateStaticParams() {
  return (await getInsights()).map((insight) => ({ slug: insight.slug }));
}

export default async function LegacyInsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  permanentRedirect(`/blogs/${encodeURIComponent(slug)}`);
}
