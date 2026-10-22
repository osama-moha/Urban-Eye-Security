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
