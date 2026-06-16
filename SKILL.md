---
name: frontage
description: 'Guide non-technical operators to create, refine, preview, and package pure static multi-page business websites — enterprise/corporate sites, product/service landing pages, APP marketing sites, and game/developer sites — without requiring frontend frameworks, build tools, Git, or CI. Output is a Cloudflare-Pages-ready zip. Triggers on "建企业官网 / 做公司网站 / 企业官网落地页 / 公司官网 / 品牌官网 / 产品落地页 / APP 官网 / 游戏官网 / 静态网站 / 静态站打包 / Cloudflare Pages 上传", or "build a company website / corporate landing page / enterprise site / product landing page / APP marketing site / game studio site / static site zip for Cloudflare Pages".'
---

# frontage

> **v0.1.0 scope: enterprise / corporate sites.** The architecture is built to extend to SaaS landing pages, APP marketing sites, and game/developer sites in later releases. When in doubt, default to the corporate template under `assets/templates/corporate/`.

## Core Workflow

Create a pure static multi-page business website that an operator can preview locally, revise with natural language, confirm, package as a zip using built-in OS features, and upload to static hosting such as Cloudflare Pages.

Follow this order:

1. Choose the intake mode from the user's prompt: guided, quick, or free-form.
2. For guided mode, read `references/operator-guided-flow.md` and ask option-based questions in small batches.
3. Read `references/page-matrix.md` to choose required and optional pages based on site type.
4. Read `references/design-md-guide.md` when the user provides or asks for design.md-driven style.
5. Read `references/brand-assets-guide.md` before generating logo, favicon, or icon assets.
6. Read `references/legal-page-templates.md` before creating privacy policy, terms, or other legal-style pages.
7. Read `references/site-standards.md` before designing page structure or visual direction.
8. Use `assets/templates/corporate/` as the starting structure for an enterprise/corporate site unless the user provides an existing site.
9. Produce a self-contained static site directory with `index.html`, selected subpages, and local assets under `assets/`.
10. Preview by opening `index.html` directly in a browser or with the agent's in-app browser tooling. Do not require a local web server for normal operator preview.
11. Iterate with the operator until they explicitly choose packaging or final export.
12. Before packaging, present a final checklist: missing content, placeholders, legal pages, contact data, brand assets, links, and pages selected/excluded.
13. Package only after the operator confirms the checklist.
14. Use bundled scripts as optional QA helpers when Node.js is already available in the agent environment.
15. Provide the site directory, zip guidance, and a short deployment note.

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

## Revision and Packaging Gate

Do not create a zip immediately after the first version unless the operator explicitly asks for final packaging. Normal workflow is draft -> preview -> revise -> confirm -> package.

After each preview round, offer focused revision options:

1. 文案调整
2. 风格调整
3. 页面/板块增删
4. Logo/Icon 调整
5. 用户协议/隐私政策/联系信息替换
6. 准备最终打包

When the operator chooses final packaging, show this checklist first:

- Required pages present or intentionally excluded
- Contact page content complete
- Privacy policy status: user-provided, generated draft, or pending replacement
- Terms/user agreement status: user-provided, generated draft, or pending replacement
- Logo and icon status
- Placeholder text or images still present
- Links and navigation checked
- Zip root will contain `index.html`

Package only after the operator confirms the checklist.

## Output Contract

The final site must:

- Use plain static files only: HTML, CSS, browser JavaScript, images, fonts, and icons.
- Put the homepage at `index.html` in the site root.
- Include required pages from the selected site type, usually including `contact.html`, `privacy.html`, and `terms.html`.
- Include basic local brand assets such as `assets/logo.svg` and `assets/favicon.svg` unless the user provides their own assets or opts out.
- Use relative local paths for site assets.
- Include `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Work without a build step.
- Work when `index.html` is opened directly from the file system.
- Avoid remote script dependencies unless the user explicitly approves them.
- Avoid JavaScript modules, `fetch()` for local content, client-side routing requirements, or other browser behaviors that need an HTTP server.
- Avoid Git, CI, framework setup, CMS setup, and backend services by default.
- Do not require the operator to install build toolchains or local web servers. Browser preview plus OS built-in zip is the operator's default path.

## Preview and Packaging Policy

Default operator path:

1. Open `index.html` directly in Chrome, Edge, Safari, or the agent's in-app browser.
2. Revise the page based on visual feedback.
3. Select the contents of the generated site directory, such as `index.html` and `assets/`, then create a zip with the operating system's built-in compression feature.
4. Upload the zip to static hosting.

Important packaging rule: compress the contents of the site directory, not the parent folder itself. The zip root should contain `index.html`.

Windows-friendly packaging:

- Prefer File Explorer: open the site directory, select all contents, right-click, choose "Compress to ZIP file" or "Send to > Compressed (zipped) folder".
- If using PowerShell, use `Compress-Archive` only as an optional convenience.

macOS-friendly packaging:

- Prefer Finder: open the site directory, select all contents, right-click, choose "Compress".
- Terminal commands are optional and should not be required for operators.

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

- `references/site-standards.md`: business site homepage structure, copy rules, visual QA, and anti-patterns.
- `references/operator-guided-flow.md`: option-based intake flow for non-technical operators.
- `references/page-matrix.md`: required and optional pages by site type.
- `references/design-md-guide.md`: how to use design.md files or design references for varied visual styles.
- `references/brand-assets-guide.md`: logo, favicon, icon, and brand asset generation rules.
- `references/legal-page-templates.md`: contact, privacy, terms, and legal-style page handling.
- `assets/templates/corporate/`: starter static site files for enterprise/corporate sites — copy before customization.
- `scripts/validate-static-site.mjs`: optional QA helper for Codex or maintainers when Node.js is available.
- `scripts/package-static-site.mjs`: optional packaging helper for Codex or maintainers when Node.js is available.

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

## Optional Technical Validation

If Node.js is already available in the agent environment, these helpers may be used:

```bash
node <skill-dir>/scripts/validate-static-site.mjs <site-dir>
node <skill-dir>/scripts/package-static-site.mjs <site-dir> <output.zip>
```

If Node.js is unavailable, fall back to direct browser preview plus OS built-in zip.
