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
