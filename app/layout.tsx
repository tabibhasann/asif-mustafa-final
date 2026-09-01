import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getPracticeAreas, getProfile } from "@/lib/cms";
import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://asif-mustafa-final.vercel.app"),
  title: {
    default: "Md Asif Mustafa | Research, Data Science & Industrial Systems",
    template: "%s | Md Asif Mustafa",
  },
  description:
    "Professional profile of Md Asif Mustafa, working across applied statistics, artificial intelligence, industrial engineering and sustainability.",
  authors: [{ name: "Md Asif Mustafa" }],
  creator: "Md Asif Mustafa",
  publisher: "Md Asif Mustafa",
  category: "Research and professional services",
  openGraph: {
    title: "Md Asif Mustafa | Research, Data Science & Industrial Systems",
    description:
      "Evidence-led research, analytics and intelligent systems for industry.",
    type: "website",
    images: [{ url: "/images/hero.jpg", width: 1920, height: 1080, alt: "Research and industrial analytics" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Asif Mustafa | Research, Data Science & Industrial Systems",
    description: "Evidence-led research, analytics and intelligent systems for industry.",
    images: ["/images/hero.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#061A2E",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [profile, practiceAreas] = await Promise.all([getProfile(), getPracticeAreas()]);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: "https://asif-mustafa-final.vercel.app",
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    jobTitle: "Researcher, Data Scientist and Technical Advisor",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    alumniOf: profile.education.map((item) => ({
      "@type": "CollegeOrUniversity",
      name: item.institution,
    })),
    sameAs: [profile.linkedin, profile.scholar, profile.github],
    knowsAbout: practiceAreas.map((item) => item.title),
  };

  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <SiteHeader profile={profile} />
        <main id="main-content">{children}</main>
        <SiteFooter profile={profile} practiceAreas={practiceAreas} />
        <script
          id="person-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
