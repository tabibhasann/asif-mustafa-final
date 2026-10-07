# Md Asif Mustafa · Final Portfolio

An institutional, research-led professional website built with Next.js and prepared for Sanity content management.

- Client-required website: [asif-mustafa-corrected.vercel.app](https://asif-mustafa-corrected.vercel.app/), currently in non-indexed review mode.
- Current refinement branch: `codex/final-qa-2026-10-08`.
- Separate premium comparison: [asif-mustafa-premium.vercel.app](https://asif-mustafa-premium.vercel.app/), source project `../asif-mustafa-premium`. It is not a replacement for the client-required edition.
- Earlier main and editorial editions remain at [asif-mustafa-final.vercel.app](https://asif-mustafa-final.vercel.app/) and [asif-mustafa-editorial.vercel.app](https://asif-mustafa-editorial.vercel.app/).
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

The public site reads published content from Sanity project `gvgzuc20`, dataset `asif`. The owner uses [the hosted content editor](https://asif-mustafa-portfolio.sanity.studio), not the website source code. Opening that link does not grant editing access: an Administrator must invite the owner first, and the owner must sign in.

Drafts are not shown on the public website. After editing, resolve any validation messages and select **Publish**. Built-in content in `lib/content.ts` is a fallback when the CMS is unavailable, unconfigured or a singleton profile/settings record is missing; it is not a backup of later client edits. Archives use the published CMS collection when available, so deleting a record can remove it from the website.

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

### What the owner can edit

- **Profile:** name, role, homepage headline and introduction, portrait, biography, contact and social links, PDF CV, profile highlights and education. The first biography paragraph is also used in the homepage profile preview.
- **Website Copy & Homepage:** the displayed section headings and labels, hero image/caption, archive-link labels, page introductions, search/social-sharing details and footer contact copy.
- **Practice Areas and Experience:** professional areas and capabilities, roles, organisations, dates, descriptions, contributions and results.
- **Projects:** images, summaries, categories, technologies, project details, optional stakeholders/relevance, ordering and featured selection. The homepage shows up to four selected projects, prioritising featured entries.
- **Publications:** titles, venue, year, links, keywords, publication type and status.
- **My Stories and Blogs:** titles, summaries, images, categories, dates and long-form content. The homepage shows up to four selected stories, prioritising featured entries.
- **Professional Certifications:** certification records and optional technologies/course details. Optional relevant courses for a degree belong in Profile → Education.

Use the descriptions beside each field and supply verified information. Some interface wording is intentionally fixed in code, including navigation labels, footer navigation-group titles and certain action/accessibility labels. CMS fields do not control colours, typography, section widths, spacing, card layout, section order or button destinations. Those require a code change and website deployment.

Unused homepage section-introduction fields and the removed About-page professional-approach fields are hidden in the current Studio schema. Their existing values and field keys are retained for older editions; hiding them does not delete any content. The decorative hero's former image-description field is also retained but hidden. Continue to add meaningful descriptions for portraits and content images that communicate information.

Blogs and My Stories support rich text, inline images, graphs/charts uploaded as images, YouTube/Vimeo embeds and uploaded MP4 videos. Add image descriptions and video captions/transcripts for accessibility. Project detail headings are editable. Education records have optional CGPA, TGPA and grading-scale fields. Publications have separate type and status fields, including Ongoing, Submitted and Under review.

The October correction adds an About-page certification record, optional relevant courses for each degree, optional certification technologies and course details, optional experience contribution/results fields, and project stakeholder/relevance fields. Blogs live at `/blogs`, My Stories at `/stories`, and `/insights` links to both. Existing `/insights/[slug]` article URLs redirect to their matching blog. Optional details are not fabricated when source information is unavailable. Reading times now reflect the text actually shown. Blog archives are newest first, with featured entries clearly labelled.

## Design editions

The main edition preserves the approved visual direction with the latest meeting revisions. A separate editorial edition uses the same routes, content and CMS with a different visual system. Set `DESIGN_VARIANT=alternative` for both build and runtime in its separate Vercel project. Leave it unset for the main project. Local preview: `DESIGN_VARIANT=alternative npm run dev`.

Both editions intentionally share one Sanity dataset, so publishing content updates both. The comparison edition sends `noindex, follow` in metadata and HTTP headers to avoid creating a competing search result. `SITE_URL` controls each deployment's canonical origin. Keep the main project's existing Vercel link; use a separate checkout/export when linking and deploying the alternative.

### Preserved pre-correction versions

The source before the Website Correction document is tagged `archive/pre-correction-2026-10-01` at commit `bb2f3fa`. The correction branch is `codex/website-corrections-2026-10-01`. The existing main and editorial deployment aliases remain unchanged. Deploy this revision only to its separate `asif-mustafa-corrected` Vercel project, with `SITE_URL=https://asif-mustafa-corrected.vercel.app` and `REVIEW_MODE=true`. Review mode prevents search indexing while the client compares versions; unset it only when this revision becomes the approved canonical website.

The corrected source before the final readability refinements is preserved at `archive/pre-polish-2026-10-02` (`3d378fb`). The new premium project's styling is self-contained and does not alter any archived or approved edition. Both current comparison projects read the same Sanity dataset; layout changes are independent, but publishing content changes their shared content.

All 44 pre-correction CMS records were exported before these changes. The revision uses the same dataset without migrating or overwriting existing records. Consequently, later client content edits can appear in all editions, while each edition retains its own layout. The correction deployment is now live. See [the correction audit](docs/website-correction-audit.md) for implementation and backup details.

The version before this QA pass is preserved at `archive/pre-final-qa-2026-10-08` (`a488604`). The pre-meeting layout also has an archived deployment at [asif-mustafa-before-meeting-20261007.vercel.app](https://asif-mustafa-before-meeting-20261007.vercel.app/); it requires the deployment owner's Vercel login. Git tags preserve source, not a frozen copy of future CMS content.

The source directory's `.vercel/project.json` still points to the earlier main project. Do not deploy this directory blindly. Use a clean source export linked explicitly to corrected project `prj_2WCXB3eXwB1goXWxcCIMNiLrmDiL`, team `tabibhasan`; verify the project before staging, test the staged production build, then promote it. Keep `SITE_URL=https://asif-mustafa-corrected.vercel.app` and `REVIEW_MODE=true` during review.

The one-time editorial migration is dry-run by default: `npm run migrate:editorial` inside `sanity-studio`. After backing up the dataset, `npm run migrate:editorial -- --apply` applies an atomic, revision-guarded transaction. It only replaces recognized starter values and preserves customized copy.

### Give the owner editing access

1. Open [Sanity project members](https://www.sanity.io/manage/project/gvgzuc20/members) while signed in as the project Administrator.
2. Invite the owner's email address.
3. Prefer **Editor** when the plan offers it. On Free, **Administrator** is the available role that can edit and publish; it also grants full project/settings access, so only assign it to the trusted owner. **Viewer** cannot edit, and **Contributor** cannot publish. Check [Sanity's current role permissions](https://www.sanity.io/docs/user-guides/roles) before assigning access.
4. Send the owner [asif-mustafa-portfolio.sanity.studio](https://asif-mustafa-portfolio.sanity.studio). They must sign in using the same method used to accept the invitation.

The website and CMS reads use a 60-second revalidation interval. This makes cached content eligible for refresh after a minute; it is not a guaranteed one-minute delivery deadline because page and Sanity CDN caches may refresh on subsequent requests. Publish, wait a minute, then reload the relevant website page and check it on mobile as well. If changes remain stale after a few minutes, ask the maintainer to check the deployment/cache rather than deleting records. Never send the owner a Sanity API token.

The client-required, premium and preserved editions currently share this dataset. Publishing content can update all connected editions even though their code and layouts remain separate. A second person's website needs a separate profile/content setup, normally its own dataset or project, before editing that person's details.

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

See [release readiness](docs/release-readiness.md) for current verification, remaining owner inputs, security-tooling caveats and the final launch checklist. Existing local comparison ports are development conveniences, not permanent public links.
