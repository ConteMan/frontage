# DESIGN.md Guide

## Purpose

Use a DESIGN.md to drive the generated site's visual identity. The same workflow can accept design specs from many sources — operator-written, copied from a discovery catalog, distilled from a reference website, or one of the built-in presets.

The goal is **consistency** (every section follows the same tokens) and **diversity** (the same skill ships visually different sites depending on the DESIGN.md it consumes).

## When a DESIGN.md is in play

- The operator pastes one in chat.
- The operator picks one from a discovery catalog (see `design-md-discovery.md`).
- The operator points at a reference website and asks for "similar feel".
- The agent extracts visible tokens from a sibling project the operator references.

If none of the above apply, use one of the built-in presets at the bottom of this file.

Order of precedence when multiple sources exist:

```
explicit operator preference
  > pasted DESIGN.md
  > catalog selection (refero / getdesign.md)
  > sibling project scan
  > reference URL extraction
  > built-in preset
```

## Schema

Treat any incoming DESIGN.md as a partially-filled instance of this schema. Missing sections fall back to built-in preset defaults; extra sections are passed through where they make sense.

### `## Identity` (required)

- Brand personality: 3-6 adjectives describing the visual tone
- Voice: how copy should sound (formal, conversational, technical, …)
- Target audience snapshot: 1-2 lines

### `## Tokens` (required)

- **Colors** — at least `--bg`, `--panel`, `--text`, `--muted`, `--brand`, `--brand-dark`, `--line`. Provide concrete hex / hsl values, not adjectives.
- **Typography** — heading font stack, body font stack, monospace stack if relevant. Weight pairs (e.g., body 400 / heading 600). Line-height ranges.
- **Spacing scale** — numeric scale (e.g., 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64) plus a default `--radius`.

### `## Layout` (required)

- Density: compact / balanced / spacious
- Container width: e.g., `min(1120px, calc(100% - 40px))`
- Breakpoints: at least mobile and tablet
- Hero composition guidance: visual placement, ratio, aspect

### `## Components` (recommended)

- Buttons: primary, secondary, ghost — size, radius, hover/active behavior
- Cards: border, shadow, padding, hover behavior
- Inputs: only when forms are part of the site
- Section rhythm: vertical padding scale between sections

### `## Imagery` (recommended)

- Photographic style: editorial / candid / product / abstract / none
- Illustration style: geometric / hand-drawn / gradient / none
- Icon family: line / solid / duotone / brand-custom
- Hero visual direction — see also `image-policy.md`

### `## Motion` (optional)

- Easing curves
- Duration scale (e.g., 120ms / 200ms / 360ms)
- Interaction style: subdued / lively / springy

### `## References` (optional)

- Source URLs the DESIGN.md was distilled from
- Operator notes the agent should preserve verbatim

## How the agent applies a DESIGN.md

1. Parse the incoming DESIGN.md into the schema above. For each slot record one of `provided`, `defaulted`, `inherited-from-preset`.
2. Generate CSS variables for every Token in `:root`.
3. Build reusable utility classes (`.button`, `.button-secondary`, `.card`, `.section-head`) keyed off those variables — never inline values that the schema covers.
4. Apply the layout density, container width, and breakpoints uniformly to every page in the site.
5. Pick or generate brand assets (logo, favicon, social preview) to match the Imagery direction.
6. Record the schema fill state in the pre-package checklist so the operator can see which tokens came from the DESIGN.md vs. defaults.

## Built-in Style Presets

Use one of these when no DESIGN.md is provided:

1. **稳重可信** — B2B、传统企业、服务商：冷灰背景 + 深蓝主色，密度均衡，无强阴影。
2. **科技现代** — AI、SaaS、数据、制造科技：浅底深字 + 蓝紫主色，卡片化布局，数据可视化友好。
3. **高端专业** — 咨询、金融、出海服务：米白底 + 深墨/深咖主色，宽间距，衬线标题。
4. **清爽简洁** — 中小企业官网、工作室：纯白底，单一品牌色，圆角较大，密度宽松。
5. **活力增长** — 营销、广告、APP、游戏：彩色主色 + 强对比，圆角大，按钮带动效。

Each preset is a built-in mapping into the schema above. If the operator picks a preset and later pastes a partial DESIGN.md, treat the preset as the base and the DESIGN.md as overrides.

## Safety

- Do not copy a reference site's code, trademarks, proprietary text, or exact visual identity.
- A DESIGN.md describes inspiration; generated CSS, copy, and imagery must remain original.
- Keep pages usable when opened directly from `index.html` (no HTTP server required).
- When the source is a catalog like `styles.refero.design` or `getdesign.md`, the content is the catalog author's interpretation of a third-party brand. Use it as direction only, never as licensed assets.
