import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { MotionObserver } from "@/components/MotionObserver";
import { StructuredData } from "@/components/StructuredData";
import { getPracticeAreas, getProfile, getSiteSettings } from "@/lib/cms";
import { absoluteUrl, indexSite, metadataBase, siteOrigin } from "@/lib/seo";
import "./globals.css";
import "./composed.css";
import "./refinements.css";
import "./alternative.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const socialImage = absoluteUrl(settings.seo.socialImage);

  return {
    metadataBase,
    applicationName: "Md Asif Mustafa",
    title: {
      default: settings.seo.title,
      template: "%s | Md Asif Mustafa",
    },
    description: settings.seo.description,
    authors: [{ name: "Md Asif Mustafa", url: "/about" }],
    creator: "Md Asif Mustafa",
    publisher: "Md Asif Mustafa",
    category: "Research and professional services",
    robots: { index: indexSite, follow: true },
    openGraph: {
      title: settings.seo.title,
      description: settings.seo.description,
      type: "website",
      url: siteOrigin,
      siteName: "Md Asif Mustafa",
      images: [{ url: socialImage, alt: settings.seo.socialImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.seo.title,
      description: settings.seo.description,
      images: [{ url: socialImage, alt: settings.seo.socialImageAlt }],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#061A2E",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const isAlternative = process.env.DESIGN_VARIANT === "alternative";
  const [profile, practiceAreas, settings] = await Promise.all([getProfile(), getPracticeAreas(), getSiteSettings()]);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteOrigin}/#person`,
        name: profile.name,
        url: siteOrigin,
        email: `mailto:${profile.email}`,
        telephone: profile.phone,
        jobTitle: profile.role,
        address: profile.location,
        alumniOf: profile.education.map((item) => ({
          "@type": "CollegeOrUniversity",
          name: item.institution,
        })),
        sameAs: [profile.linkedin, profile.scholar, profile.github, profile.youtube].filter(Boolean),
        knowsAbout: practiceAreas.map((item) => item.title),
      },
      {
        "@type": "WebSite",
        "@id": `${siteOrigin}/#website`,
        url: siteOrigin,
        name: profile.name,
        description: settings.seo.description,
        inLanguage: "en",
        publisher: { "@id": `${siteOrigin}/#person` },
      },
    ],
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body data-design={isAlternative ? "alternative" : "main"}>
        <SiteHeader profile={{ name: profile.name, role: profile.role, email: profile.email }} />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <SiteFooter profile={profile} settings={settings.footer} />
        {isAlternative ? <MotionObserver /> : null}
        <StructuredData id="site-structured-data" data={structuredData} />
      </body>
    </html>
  );
}
