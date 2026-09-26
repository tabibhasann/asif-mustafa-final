# Md Asif Mustafa · Final Portfolio

An institutional, research-led professional website built with Next.js and prepared for Sanity content management.

- Public website: [asif-mustafa-final.vercel.app](https://asif-mustafa-final.vercel.app)
- Editorial comparison: [asif-mustafa-editorial.vercel.app](https://asif-mustafa-editorial.vercel.app)
- Content editor: [asif-mustafa-portfolio.sanity.studio](https://asif-mustafa-portfolio.sanity.studio)
- Source repository: [github.com/tabibhasann/asif-mustafa-final](https://github.com/tabibhasann/asif-mustafa-final)

## Requirements

- Node.js 20.9 or newer
- Access to Sanity project `gvgzuc20` to edit or publish content

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

The hosted editor is deployed with:

```bash
cd sanity-studio
npm run deploy
```

The editor has dedicated content types for Profile, Practice Areas, Experience, Projects, Publications, My Stories, Blogs and Credentials. Images, links, copy, order and featured states can all be changed without editing the website code.

Blogs and My Stories support rich text, inline images, graphs/charts uploaded as images, YouTube/Vimeo embeds and uploaded MP4 videos. Add image descriptions and video captions/transcripts for accessibility. Project detail headings are editable. Education records have optional CGPA, TGPA and grading-scale fields. Publications have separate type and status fields, including Ongoing, Submitted and Under review.

## Design editions

The main edition preserves the approved visual direction with the latest meeting revisions. A separate editorial edition uses the same routes, content and CMS with a different visual system. Set `DESIGN_VARIANT=alternative` for both build and runtime in its separate Vercel project. Leave it unset for the main project. Local preview: `DESIGN_VARIANT=alternative npm run dev`.

Both editions intentionally share one Sanity dataset, so publishing content updates both. The comparison edition sends `noindex, follow` in metadata and HTTP headers to avoid creating a competing search result. `SITE_URL` controls each deployment's canonical origin. Keep the main project's existing Vercel link; use a separate checkout/export when linking and deploying the alternative.

The one-time editorial migration is dry-run by default: `npm run migrate:editorial` inside `sanity-studio`. After backing up the dataset, `npm run migrate:editorial -- --apply` applies an atomic, revision-guarded transaction. It only replaces recognized starter values and preserves customized copy.

### Give the owner editing access

1. Open [Sanity project members](https://www.sanity.io/manage/project/gvgzuc20/members) while signed in as the project Administrator.
2. Invite the owner's email address.
3. On a Sanity Free plan, assign **Administrator** because Free provides only Administrator and Viewer roles. Viewer cannot edit. On Growth or Enterprise, assign **Editor** instead so the owner can edit and publish without infrastructure access.
4. Send the owner [asif-mustafa-portfolio.sanity.studio](https://asif-mustafa-portfolio.sanity.studio). They must sign in using the same method used to accept the invitation.

The owner can edit and publish text, profile details, social links, the optional YouTube link, metrics, education, experience, projects, publications, field stories, rich articles, credentials, all section labels, images with crop controls, the social preview and a PDF CV. Published changes appear on the public site after its cache refresh, normally within about 60 seconds. Never send the owner a Sanity API token.

For a new dataset, populate the editor once with the reviewed starter content while signed in as a Sanity Administrator:

```bash
cd sanity-studio
npm run seed
```

The seed is idempotent: it creates only missing starter documents and does not overwrite later edits made in the Studio.

Copy `.env.example` to `.env.local` if the public deployment needs different Sanity settings. Vercel should expose `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` and `NEXT_PUBLIC_SANITY_API_VERSION` in Production, Preview and Development. When a custom domain becomes the canonical address, set `SITE_URL` to that full `https://` origin so canonical links, the sitemap and structured data use it.

## Verification

```bash
npm run typecheck
npm test
npm run build
npm audit --omit=dev

cd sanity-studio
npm run build
npm audit --omit=dev
```

The final project includes route-specific metadata, social previews, JSON-LD, a sitemap, robots rules, `llms.txt`, responsive layouts and reduced-motion support.

See [the meeting audit](docs/meeting-audit.md) for the request-by-request implementation checklist and the cursor-specific adjustments that still need a screenshot or recording.
