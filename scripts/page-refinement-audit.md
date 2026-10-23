# Page refinement audit - 22 October 2026

Scope: smaller pages, service/sector cards and existing-system content.

Findings addressed:
- Mixed card headings, rounded panels, variable shadows and excessive heading sizes.
- Repeated buyer-fit sections after property-specific offer descriptions.
- Diagnostic sections repeated the same outcome and booking offer in two separate layouts.
- Some sectors lacked a route for existing equipment; monitoring compatibility differs from paid fault diagnosis.
- Legal pages lacked a semantic main region and usable contents navigation.
- Confirmation page mixed display fonts and promised a response time without a confirmed service commitment.

Changes: shared scoped refinement stylesheet; visible equipment; concise category-specific hero copy; first four FAQs with remaining answers accessible; paid diagnostic scope and fees kept distinct from new-installation surveys; existing anchors and lead handlers retained; no new public equipment prices or shop links. Legal policy wording retained.

Verification: record source checks, browser results and deployment status in PR #7. Test delivery of live enquiries remains separate and has not been performed.

Observed verification: 29-page build; JS syntax; source anchors, IDs and JSON-LD; no shop links; monetary figures only on Professional Monitoring. Browser checks: 26 representative routes at 320 px frames without document overflow, six representative routes at 390 px and eight desktop routes. Policy contents opens and links to cookies. More questions opens by click and closes by Enter. Paid alarm enquiry opens the labelled drawer without submission. Contact highlights only Contact in desktop navigation.

## Copy audit implementation and architectural heroes

22 October 2026: applied the first audit batch on the design branch. Financial Services, About and Partners now lead with scope, practical controls and next steps. Removed unsupported prevention, competitor, fixed retention and partner-priority claims from those rewrites. Corrected Warehouse's after-hours FAQ and aligned selected sector response language. Removed overlapping introductions from Residential, Warehouse and Retail while preserving package equipment and limits. Updated changed FAQ JSON-LD from the actual answers.

Shared service/sector hero: navy and red stepped horizontal stripes, a single angled lower edge, consistent heading/lead/CTA spacing, reduced ornament on mobile. All seven sector pages contain no main-content images; homepage remains byte-for-byte unchanged. Office floor-plan SVG diagrams remain. Monitoring rates remain visible; no shop links added.

Validation: built all 29 pages; parsed JSON-LD; checked unique IDs and local fragment references; git diff whitespace check. Reviewed desktop hero and 17 inner pages in 320 px and 390 px frames (usable widths 305/375 px after scrollbars), with no document overflow. This is the first implementation batch, not completion of every P2 audit recommendation. Legal policy wording unchanged.

## Remaining copy and structure batch

22 October 2026: consolidated Residential, Home Programs, Retail, Warehouse, Construction and Airbnb sections. Construction shows a single starting equipment schedule before purchase/lease responsibilities. Optional residential automation expands in place. Business scaling copy identifies additional rooms, approaches and separately scoped sites. Office plans and SVG illustrations retained, with repeated administration section removed. Service selection guidance now names camera-view, credential, fire-interface, fence and guarding decisions. Existing-system outcomes are specific to the service.

Rewrote all three Insights articles as practical guides; aligned headings, summaries, estimated reading times and article metadata. Airbnb camera policy checked against the current official Help Centre. ODPC source remains explicitly labelled draft; removed detailed statutory interpretation from the practical guide. Legal policy pages retain their wording. Contact and confirmation copy no longer imply immediate help or a fixed follow-up deadline. Careers distinguishes role profiles from advertised vacancies and stages application documents; role eligibility requirements remain unchanged.

No hardware prices or shop links added; Monitoring prices retained. Homepage changes are copy only, including private-home photo option context; images and layout unchanged. No new credentials, case-study outcomes, response guarantees or conversion claims introduced. Owner confirmation of current credentials, the existing five-day risk-report promise and fee-credit policy remains outstanding; these cannot be established by editing copy.

Final checks for this batch: all 29 pages build; source HTML has one main and H1, unique IDs, valid JSON-LD, matching Article headlines and working main-content local fragments. No shop links or sector images; homepage image sources unchanged. Browser checked 20 pages in both 320 px and 390 px frames without horizontal overflow. Residential optional detail expands; Home Essential opens the correctly labelled enquiry with property choices. No live form submission made. Final guide heading and summary visually reviewed on desktop.

## Screenshot consistency fixes

22 October 2026: reviewed all seven supplied screenshots. Residential and retail imagery was in the homepage sector tabs; those two tabs now use a text-led layout without an image source. Other homepage photographs and all five visible categories retained. Sector pages remain image-free.

Closing banners now share one full-width navy component, typography, spacing, red primary action and secondary contact link across service/sector pages and Insights. Contact uses WhatsApp and telephone actions; articles use a free-survey action rather than labelling it a paid assessment. Related service links remain accessible. Removed Contact's nested rounded CTA and condensed its next-step explanation into three relevant steps. Contact hero now uses the same architectural geometry as service pages. Form section-heading typography and programmatic-focus treatment are scoped to Contact; input/button focus remains visible.

Fixed stylesheet version references on nested articles, which still had the older cache key. Homepage asset versions updated for the new sector behaviour.

Verification: 29-page build, JSON-LD/ID/fragment and whitespace checks passed. Browser checked twelve representative routes at 320 px and 390 px frame widths: shared closing background and button font agree, with no document overflow. Both image-free tabs have no image source. Fixed a narrow residential CTA that overflowed its inner panel; retest shows panel scroll width equals client width. Contact section headings use 11 px primary type with no heading focus outline. Insights card reading-time estimates now match the shortened articles.

## Live enquiry endpoint check

22 October 2026: completed all three Contact form steps in the local branch preview and submitted exactly one clearly labelled test to the configured live Formspree endpoint. Test name: WEBSITE TEST - no survey required; location also marked test-only/do not schedule. Used Urban Eye's public business number. The success path displayed /thank-you/?service=Free%20Site%20Survey after the asynchronous submission. This verifies the application's accepted-response path; recipient inbox delivery is not independently visible and needs owner confirmation. No second test or paid-assessment request submitted.

Final source check corrected the homepage meta description's older unconditional 24/7 monitoring claim. Current credential documents and the five-working-day report / 90-day fee-credit policy still need owner confirmation. Branch has not been merged.

## Owner-confirmed credentials and release

Owner confirmed successful inbox delivery of the labelled test, the five-working-day single-site report turnaround and full assessment-fee credit within 90 days. Owner also confirmed PSRA licensing, PSIA membership, Ajax Systems partnership and 2021 registration, while declining publication of documents/badges. Added plain-text credentials on About and relevant service copy; no document-availability promise, licence number, seal or partner logo was invented. Credentials are owner-confirmed rather than independently document-verified. The proposed deposit condition was not added to the confirmed credit policy.

Owner authorised merging after final checks. Preserve existing Vercel configuration, canonical URLs and form endpoint. Run the final build and checks against the final branch head before merge.

### Credential demo on service and office pages, 23 October 2026

- Added the existing 31-second portrait demo after the Access Control introduction and after Office Access Plans.
- Both pages reuse the uploaded MP4. Added one still poster, native controls, inline playback, a keyboard-accessible play button and a separate video link.
- `preload="none"` and no autoplay keep the MP4 deferred until visitors choose to play it. Burned-in captions remain visible without cropping.
- Access Control uses a 304px desktop player and a mobile player below 440px tall; Office Access Plans uses a smaller 230px desktop player and 377px mobile player.
- Removed the repeated office credential paragraph. Copy states that available methods depend on the selected reader and configuration.
- Validation: 29-page build, JS syntax and diff checks; browser playback with native controls; 320px/390px mobile frames without horizontal overflow. Video readyState remained 0 before play and reached 4 during playback.
