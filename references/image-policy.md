# Image Policy

## Purpose

Business websites usually launch without polished imagery. This guide tells the Skill how to handle that gap consistently so the operator never ships unintended blank slots and reviewers can see what still needs replacement.

## Where images live

```
assets/
  logo.svg               brand logo (SVG, generated or operator-supplied)
  favicon.svg            browser tab icon (SVG, generated or operator-supplied)
  social-preview.svg     Open Graph share preview, 1200x630 (SVG placeholder by default)
  placeholders/          one file per intended image slot, each with a visible "替换为真实图片" label
  images/                operator-supplied real images go here
```

When the operator provides real images, put them under `assets/images/` and update each referencing page. Leave the corresponding `assets/placeholders/<name>.svg` in place until every reference is migrated, then delete it.

## Default placeholder rules

When real images are not provided:

1. Use SVG placeholders. They are lightweight, render anywhere, and make replacement intent obvious.
2. Each placeholder must include a visible Chinese label "替换为真实图片" near the center.
3. The placeholder's aspect ratio must match the slot it fills: 16:9 hero, 4:3 case card, 1:1 logo, 1200x630 social preview.
4. Use the site accent color at low opacity for the background so the layout reads as intentional rather than broken.
5. Do not generate or fetch photos from the public web. The Skill never proposes copyrighted imagery as filler.

## Image roles by site type

### Enterprise / corporate site (v0.1.0 default)

- 1 hero visual (16:9 or 4:3)
- 3-6 service module icons or thumbnails (1:1 or 4:3)
- 2-4 use case scenario thumbnails (4:3)
- 4-8 proof / case logos (1:1, only if the operator confirms real logos exist)
- 0-1 team or company photo (4:3, optional)
- 1 social preview (1200x630 for OG and Twitter cards)

If the operator has not provided real images, generate SVG placeholders for every slot above, each carrying the visible label.

## Operator communication

When informing the operator about placeholders:

- List all placeholder files in the final pre-package checklist, grouped by page.
- Highlight placeholders in the hero or above-the-fold sections — those should be replaced before public launch.
- Highlight placeholders in legal and contact pages separately — they are usually OK to ship for an internal review version, but should be replaced before a public domain is attached.
- Never claim placeholder imagery is publishable.

## Final checklist fields

Track these before packaging:

- Total placeholder count
- Per-page placeholder count
- Placeholders inside hero / above-the-fold areas (highest priority)
- Placeholders inside contact, privacy, terms
- Open Graph preview source: generated SVG, operator-supplied PNG/JPG, or pending
