import type { PortableTextBlock } from "@portabletext/types";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import type { ReactNode } from "react";
import { getSanityImageUrl, type SanityImageSource } from "@/lib/sanity-image";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }: { children: ReactNode; value?: { href?: string } }) => {
      const href = value?.href || "#";
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
    image: ({ value }: { value: SanityImageSource & { alt?: string; caption?: string } }) => {
      const src = getSanityImageUrl(value, 1200, 675);
      if (!src) return null;
      return (
        <figure className="article-figure">
          <Image src={src} alt={value.alt || ""} width={1200} height={675} sizes="(max-width: 800px) calc(100vw - 32px), 760px" />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
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
