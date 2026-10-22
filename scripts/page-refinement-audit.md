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
