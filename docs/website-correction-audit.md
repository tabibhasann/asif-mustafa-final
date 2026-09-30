# Website Correction implementation

Reviewed against the client document `Website Correction.docx`, 1 October 2026. This revision refines the existing design rather than introducing another unrelated visual direction.

## Requirement coverage

| Area | Implementation |
| --- | --- |
| Home | Moderately tighter section spacing, retained breathing room, distinct practice cards with navy/gold top borders, restrained shadows and alternating light surfaces. Full-screen hero and profile placement retained. |
| About | Removed the complete approach/principles section. Added six existing certifications. Each record supports issuer, course information, credential ID, verification link and technologies. Optional relevant courses render beneath their degree. |
| Practice | Stronger text contrast, readable body size, clearer hierarchy, distinct but related card surfaces and centered separators. |
| Experience | Consistent role/organisation hierarchy, readable description and grouped contribution statements instead of excessive bullets. Optional results render separately only when supplied. Existing claims and figures retained. |
| Projects | A concise project record presents area of interest, related fields, problem/challenge and technology. Optional stakeholders and relevance render when approved data is entered. Context, approach and outcome remain available below. |
| Blogs | Separate `/blogs` archive and standard article layout with category, excerpt, real publication date or custom display date, optional reading time, image and Read more. Rich text/media preserved. |
| My Stories | Separate `/stories` journal archive and long-form detail layout. Flexible headings, paragraphs, images, charts and videos. Technical tags optional; no forced question-based public template. |
| Navigation | Insights menu links directly to Blogs and My Stories; Insights remains a two-destination landing page. Footer contains both. Old article URLs permanently redirect to the corresponding blog. |
| Consistency | Retained navy, white and sparing gold. Shared card radii, readable typography and deliberate section spacing. Responsive layouts collapse progressively rather than squeezing desktop grids into phones. |
| CMS | All newly requested content fields are exposed without changing existing document types or overwriting client content. |

## Content requiring the owner's input

- Actual relevant course names for each degree were not provided; the optional lists remain empty until supplied.
- Named stakeholders, client organisations and project relevance can be added per project. No dataset provider was presented as a commissioned client.
- Certification topics/course details and separately measured experience results are optional. Existing verified records remain visible without invented claims.

## Preservation

- Previous source: tag `archive/pre-correction-2026-10-01`, commit `bb2f3fa`.
- New source branch: `codex/website-corrections-2026-10-01`.
- Previous main: https://asif-mustafa-final.vercel.app/
- Previous editorial: https://asif-mustafa-editorial.vercel.app/
- Separate correction project: https://asif-mustafa-corrected.vercel.app/
- CMS backup: `.codex-audit/website-correction-2026-10-01/pre-correction-asif.tar.gz` in the parent workspace, containing all 44 records and no uploaded assets.

No CMS content migration was run for this revision. All editions use dataset `asif`, so subsequent content publishing affects their content but not their preserved layout. The new review deployment has `REVIEW_MODE=true` and a noindex header/metadata to avoid competing with the current production website in search.

## Editing guide

- Profile > Education > Relevant courses: enter only a short relevant list for each degree.
- Professional Certifications: edit issuer, course information, technologies, ID and verification link.
- Experience: edit role, organisation, description, contribution statements and optional results.
- Projects: edit the problem/challenge, technology list, stakeholders, relevance and record labels.
- Blogs / My Stories: create an entry, set its slug and metadata, and use rich content for headings and media. Publish to make it visible after the site's cache refresh.
- Site settings: edit page introductions, section titles and About certification/course labels.

The CMS requires an authorised Sanity member to edit. Invite the owner through project `gvgzuc20` and send https://asif-mustafa-portfolio.sanity.studio/. Do not share API tokens.
