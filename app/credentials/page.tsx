import { PageHero } from "@/components/Primitives";
import { CertificationList } from "@/components/CertificationList";
import { getCredentials, getSiteSettings } from "@/lib/cms";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Credentials",
  description: "Selected professional certificates and areas of continuing study.",
  path: "/credentials",
});

export const revalidate = 60;

export default async function CredentialsPage() {
  const [credentials, settings] = await Promise.all([getCredentials(), getSiteSettings()]);
  const copy = settings.pages.credentials;
  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
      />
      <section className="section section-ash composed-section">
        <div className="shell">
          <CertificationList credentials={credentials} headingLevel="h2" />
        </div>
      </section>
    </>
  );
}
