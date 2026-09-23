# Content Maintenance Scope

Customer: Hangzhou Jianxin Automation Technology Co., Ltd.

## Backend-Driven On Delivery

- Site identity and settings: legal names, public domain, logo, favicon, contact email, phone, WhatsApp, address, SEO title/description/keywords, supported languages and translation profile are stored on the tenant record.
- Product categories: Custom Automation Equipment and Standard Automation Equipment are stored in `product_categories` and read by the products page.
- Products: all 9 verified equipment records are stored in `products` with multilingual name/description fields, overview, applications, process flow, specifications, cover image and gallery image URLs.
- Product media: logo and every product cover are uploaded to the tenant R2 namespace and referenced from Supabase.
- News / Insights: the list and detail routes read published `articles`; no customer-supplied article exists yet, so the public site shows the verified empty state until the customer publishes real articles from the admin backend.
- Inquiries: the contact form writes to `inquiries` after service-side CAPTCHA verification and preserves the target product/application context in the subject field.
- Admin access: `/admin` is proxied to the unified Huanqiu backend; `/admin/login` uses the tenant admin account for this customer.
- Service expiry guard: installed in fail-open mode, registered with `guard_version = 1`, `expires_on = null` and `enforcement_enabled = false`.

## Fixed Layout Content Kept In Code For This Version

- Home hero narrative, application cards, capability cards, manufacturing stats, process steps and FAQ are fixed layout content derived from the customer workbook/PPT and implemented in code.
- These blocks do not expose HTML, CSS, drag-and-drop layout or arbitrary page editing to the customer.
- Their business facts are also represented in tenant settings, product records, product specs/applications and the material fact ledger for audit traceability.

## Future CMS Extension Boundary

- If the customer later needs daily editing for applications, capabilities, equipment lists, qualifications or FAQ, create dedicated tenant-scoped backend collections with draft/publish, sorting, image replacement and version history.
- Such a change is a feature extension and must preserve the current approved layout, responsive behavior, accessibility and service guard contract.
