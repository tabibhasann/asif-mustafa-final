# Md Asif Mustafa · Final Portfolio

An institutional, research-led professional website built with Next.js and prepared for Sanity content management.

## Local development

```bash
npm install
npm run dev
```

The website runs at `http://localhost:3004`.

## Content management

The public site connects to Sanity project `gvgzuc20`, dataset `asif`. Until a matching Sanity record is published, the website uses the complete reviewed content in `lib/content.ts`. Sanity records are reconciled with those fallbacks, so the owner can update the site gradually without making unfinished sections disappear.

Run the editor separately:

```bash
cd sanity-studio
npm install
npm run dev
```

The editor has dedicated content types for Profile, Practice Areas, Experience, Projects, Publications, Stories, Insights and Credentials. Images, links, copy, order and featured states can all be changed without editing the website code.

Copy `.env.example` to `.env.local` if the public deployment needs different Sanity settings.

## Verification

```bash
npm run typecheck
npm run build
```

The final project includes static metadata, a sitemap, robots rules, responsive layouts and reduced-motion support.
