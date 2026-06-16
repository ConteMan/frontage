# Brand Assets Guide

## Purpose

Generate simple brand assets that are usable in a static site without requiring design software.

## Default Assets

Create these unless the user provides existing assets or opts out:

- `assets/logo.svg`: text logo or monogram logo
- `assets/favicon.svg`: simple icon for browser tab
- Optional `assets/social-preview.svg`: share preview placeholder

## Operator Questions

Ask simple choices:

```text
Logo/Icon 风格：

1. 文字标识：直接使用品牌名
2. 首字母图标：使用品牌首字母或缩写
3. 几何符号：抽象但简洁
4. 科技感符号：适合 AI、SaaS、数据、制造科技
5. 不确定：使用推荐默认值
```

## Rules

- Prefer SVG for logo and favicon because it is lightweight and static-site friendly.
- Keep generated logos simple and editable.
- Do not promise trademark availability or legal uniqueness.
- If the user provides a logo, use it and avoid redesigning unless asked.
- Keep logo colors aligned with the selected design style or DESIGN.md.

## Final Checklist

Before packaging, report:

- Logo source: generated / user-provided / pending
- Favicon source: generated / user-provided / pending
- Any brand placeholders still present
