export function formatArticleDate(publishedAt?: string, label?: string): string {
  const displayLabel = label?.trim();
  if (displayLabel && displayLabel !== "Editorial note") return displayLabel;
  const timestamp = publishedAt ? Date.parse(publishedAt) : NaN;
  if (Number.isNaN(timestamp)) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(timestamp));
}
