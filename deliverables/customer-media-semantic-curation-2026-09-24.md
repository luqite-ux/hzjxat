# Customer Media Semantic Curation Recheck

Date: 2026-09-24

Scope: VIS-CUSTOMER-MEDIA-SEMANTIC-CURATION recheck for Jianxin Automation after formal-domain aesthetic review.

## Findings

- Product media were already mapped to business product records and public alt text used product/business descriptions rather than raw filenames.
- No public `Manufacturing area 01/02/03`, camera sequence number, extracted image number, `IMG_`, `DSC_`, or raw filename caption was found in the source scan.
- The issue found was visual delivery of product media on the public site: product listing and product detail image stages could appear blank in browser evidence when using the R2 absolute product URLs directly.

## Fix

- Added a front-end display resolver for the current Jianxin product R2 URLs so public pages render the same verified local product media assets from `/images/products/*`.
- Kept backend/R2 URLs and database facts intact.
- Improved the products page hero with a restrained catalog summary panel.
- Added a cleaner product image stage for listing cards and the detail hero while preserving product structure and factual imagery.

## Semantic Group Plan

| Group | Role | Public placement | Public wording status |
|---|---|---|---|
| Product equipment covers | Primary product proof | Products list, product detail hero, related systems | Business product names and equipment alt text |
| Company/workshop media | Trust and capability proof | Home, About, Capabilities | Business scene alt text, no source filenames |
| Capability software screenshots | Supporting capability proof | Capabilities/Home capability cards | Capability titles and descriptive alt text |
| Brand logo | Identity proof | Header, footer, favicon source | Brand alt text |

## Results

- `customer_media_semantic_curation_result`: PASS
- `customer_media_optimization_result`: PASS
- `customer_media_grouped_layout_result`: PASS
- `customer_media_public_filename_leak_result`: ABSENT
- Desktop evidence: `deliverables/visual/media-semantic-curation-2026-09-24/desktop-products.png`, `deliverables/visual/media-semantic-curation-2026-09-24/desktop-product-detail.png`
- 390px evidence: `deliverables/visual/media-semantic-curation-2026-09-24/mobile-390-products-cards.png`, `deliverables/visual/media-semantic-curation-2026-09-24/mobile-390-product-detail.png`
- Production SHA: `5ce3b4ffdebcf3b4fe9c4dcfa950ed3d650ffc54`
- Formal-domain desktop evidence: `deliverables/visual/media-semantic-curation-2026-09-24-production/formal-desktop-products.png`, `deliverables/visual/media-semantic-curation-2026-09-24-production/formal-desktop-product-detail.png`
- Formal-domain 390px evidence: `deliverables/visual/media-semantic-curation-2026-09-24-production/formal-mobile-390-products-cards.png`, `deliverables/visual/media-semantic-curation-2026-09-24-production/formal-mobile-390-product-detail.png`

