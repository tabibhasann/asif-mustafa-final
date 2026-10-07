# Website Correction implementation

Reviewed against the client document `Website Correction.docx`, 1 October 2026, with a completion and comparison review on 3 October. The client-required edition refines the existing design rather than introducing another unrelated visual direction. The separately requested premium edition is an independent project.

## Requirement coverage

| Area | Implementation |
| --- | --- |
| Home | Moderately tighter section spacing, retained breathing room, distinct practice cards with navy/gold top borders, restrained shadows and alternating light surfaces. Full-screen hero and profile placement retained. |
| About | Removed the complete approach/principles section. Added six existing certifications. Each record supports issuer, course information, credential ID, verification link and technologies. Optional relevant courses render beneath their degree. |
| Practice | Stronger text contrast, readable body size, clearer hierarchy, distinct but related card surfaces and centered separators. |
| Experience | Consistent role/organisation hierarchy, readable description and grouped contribution statements instead of excessive bullets. Optional results render separately only when supplied. Existing claims and figures retained. |
| Projects | A concise project record presents area of interest, related fields, problem/challenge and technology. Optional stakeholders and relevance render when approved data is entered. Context, approach and outcome remain available below. |
| Blogs | Separate `/blogs` archive and standard article layout with category, excerpt, real publication date or custom display date, calculated reading time, image and Read more. Newest-first order and a clear Featured label. Rich text/media preserved. |
| My Stories | Separate `/stories` journal archive and long-form detail layout. Flexible headings, paragraphs, images, charts and videos. Technical tags optional; no forced question-based public template. |
| Navigation | Insights menu links directly to Blogs and My Stories; Insights remains a two-destination landing page. Footer contains both. Old article URLs permanently redirect to the corresponding blog. |
| Consistency | Retained navy, white and sparing gold. Shared card radii, readable typography and deliberate section spacing. Responsive layouts collapse progressively rather than squeezing desktop grids into phones. Footer links are now grouped into Profile, Work & writing, and Connect rather than one cramped row. |
| CMS | All newly requested content fields are exposed without changing existing document types or overwriting client content. |

## Content requiring the owner's input

- Actual relevant course names for each degree were not provided; the optional lists remain empty until supplied.
- Named stakeholders, client organisations and project relevance can be added per project. No dataset provider was presented as a commissioned client.
- Certification topics/course details and separately measured experience results are optional. Existing verified records remain visible without invented claims.

## Preservation

- Previous source: tag `archive/pre-correction-2026-10-01`, commit `bb2f3fa`.
- New source branch: `codex/website-corrections-2026-10-01`.
- Final refinement branch: `codex/client-completion-2026-10-02`; the starting corrected version is preserved at `archive/pre-polish-2026-10-02` (`3d378fb`).
- Separate premium source: adjacent project `asif-mustafa-premium`, branch `codex/premium-2026-10-02`.
- Previous main: https://asif-mustafa-final.vercel.app/
- Previous editorial: https://asif-mustafa-editorial.vercel.app/
- Live client-required correction project: https://asif-mustafa-corrected.vercel.app/. It remains in non-indexed review mode.
- CMS backup: `.codex-audit/website-correction-2026-10-01/pre-correction-asif.tar.gz` in the parent workspace, containing all 44 records and no uploaded assets.

No CMS content migration was run for this revision. All editions use dataset `asif`, so subsequent content publishing affects their content but not their preserved layout. The review deployment uses `REVIEW_MODE=true` and a noindex header/metadata to avoid competing with the canonical website in search. The Studio schema and app were successfully deployed; no existing records were mutated.

## Historical verification, 1–3 October

The following records describe the original correction pass. Hosting limitations noted then are no longer the current status. See [release readiness](release-readiness.md) for the latest checks.

- TypeScript check, 12 date/rich-content/reading-time tests, production website builds for both editions and the client Studio build pass.
- Compatible dependency updates applied, including Next.js 16.3.8 and Undici 7.30.0. Website and Studio production dependency audits report zero known vulnerabilities.
- All 25 content routes return HTTP 200 in the production preview, with one main heading and the intended canonical URL. Legacy article URLs return HTTP 308 to Blogs.
- Read-only independent review checked route preservation, CMS editability and source accuracy. Its findings were resolved.
- Desktop, tablet and phone layouts were reviewed. The main routes and sample project/blog/story details have no horizontal overflow at 390px. Practice also passes at 320px; its navigation button remains 44px wide.
- Publishing was initially blocked by Vercel's account limit. This was resolved before the current corrected edition was published; the earlier aliases were preserved.
- Current local comparison previews: client-required edition at `http://localhost:3114`, premium edition at `http://localhost:3117`. Previous main and editorial source exports remain preserved; ports 3115 and 3116 are their earlier preview ports, not a claim that those servers are currently running.
- Both editions were tested on all 25 content pages at desktop and phone width, plus all ten main pages at 320px and 768px. Each edition passed 70 route/viewport checks: one main heading, no horizontal overflow, no broken loaded images, no em dashes in the visible page copy, and no browser errors. The premium Practice list alignment and portrait-placeholder contrast were corrected during visual/accessibility review.
- All 25 internal content paths return HTTP 200. Legacy Insights article paths return HTTP 308 to Blogs; missing paths return the custom HTTP 404 page. Mobile menu/disclosure navigation, keyboard Escape, project category filtering, publication search/status filtering and empty states were exercised in the browser.
- Read-only Sanity verification confirmed six practice records, eight projects, nine publications, four stories, three blogs and six credentials. No CMS content was mutated for this work.
- The local Lighthouse mobile runs for both homepages returned performance 98, accessibility 100 and best practices 100. These are measured lab results, not a guarantee for every route or deployed environment. The comparison SEO score is 69 because `REVIEW_MODE=true` intentionally sends noindex metadata and headers; configure the approved canonical domain and disable review mode when publishing the selected production edition, then rerun the public-site audit.

## Premium comparison scope

The premium project preserves the corrected routes, content model and client-required information. It has its own cohesive stylesheet, self-hosted Instrument Serif and DM Sans fonts, a full-screen opening, consistent editorial cards, better-balanced project previews, an aligned publication record and a calmer grouped footer. It is a deliberate alternative requested by Tabib, not an unrequested replacement of the client's approved edition. Both versions share CMS content but not their visual source.

## Editing guide

- Profile > Education > Relevant courses: enter only a short relevant list for each degree.
- Professional Certifications: edit issuer, course information, technologies, ID and verification link.
- Experience: edit role, organisation, description, contribution statements and optional results.
- Projects: edit the problem/challenge, technology list, stakeholders, relevance and record labels.
- Blogs / My Stories: create an entry, set its slug and metadata, and use rich content for headings and media. Publish to make it visible after the site's cache refresh.
- Site settings: edit page introductions, section titles and About certification/course labels.

The CMS requires an authorised Sanity member to edit. Invite the owner through project `gvgzuc20` and send https://asif-mustafa-portfolio.sanity.studio/. Do not share API tokens.
