---
name: frontage
description: 'Guide non-technical operators to create, refine, preview, and package pure static multi-page business websites — enterprise/corporate sites, product/service landing pages, APP marketing sites, and game/developer sites — without requiring frontend frameworks, build tools, Git, or CI. Output is a Cloudflare-Pages-ready zip. Triggers on "建企业官网 / 做公司网站 / 企业官网落地页 / 公司官网 / 品牌官网 / 产品落地页 / APP 官网 / 游戏官网 / 静态网站 / 静态站打包 / Cloudflare Pages 上传", or "build a company website / corporate landing page / enterprise site / product landing page / APP marketing site / game studio site / static site zip for Cloudflare Pages".'
---

# frontage

> **v0.1.0 scope: enterprise / corporate sites.** The architecture is built to extend to SaaS landing pages, APP marketing sites, and game/developer sites in later releases. When in doubt, default to the corporate template under `assets/templates/corporate/`.

## Update check (non-blocking)

At the start of every task, run `bash scripts/check-update.sh` from the skill directory. It performs a read-only version check at most once per day and prints one line when a newer frontage is available; relay that line to the user, then continue. It sends no data, fails silently when offline or sandboxed, and must never block the work.

## Core Workflow

Create a pure static multi-page business website that an operator can preview locally, revise with natural language, confirm, package as a zip, and upload to static hosting such as Cloudflare Pages.

Follow this order:

1. Choose the intake mode from the user's prompt: guided, quick, or free-form.
2. For guided mode, read `references/operator-guided-flow.md` and ask option-based questions in small batches.
3. Read `references/page-matrix.md` to choose required and optional pages based on site type.
4. Read `references/design-md-guide.md` for any style decision (preset, pasted DESIGN.md, or operator-supplied URL). If the operator wants help finding a non-preset style, mentions a discovery catalog (refero / getdesign.md), pastes a catalog URL, or points at a brand site for inspiration, also read `references/design-md-discovery.md`.
5. Read `references/brand-assets-guide.md` before generating logo, favicon, or icon assets.
6. Read `references/image-policy.md` before generating image placeholders or replacing images.
7. Read `references/legal-page-templates.md` before creating privacy policy, terms, or other legal-style pages.
8. Read `references/site-standards.md` before designing page structure or visual direction.
9. Ask the operator which deploy target they prefer. Default to **Cloudflare Pages Direct Upload** for v0.1.0. Match the choice to a guide under `references/deploy/`; if no matching guide exists, follow `references/deploy/_template.md` to outline a generic zip-upload flow and note that a target-specific guide can be added later.
10. Use `assets/templates/corporate/` as the starting structure for an enterprise/corporate site unless the user provides an existing site.
11. Produce a self-contained static site directory with `index.html`, selected subpages, and local assets under `assets/`.
12. Preview by opening `index.html` directly in a browser or with the agent's in-app browser tooling. Do not require a local web server for normal operator preview.
13. Iterate with the operator until they explicitly choose packaging or final export.
14. Before packaging, run **Required Pre-Package QA** (see below). Fix any errors and re-run.
15. Present the final pre-package checklist.
16. Package only after the operator confirms the checklist.
17. Hand the operator the site directory, the zip path, and the chosen deploy guide.

## Intake Modes

Use guided mode by default when the operator gives little detail, says they are unsure, asks to create a website, or only names the business type.

Use quick mode when the operator wants speed. Ask only for brand name, business type, target customer, main offer, primary action button, and contact method. Fill missing non-critical details with sensible defaults and mark uncertain content as placeholders.

Use free-form mode when the operator provides a complete brief. Summarize assumptions once, then generate the first version without excessive questioning.

In guided mode:

- Ask at most three questions per message.
- Provide numbered options and allow free-text answers.
- Always include "not sure, use recommended default" when uncertainty is likely.
- Stop questioning after three rounds unless a missing item blocks generation.
- Before generation, summarize selected choices and ask for a simple confirmation.
- If the operator skips details, generate a first version with clearly marked placeholders.

## In-place Revision Policy

After the first version is generated, keep all subsequent revisions inside the **same site directory**. Do not create new dated or numbered folders per revision round. Tell the operator the directory path once at first generation, then keep using it across every revision.

Exception: if the operator explicitly asks to fork a new version (e.g., "save a copy as v2"), create a sibling directory and confirm the new path with them.

Keeping a single stable path lets the operator find the same preview file in their file manager across rounds, and lets validation and packaging always target the right tree.

## Revision and Packaging Gate

Do not create a zip immediately after the first version unless the operator explicitly asks for final packaging. Normal workflow is draft -> preview -> revise -> confirm -> package.

After each preview round, offer focused revision options:

1. 文案调整
2. 风格调整
3. 页面/板块增删
4. Logo / Icon / 图片调整
5. 用户协议 / 隐私政策 / 联系信息替换
6. 准备最终打包

When the operator chooses final packaging, run Required Pre-Package QA first, then show this checklist:

- Required pages present or intentionally excluded
- Contact page content complete
- Privacy policy status: user-provided, generated draft, or pending replacement
- Terms / user agreement status: user-provided, generated draft, or pending replacement
- Logo, favicon, and social-preview status
- Placeholder text or images still present (count by page; hero/above-the-fold called out)
- Links and navigation checked
- Open Graph and Twitter Card meta tags present on every page
- Zip root will contain `index.html`
- Deploy target confirmed

Package only after the operator confirms the checklist.

## Required Pre-Package QA

Before showing the final checklist, the agent must run in its own environment:

```bash
node <skill-dir>/scripts/package-static-site.mjs <site-dir> <output.zip>
```

The packaging script invokes `scripts/validate-static-site.mjs` first. On any validation error it aborts and prints the failing items. Fix the errors in the site directory, then re-run the same command.

The script is pure Node.js and does not require `zip`, `python3`, or any other external tool beyond a Node runtime in the agent's environment.

If the agent environment lacks Node.js, the agent must:

1. Tell the operator that automated QA is unavailable in this session.
2. Manually verify each item in the `references/site-standards.md` QA Checklist.
3. Use OS-native zip (see *Preview and Packaging Policy*) to produce the final zip.

Operators are never asked to install Node.js. The QA step is the agent's responsibility, not the operator's.

## Output Contract

The final site must:

- Use plain static files only: HTML, CSS, browser JavaScript, images, fonts, and icons.
- Put the homepage at `index.html` in the site root.
- Include required pages from the selected site type, usually including `contact.html`, `privacy.html`, and `terms.html`.
- Include basic local brand assets such as `assets/logo.svg`, `assets/favicon.svg`, and `assets/social-preview.svg` unless the user provides their own assets or opts out.
- Include Open Graph and Twitter Card meta tags on every page (`og:type`, `og:title`, `og:description`, `og:image`, `twitter:card`).
- Use relative local paths for site assets.
- Include `<meta name="viewport" content="width=device-width, initial-scale=1">` on every page.
- Have a non-empty `<title>` and non-empty `<meta name="description">` on every page.
- Work without a build step.
- Work when `index.html` is opened directly from the file system.
- Avoid remote script dependencies unless the user explicitly approves them.
- Avoid JavaScript modules, `fetch()` for local content, client-side routing requirements, or other browser behaviors that need an HTTP server.
- Avoid Git, CI, framework setup, CMS setup, and backend services by default.
- Do not require the operator to install build toolchains or local web servers. Browser preview plus the packaging script (or OS-native zip as fallback) is the operator's default path.

## Preview and Packaging Policy

Operator-facing preview path:

1. Open `index.html` directly in Chrome, Edge, Safari, or the agent's in-app browser.
2. Revise the page based on visual feedback.
3. Once the operator confirms the final checklist, hand them the zip produced by the packaging script (see Required Pre-Package QA).
4. Operator uploads the zip to the chosen deploy target (see `references/deploy/`).

If for any reason the packaging script cannot run, fall back to OS-native zip:

- **Windows**: open the site directory in File Explorer, select all contents, right-click → "Compress to ZIP file".
- **macOS**: open the site directory in Finder, select all contents, right-click → "Compress".

Important packaging rule: compress the contents of the site directory, not the parent folder itself. The zip root must contain `index.html`.

## Enterprise Landing Page Shape

Default sections:

1. Header with brand name, navigation, and primary action button.
2. Hero with clear positioning, proof point, and primary action button.
3. Trust or value strip.
4. Product/service highlights.
5. Use cases or target customer scenarios.
6. Differentiators.
7. Process or delivery method.
8. Testimonials, customer logos, or proof placeholders when real proof is unavailable.
9. FAQ.
10. Final action area and footer contact details.

Keep the first screen clear and concrete. The user should understand who the company serves, what it offers, and what action to take without scrolling.

## Resource Guide

- `references/site-standards.md`: business site homepage structure, copy rules, visual QA, anti-patterns.
- `references/operator-guided-flow.md`: option-based intake flow for non-technical operators.
- `references/page-matrix.md`: required and optional pages by site type.
- `references/design-md-guide.md`: DESIGN.md schema, built-in preset definitions, and the agent's application rules.
- `references/design-md-discovery.md`: where to source a DESIGN.md (refero / getdesign.md catalogs, reference brand sites) and the license boundaries around third-party content.
- `references/brand-assets-guide.md`: logo, favicon, icon, and brand asset generation rules.
- `references/image-policy.md`: image roles, SVG placeholder rules, and replacement workflow.
- `references/legal-page-templates.md`: contact, privacy, terms, and legal-style page handling.
- `references/deploy/cloudflare-pages.md`: Cloudflare Pages Direct Upload deploy guide.
- `references/deploy/_template.md`: template for adding new deploy target guides.
- `assets/templates/corporate/`: starter static site files for enterprise/corporate sites — copy before customization.
- `scripts/validate-static-site.mjs`: site validator. Invoked automatically by the packaging script.
- `scripts/package-static-site.mjs`: pure-Node packaging step. Validates first, then produces the zip. **Required** before showing the final checklist.

## Operator Prompt Template

When the user needs a starting prompt, offer this template:

```text
使用 $frontage，以向导模式帮我生成一个企业官网落地页。

品牌名：
一句话定位：
目标用户：
核心产品或服务：
核心卖点：
期望风格：
参考网站：
主要行动按钮（希望访客点击后做什么）：
联系方式：
语言：
部署目标：Cloudflare Pages Direct Upload
要求：纯静态 HTML，生成后先预览和多轮调整；我确认最终清单后再打包 zip。
```
