# Client-required edition: release readiness

Reviewed 8 October 2026. This is the client-required edition, not the separate premium redesign.

## Completed independently

- Preserved the agreed navy, white and restrained gold palette, typography, full-screen homepage hero and section structure.
- Projects use a two-column tile composition; My Stories use editorial rows. Blogs and Stories remain distinct archives and detail templates.
- Restrained homepage card corners and shadows, aligned practice-card bottom rows, and removed clipped project, article and publication preview text.
- Certification titles retain the full reading width. Optional years and clearly labelled verification links sit in a separate, aligned footer.
- Empty CMS collections no longer leave blank homepage sections. Optional client details remain optional, not fabricated.
- Homepage project thumbnails request image sizes matched to their actual columns. Structured profile data reads the editable role and location.
- Removed unused principles styles and legacy combined-archive controls. Updated the publishing and preservation documentation.
- Applied compatible security dependency patches. No CMS content, project members or permissions were changed.

## Verification

- Website typecheck, 20 regression tests and production build pass. Studio build passes.
- All 25 content routes checked at actual 320px, 768px and 1440px viewport widths: 75 checks with one primary heading, no horizontal overflow, no empty main content, no unnamed controls, no broken completed images and no em dashes or wrong-person name in main content.
- Tests cover optional certification details, verification-link labelling, story previews, CMS article media, safe links, dates, reading time and hosted homepage pathname normalization.
- Current public homepage PageSpeed report: [8 October report](https://pagespeed.web.dev/analysis/https-asif-mustafa-corrected-vercel-app/3bg3ou2hhb?form_factor=mobile). Before this pass's final deployment, Mobile: performance 99, accessibility 100, best practices 100; Desktop: 100 in those three categories. SEO is 69 because the review edition intentionally blocks indexing. These are measured lab results, not guaranteed scores for every visitor or page, nor a claim of complete WCAG conformance.
- Website `npm audit --omit=dev` reports zero known vulnerabilities after Sharp 0.35.5 and source-map-js 1.2.2 updates.
- Studio production dependency audit still reports 14 affected packages, arising from two upstream advisories: [braces](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) and [sprintf-js](https://github.com/advisories/GHSA-hp3w-g68c-fv3c). Their latest published versions remain affected. They are reached through code-generation/file-watching and YAML/CLI dependencies. They are not dependencies of the public Next.js website. Do not process untrusted patterns or configuration through those tools. No claim is made that Studio is vulnerability-free. npm's forced recommendation is a breaking Sanity downgrade and has not been applied. source-map-js and the previously pinned smol-toml were patched without downgrading Sanity.

## Still requires client or launch authority

1. The client's real portrait, final copy, documentary media, relevant course names, grades, stakeholder names and verified project details. The fields and rendering support are ready.
2. Visual confirmation of the latest unnamed middle section's width request. Do not arbitrarily change the approved layout based on an uncertain transcript.
3. The owner's email address and deliberate selection of an appropriate Sanity role. An editor URL alone grants no access. Follow the invitation steps in README; do not share tokens.
4. Approval of the canonical website and domain. Then set `SITE_URL` to that domain, remove review-mode indexing restrictions only from the selected edition, redeploy, and verify robots, sitemap, canonicals and search metadata. Keep alternate editions non-indexed.
5. An owner-authorized CMS publish test: edit a real field, publish, allow cached content to refresh, and confirm the live page. No client records were changed just to manufacture a test result.

## Preservation and rollback

The prior tested source is tagged `archive/pre-final-qa-2026-10-08` at `a488604`. The current work is on `codex/final-qa-2026-10-08`. Earlier source tags and separate editions remain available. All connected editions currently share one Sanity dataset, so source preservation does not freeze future CMS edits. The October CMS export is a backup of its recorded state, not an automatic ongoing backup.

No ongoing monitor, paid service, new access grant or background automation was added.
