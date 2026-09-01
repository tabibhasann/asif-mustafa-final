import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
