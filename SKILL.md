---
name: frontage
description: 'Guide non-technical operators to create, refine, preview, validate, and optionally package pure static multi-page business websites — enterprise/corporate sites, product/service landing pages, APP marketing sites, and game/developer sites — without requiring frontend frameworks, build tools, Git, or CI. Output is a static site directory by default, with an optional zip when the chosen handoff or deploy target needs one. Triggers on "建企业官网 / 做公司网站 / 企业官网落地页 / 公司官网 / 品牌官网 / 产品落地页 / APP 官网 / 游戏官网 / 静态网站 / 静态站打包 / Cloudflare Pages 上传 / GitHub 管理 / FTP 上传", or "build a company website / corporate landing page / enterprise site / product landing page / APP marketing site / game studio site / static site / static site zip for Cloudflare Pages / GitHub-managed static site / FTP upload".'
---

# frontage

> **v0.1.0 scope: enterprise / corporate sites.** The architecture is built to extend to SaaS landing pages, APP marketing sites, and game/developer sites in later releases. When in doubt, default to the corporate template under `assets/templates/corporate/`.

## Update check (non-blocking)

At the start of every task, run `node scripts/check-update.mjs` from the skill directory when Node.js is available in the agent environment. It performs a read-only version check at most once per day and prints one line when a newer frontage is available; relay that line to the user, then continue. It supports Windows PowerShell and macOS environments, sends no data, fails silently when offline or sandboxed, and must never block the work.

## Core Workflow

Create a pure static multi-page business website that an operator can preview locally, revise with natural language, validate, and hand off as a site directory or optional zip depending on the chosen deploy path.

Follow this order:

1. Choose the intake mode from the user's prompt: guided, quick, or free-form.
2. For guided mode, read `references/operator-guided-flow.md` and ask option-based questions in small batches.
3. Read `references/page-matrix.md` to choose required and optional pages based on site type.
4. Read `references/design-md-guide.md` for any style decision (preset, pasted DESIGN.md, or operator-supplied URL). In guided mode, proactively recommend a short DESIGN.md calibration step before falling back to built-in presets. If the operator wants help finding a non-preset style, mentions a discovery catalog (refero / getdesign.md), pastes a catalog URL, or points at a brand site for inspiration, also read `references/design-md-discovery.md`.
5. Read `references/brand-assets-guide.md` before generating logo, favicon, or icon assets.
6. Read `references/image-policy.md` before generating image placeholders or replacing images.
7. Read `references/legal-page-templates.md` before creating privacy policy, terms, or other legal-style pages.
8. Read `references/site-standards.md` before designing page structure or visual direction.
9. Ask the operator which handoff or deploy target they prefer. Default to **site directory only / decide later** unless the user has already named a platform. Match the choice to a guide under `references/deploy/`; if no matching guide exists, follow `references/deploy/_template.md` to outline a generic static-file handoff and note that a target-specific guide can be added later.
10. Use `assets/templates/corporate/` as the starting structure for an enterprise/corporate site unless the user provides an existing site.
11. Produce a self-contained static site directory with `index.html`, selected subpages, and local assets under `assets/`.
12. Preview by opening `index.html` directly in a browser or with the agent's in-app browser tooling. Do not require a local web server for normal operator preview.
13. Iterate with the operator until they explicitly choose a final handoff option.
14. Before final handoff, run **Required Final QA** (see below). Fix any errors and re-run.
15. Present the final handoff checklist and ask whether they need a zip.
16. Package only when the selected handoff or deploy target needs a zip, or when the operator explicitly asks for one.
17. Hand the operator the site directory, optional zip path, and the chosen deploy guide.

## Intake Modes

Use guided mode by default when the operator gives little detail, says they are unsure, asks to create a website, or only names the business type.

Use quick mode when the operator wants speed. Ask only for brand name, business type, target customer, main offer, primary action button, and contact method. Fill missing non-critical details with sensible defaults and mark uncertain content as placeholders.

Use free-form mode when the operator provides a complete brief. Summarize assumptions once, then generate the first version without excessive questioning.

In guided mode:

- Ask at most three questions per message.
- Provide numbered options and allow free-text answers.
- Always include "not sure, use recommended default" when uncertainty is likely.
- Before style selection, explain that a DESIGN.md is a visual direction sheet and recommend choosing one from a reference catalog or pasting a reference URL when the operator has a visual preference.
- Stop questioning after three rounds unless a missing item blocks generation.
- Before generation, summarize selected choices and ask for a simple confirmation.
- If the operator skips details, generate a first version with clearly marked placeholders.

## In-place Revision Policy

After the first version is generated, keep all subsequent revisions inside the **same site directory**. Do not create new dated or numbered folders per revision round. Tell the operator the directory path once at first generation, then keep using it across every revision.

Exception: if the operator explicitly asks to fork a new version (e.g., "save a copy as v2"), create a sibling directory and confirm the new path with them.

Keeping a single stable path lets the operator find the same preview file in their file manager across rounds, and lets validation, optional packaging, and handoff always target the right tree.

## Revision and Handoff Gate

Do not create a zip immediately after the first version unless the operator explicitly asks for a zip-based deploy or final package. Normal workflow is draft -> preview -> revise -> confirm -> choose handoff. Packaging is optional.

After each preview round, offer focused revision options:

1. 文案调整
2. 风格调整
3. 页面/板块增删
4. Logo / Icon / 图片调整
5. 用户协议 / 隐私政策 / 联系信息替换
6. 选择交付方式 / 准备发布

When the operator chooses final handoff, run Required Final QA first, then show this checklist:

- Required pages present or intentionally excluded
- Contact page content complete
- Privacy policy status: user-provided, generated draft, or pending replacement
- Terms / user agreement status: user-provided, generated draft, or pending replacement
- Logo, favicon, and social-preview status
- Placeholder text or images still present (count by page; hero/above-the-fold called out)
- Links and navigation checked
- Open Graph and Twitter Card meta tags present on every page
- Handoff method confirmed: site directory, zip, GitHub repository, FTP upload, hosting dashboard, or decide later
- Zip needed: yes / no / not sure

If the operator chooses a zip, also confirm that the zip root will contain `index.html`. Package only after the operator confirms the checklist and the zip need.

## Required Final QA

Before showing the final checklist, the agent must run validation in its own environment:

```bash
node <skill-dir>/scripts/validate-static-site.mjs <site-dir>
```

Fix validation errors in the site directory, then re-run the command.

When a zip is needed, use the packaging script after validation:

```bash
node <skill-dir>/scripts/package-static-site.mjs <site-dir> <output.zip>
```

The packaging script invokes `scripts/validate-static-site.mjs` first. On any validation error it aborts and prints the failing items. Fix the errors in the site directory, then re-run the same command.

The script is pure Node.js and does not require `zip`, `python3`, or any other external tool beyond a Node runtime in the agent's environment.

If the agent environment lacks Node.js, the agent must:

1. Tell the operator that automated QA is unavailable in this session.
2. Manually verify each item in the `references/site-standards.md` QA Checklist.
3. If a zip is needed, use OS-native zip (see *Preview and Handoff Policy*) to produce it.

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
- Do not require the operator to install build toolchains or local web servers. Browser preview plus final QA is the default path; packaging is only for zip-based handoff.

## Preview and Handoff Policy

Operator-facing preview path:

1. Open `index.html` directly in Chrome, Edge, Safari, or the agent's in-app browser.
2. Revise the page based on visual feedback.
3. Once the operator confirms the final checklist, hand them the site directory and the chosen deploy or handoff guide.
4. Produce a zip only when the chosen target needs a zip, such as Cloudflare Pages Direct Upload, or when the operator explicitly asks for one.

Common handoff modes:

- **Site directory only**: best for GitHub management, FTP/SFTP upload, existing hosting panels, or when the operator wants to decide later.
- **Zip**: best for Cloudflare Pages Direct Upload or any dashboard that explicitly asks for a zip file.
- **GitHub repository**: commit or hand off the static files directly; do not zip unless the user asks for a release asset.
- **FTP/SFTP upload**: upload the contents of the site directory; do not zip unless the hosting panel requires archive upload.

If a zip is needed and the packaging script cannot run, fall back to OS-native zip:

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
- `references/deploy/github-static.md`: GitHub-managed static site handoff guide.
- `references/deploy/ftp-upload.md`: FTP/SFTP or hosting-panel static file upload guide.
- `references/deploy/_template.md`: template for adding new deploy target guides.
- `assets/templates/corporate/`: starter static site files for enterprise/corporate sites — copy before customization.
- `scripts/check-update.mjs`: cross-platform non-blocking daily update check.
- `scripts/validate-static-site.mjs`: site validator. Required before final handoff.
- `scripts/package-static-site.mjs`: pure-Node packaging step. Validates first, then produces the zip when zip output is needed.

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
DESIGN.md 或参考风格：
参考网站：
主要行动按钮（希望访客点击后做什么）：
联系方式：
语言：
交付方式：先生成站点目录；如需 Cloudflare Pages Direct Upload 再打包 zip，若用 GitHub 管理或 FTP 上传则不打包。
要求：纯静态 HTML，生成后先预览和多轮调整；我确认最终清单后再选择是否打包。
```
