# DESIGN.md Guide

## Purpose

Use DESIGN.md-style design system files to increase visual variety while keeping the output consistent and maintainable.

## When to Use

Use this guide when:

- The operator provides a `DESIGN.md` file or pastes design rules.
- The operator references a design.md resource.
- The operator asks for a more diverse or specific visual style.
- The operator gives a reference website and asks for a similar feel without copying.

## How to Apply

Extract:

- Brand personality
- Color tokens
- Typography direction
- Layout density
- Card and section style
- Button style
- Imagery direction
- Motion preference
- Responsive behavior

Then map them into the generated static site:

- CSS variables for colors and spacing
- Reusable button/card/section classes
- Consistent header, footer, and page shells
- Matching logo/icon direction
- Mobile-friendly layout rules

## Built-in Style Presets

Use these when no DESIGN.md is provided:

1. 稳重可信：B2B、传统企业、服务商
2. 科技现代：AI、SaaS、数据、制造科技
3. 高端专业：咨询、金融、出海服务
4. 清爽简洁：中小企业官网、工作室
5. 活力增长：营销、广告、APP、游戏

## Safety

- Do not copy a reference site's code, trademarks, proprietary text, or exact visual identity.
- Use references as high-level direction only.
- Keep pages usable when opened directly from `index.html`.
