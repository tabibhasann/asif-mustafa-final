# Client-required edition: release readiness

Reviewed 8 October 2026. This is the client-required edition, not the separate premium redesign.

Live review: [asif-mustafa-corrected.vercel.app](https://asif-mustafa-corrected.vercel.app/). The preceding final-QA website source `ca6b918850964d976989864f8b3773f0f60d970c` was built successfully, tested as a staged production deployment and promoted. [Prior deployment and build details](https://vercel.com/tabibhasan/asif-mustafa-corrected/EWzbjxH2WWLBVZtXSD2sPBX4mZvp). The subsequent composition refinement release is recorded below.

## Targeted composition refinements

- Practice: retained all six areas and their capabilities, removed the repetitive decorative label, aligned adjacent capability dividers with CSS subgrid, and kept a flex fallback. Single-column mobile cards size to their actual content.
- Experience: role titles are now semantic headings; organizations are secondary. Contributions share one readable column instead of an artificially emphasized first paragraph and two unrelated side-by-side blocks. Empty contribution groups are omitted.
- Project details: editable Context, Approach and Outcome content now follows one shared editorial grid, with a clearer reading measure, ordered methods and restrained outcome accent. The summary is readable at normal body size. Empty narrative sections are omitted.
- Footer: the contact strip and navigation share one navy surface with an inset divider, quieter group headings and an aligned two-column social-link group. Mobile navigation retains comfortable tap targets.
- Navigation: declared the global smooth-scroll behavior to Next.js so route changes can reset scroll promptly without the development warning.
- Typecheck, all 23 regression tests, the 35-route production build and production dependency audit pass. The audit reports zero known website production vulnerabilities.
- Browser checks: 75 development and 75 local production route/viewport checks passed across all 25 content routes at actual 320px, 768px and 1440px widths. Local production checks include one primary heading, nonempty main content, no horizontal overflow, no broken completed images, no dead link destinations, no duplicate IDs and named buttons. No warnings or errors appeared in the production browser tab.
- Public release verification will be recorded after staging and promotion. The earlier PageSpeed reports below predate this composition pass and are historical measurements, not new scores for this revision.

## Completed independently

- Preserved the agreed navy, white and restrained gold palette, typography, full-screen homepage hero and section structure.
- Projects use a two-column tile composition; My Stories use editorial rows. Blogs and Stories remain distinct archives and detail templates.
- Restrained homepage card corners and shadows, aligned practice-card bottom rows, and removed clipped project, article and publication preview text.
- Certification titles retain the full reading width. Optional years and clearly labelled verification links sit in a separate, aligned footer.
- Empty CMS collections no longer leave blank homepage sections. Optional client details remain optional, not fabricated.
- Homepage and archive project thumbnails request image sizes matched to their actual columns, including the archive's narrow-screen side images. Structured profile data reads the editable role and location.
- Removed unused principles styles and legacy combined-archive controls. Updated the publishing and preservation documentation.
- Applied compatible security dependency patches. No CMS content, project members or permissions were changed.

## Verification

- Website typecheck, 20 regression tests and production build pass. Studio build passes.
- All 25 content routes checked locally and publicly at actual 320px, 768px and 1440px viewport widths. The final published build passed another 75 route/viewport checks: one primary heading, no horizontal overflow, no empty main content, no broken completed images, no duplicate element IDs and no empty or dead `#` link destinations. The preceding public pass also checked control names and absence of em dashes or the wrong-person name in main content.
- Visually reviewed the homepage, main archives, About, Practice, Experience, Credentials and project/blog/story detail templates, including mobile hero, reading layout and footer. These checks cover current content, not every possible future CMS input.
- Exercised desktop writing disclosure and Escape dismissal, mobile menu and Escape dismissal, homepage profile anchor, project category selection/reset, publication search, empty results, type filtering and reset. Missing routes return 404; legacy article URLs redirect to Blogs with 308. No browser errors/warnings were observed in the reviewed session. A bounded production error/warning log query returned no entries.
- Tests cover optional certification details, verification-link labelling, story previews, CMS article media, safe links, dates, reading time and hosted homepage pathname normalization.
- Public homepage PageSpeed report after design deployment: [8 October, 03:09 report](https://pagespeed.web.dev/analysis/https-asif-mustafa-corrected-vercel-app/yskfn3s3wf?form_factor=mobile). Mobile: performance 97, accessibility 100, best practices 100; Desktop: 100 in those three categories. Both have zero layout shift and zero blocking time. Subsequent application changes only adjust image hints on the project archive, not the homepage.
- Final project archive PageSpeed report: [8 October, 03:25 report](https://pagespeed.web.dev/analysis/https-asif-mustafa-corrected-vercel-app-projects/v108zs9pz5?form_factor=mobile). Mobile and Desktop: performance 100, accessibility 100, best practices 100. Mobile largest contentful paint is 1.8 seconds and speed index is 1.4 seconds, with zero layout shift. This follows correcting the archive's image hints to its actual mobile, tablet and desktop card widths, without reducing image quality.
- SEO is 69 because the review edition intentionally blocks indexing; all nine applicable basic SEO checks passed. Both measured templates also passed 3/3 Agentic Browsing checks. These are measured lab results, not guaranteed scores for every visitor or page, nor a claim of complete WCAG conformance or guaranteed Google/AI search rankings. Do not remove review indexing restrictions just to improve the score.
- Website `npm audit --omit=dev` reports zero known vulnerabilities after Sharp 0.35.5 and source-map-js 1.2.2 updates.
- Studio production dependency audit still reports 14 affected packages, arising from two upstream advisories: [braces](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) and [sprintf-js](https://github.com/advisories/GHSA-hp3w-g68c-fv3c). Their latest published versions remain affected. They are reached through code-generation/file-watching and YAML/CLI dependencies. They are not dependencies of the public Next.js website. Do not process untrusted patterns or configuration through those tools. No claim is made that Studio is vulnerability-free. npm's forced recommendation is a breaking Sanity downgrade and has not been applied. source-map-js and the previously pinned smol-toml were patched without downgrading Sanity.

## Still requires client or launch authority

1. The client's real portrait, final copy, documentary media, relevant course names, grades, stakeholder names and verified project details. The fields and rendering support are ready.
2. Visual confirmation of the latest unnamed middle section's width request. Do not arbitrarily change the approved layout based on an uncertain transcript.
3. The owner's email address and deliberate selection of an appropriate Sanity role. An editor URL alone grants no access. Follow the invitation steps in README; do not share tokens.
4. Approval of the canonical website and domain. Then set `SITE_URL` to that domain, remove review-mode indexing restrictions only from the selected edition, redeploy, and verify robots, sitemap, canonicals and search metadata. Keep alternate editions non-indexed.
5. An owner-authorized CMS publish test: edit a real field, publish, allow cached content to refresh, and confirm the live page. No client records were changed just to manufacture a test result.

## Preservation and rollback

The source before final QA is tagged `archive/pre-final-qa-2026-10-08` at `a488604`; the source before the composition refinements is tagged `archive/pre-composition-polish-2026-10-08` at `39c3fa7`. The current work is on `codex/composition-polish-2026-10-08`. Earlier source tags and separate editions remain available. All connected editions currently share one Sanity dataset, so source preservation does not freeze future CMS edits. The October CMS export is a backup of its recorded state, not an automatic ongoing backup.

The hosted [Sanity Studio](https://asif-mustafa-portfolio.sanity.studio/) was rebuilt and deployed with its updated schemas (1/1 schema deployment succeeded). It uses the normal authenticated Sanity sign-in flow. This does not grant a new editor access; the invitation and owner-authorized publication test remain outstanding.

No ongoing monitor, paid service, new access grant or background automation was added.
