# DESIGN.md Discovery

## Purpose

Tell operators where to find a DESIGN.md when they want visual variety beyond the built-in presets, and how to bring it into a frontage session without losing legal clarity.

## Recommended catalogs

- **[styles.refero.design](https://styles.refero.design)** — 2,000+ DESIGN.md examples interpreting well-known product brands (Linear, Apple, Mercury, Reflect, Adaline, …). Strong on visual diversity and modern trends.
- **[getdesign.md](https://getdesign.md/design-md)** — ~300 design analyses grouped by industry (Fintech, SaaS, AI / ML, productivity, e-commerce). Strong on enterprise / business fit.

These catalogs are independent third-party services. frontage does not redistribute their content and does not depend on either being reachable.

## Operator flow

1. Operator opens one of the catalogs.
2. Operator filters by industry, vibe, or search term.
3. Operator opens a style page they like.
4. Operator either:
   - Copies the visible DESIGN.md text and pastes it into chat, **or**
   - Pastes the style page URL into chat and asks frontage to fetch it.
5. The agent parses the content against the `design-md-guide.md` schema and proceeds with generation.

## When the operator pastes DESIGN.md content

Treat the pasted text as the canonical DESIGN.md. Run it through the schema parser, mark missing sections, and continue.

## When the operator pastes a catalog URL

The agent fetches the URL **once** in its own environment (Codex sandbox / Claude Code), extracts the DESIGN.md content, then continues as if the operator pasted it. Show the operator a one-line summary of what was extracted so they can confirm.

Rules:

- Fetch only the specific URL the operator provided. Do not crawl other catalog pages.
- Do not cache or persist the fetched content beyond the current session.
- Do not save it into the frontage repository or commit it to any project.
- If the fetch fails (offline, blocked, layout changed), tell the operator and offer the paste fallback.

## When the operator gives a brand site URL (no catalog involved)

Sometimes the operator says "make it look like https://example.com". This is not a DESIGN.md source — it's a brand reference. Treat it as inspiration:

- Open the URL in the agent's browser tool if available.
- Extract visible tokens (palette, primary font names, layout density) into a synthetic DESIGN.md scoped to this session only.
- Show the synthetic DESIGN.md to the operator before generating, so they can edit or accept.
- Do not copy the brand's logo, trademarks, hero photos, or proprietary marketing copy.

## License & attribution

- DESIGN.md files on refero.design and getdesign.md are catalog authors' interpretations of third-party brands. They are inspiration, not licensed assets.
- frontage does not vendor, redistribute, or cache catalog content.
- Final generated CSS, copy, and imagery must be original. Never paste the brand's actual logo, photography, or marketing copy from a catalog page into the generated site.

## When discovery is not needed

Skip this guide entirely when:

- The operator picked one of the five built-in presets in `design-md-guide.md`.
- The operator already has a company DESIGN.md from their own design team.
- The operator only asks for quick mode with sensible defaults.
