# Static Business Site Standards

## Purpose

Build a credible enterprise landing page that can be shipped as static HTML. The page should help a visitor answer four questions quickly:

1. Who is this company?
2. What problem does it solve?
3. Why should I trust it?
4. What should I do next?

## Required Inputs

Collect these before finalizing copy:

- Brand name
- One-line positioning
- Target customer
- Core product or service
- Three to five concrete selling points
- Primary action button
- Contact method
- Language
- Visual style or reference sites

If proof such as customer logos, metrics, awards, or testimonials is missing, use neutral placeholders and mark them clearly for replacement.

## Page Structure

Use this default structure unless the user asks otherwise:

1. Header: brand, short navigation, primary action button.
2. Hero: positioning, value proposition, primary action button, secondary action button if useful.
3. Trust strip: metrics, customer types, compliance, delivery coverage, or proof placeholders.
4. Services/products: three to six offering cards.
5. Use cases: two to four target scenarios.
6. Differentiators: what makes the company meaningfully different.
7. Process: how customers start, evaluate, buy, or cooperate.
8. Proof: testimonials, logos, case snippets, certifications, or placeholders.
9. FAQ: practical objections and answers.
10. Final action area: repeat primary action and contact details.
11. Footer: company, navigation, contact, legal placeholders.

## Copy Rules

- Prefer concrete statements over generic claims.
- Avoid empty phrases such as "industry-leading", "empower your business", and "one-stop solution" unless backed by specifics.
- Keep hero heading short and literal.
- Make action button text clear and action-oriented, such as "预约演示", "获取方案", or "联系我们".
- If writing Chinese copy, use concise business Chinese and avoid machine-translation tone.
- If writing English copy, prefer plain international business English.

## Visual Rules

- Show the subject clearly in the first viewport.
- Use restrained enterprise styling: clean layout, strong spacing, readable typography, and clear hierarchy.
- Avoid decorative gradient-only hero areas when product/service imagery or a concrete interface mockup would communicate better.
- Ensure mobile layout is complete, not merely squeezed.
- Use cards only for repeated items such as services, use cases, proof points, or FAQs.
- Keep header and main action button visible and easy to scan.

## Static Site Rules

- Keep all generated code in `index.html` unless the page becomes too large; then split to `assets/styles.css` and `assets/main.js`.
- Use relative links for local assets.
- Do not use build tooling by default.
- The page must work when `index.html` is opened directly from the local file system.
- Do not depend on Python, Node.js, local web servers, package managers, or build commands for operator preview.
- Avoid browser features that require an HTTP server, such as JavaScript modules or local `fetch()` calls for page content.
- Do not require external fonts, analytics, chat widgets, or form providers unless the user explicitly requests them.
- For forms, default to a static action link such as email, phone, or contact URL. Do not imply submissions are stored unless a backend exists.

## QA Checklist

Before handoff:

- `index.html` exists at site root.
- Page has viewport meta.
- Navigation anchors work or gracefully point to existing sections.
- Local image, CSS, and JS references resolve.
- Desktop layout has no obvious overlap.
- Mobile layout wraps rather than clipping.
- Main action button and contact method are present.
- Placeholder proof content is labeled if not real.
- The site can be previewed by opening `index.html` directly.
- The site can be packaged as a zip with OS built-in compression without hidden build requirements.
