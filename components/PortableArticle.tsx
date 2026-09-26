import type { PortableTextBlock } from "@portabletext/types";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import type { ReactNode } from "react";
import { getSanityImageUrl, type SanityImageSource } from "@/lib/sanity-image";

function safeLink(href?: string) {
  if (!href) return undefined;
  if (href.startsWith("/") && !href.startsWith("//") && !href.includes("\\")) return href;
  try {
    const url = new URL(href);
    return ["https:", "http:", "mailto:"].includes(url.protocol) ? url.href : undefined;
  } catch { return undefined; }
}

function embedUrl(input?: string) {
  if (!input) return undefined;
  try {
    const url = new URL(input);
    if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;
    const host = url.hostname.toLowerCase();
    let id: string | undefined;
    if (host === "youtu.be") id = url.pathname.slice(1).split("/")[0];
    if (["youtube.com", "www.youtube.com", "m.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com"].includes(host)) {
      id = url.pathname === "/watch" ? url.searchParams.get("v") ?? undefined : url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1];
    }
    if (id && /^[\w-]{11}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}`;
    if (["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(host)) {
      id = url.pathname.match(/^\/(?:video\/)?(\d+)(?:\/|$)/)?.[1];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
  } catch { return undefined; }
  return undefined;
}

function imageDimensions(value: { asset?: { _ref?: string; metadata?: { dimensions?: { width?: number; height?: number } } } }): { width: number; height: number } {
  const dimensions = value.asset?.metadata?.dimensions;
  if (dimensions?.width && dimensions.height) return { width: dimensions.width, height: dimensions.height };
  const match = value.asset?._ref?.match(/-(\d+)x(\d+)-[a-z0-9]+$/i);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : { width: 1200, height: 800 };
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }: { children: ReactNode; value?: { href?: string } }) => {
      const href = safeLink(value?.href);
      if (!href) return <>{children}</>;
      const external = /^https?:\/\//i.test(href);
      return (
        <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
          {children}
        </a>
      );
    },
    code: ({ children }) => <code>{children}</code>,
  },
  types: {
    image: ({ value }: { value: SanityImageSource & { alt?: string; caption?: string; asset?: { _ref?: string; metadata?: { dimensions?: { width?: number; height?: number } } } } }) => {
      const { width, height } = imageDimensions(value);
      const displayWidth = Math.min(width, 1200);
      const displayHeight = Math.max(1, Math.round(displayWidth * height / width));
      const src = getSanityImageUrl(value, displayWidth, displayHeight);
      if (!src) return null;
      return (
        <figure className="article-figure">
          <Image src={src} alt={value.alt || ""} width={displayWidth} height={displayHeight} sizes="(max-width: 800px) calc(100vw - 32px), 760px" style={{ width: "100%", height: "auto" }} />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
    videoEmbed: ({ value }: { value: { url?: string; title?: string; caption?: string; transcript?: string } }) => {
      const src = embedUrl(value.url);
      if (!src) return null;
      return <figure className="article-figure article-video"><iframe src={src} title={value.title || "Embedded video"} loading="lazy" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen style={{ width: "100%", aspectRatio: "16 / 9", border: 0 }} />{value.caption && <figcaption>{value.caption}</figcaption>}{value.transcript && <details><summary>Read video transcript</summary><p>{value.transcript}</p></details>}</figure>;
    },
    videoFile: ({ value }: { value: { url?: string; title?: string; caption?: string; captionsUrl?: string; captionsLanguage?: string; transcript?: string } }) => {
      if (!value.url || !/^https:\/\/[\w.-]+\.sanity\.io\/files\//.test(value.url)) return null;
      const captionsUrl = value.captionsUrl && /^https:\/\/[\w.-]+\.sanity\.io\/files\//.test(value.captionsUrl) ? value.captionsUrl : undefined;
      return <figure className="article-figure article-video"><video src={value.url} controls preload="none" aria-label={value.title || "Uploaded video"} style={{ width: "100%", height: "auto" }}>{captionsUrl && value.captionsLanguage && <track kind="captions" src={captionsUrl} srcLang={value.captionsLanguage} label="Captions" default />}</video>{value.caption && <figcaption>{value.caption}</figcaption>}{value.transcript && <details><summary>Read video transcript</summary><p>{value.transcript}</p></details>}</figure>;
    },
  },
};

export function PortableArticle({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="portable-article">
      <PortableText value={value} components={components} />
    </div>
  );
}
