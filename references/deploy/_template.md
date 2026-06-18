# <Deploy Target Name>

> Template for adding additional deploy or handoff targets. Copy this file, rename it (`vercel.md`, `netlify.md`, `internal.md`, `github-static.md`, etc.), and fill in each section below. Remove this banner when done.

## When to use

State the conditions: target name the operator chose, fallback role, or platform-specific feature that triggers this guide. Explicitly state whether this target needs a zip or a plain site directory.

## Operator prerequisites

- Account / login state.
- Any CLI tools, FTP clients, or extensions required.
- Any required project IDs, tokens, or org access.

## Deploy steps (for the operator)

Numbered, dashboard-first steps from "open the platform" to "deployed and reachable URL". Always show:

1. Where to click first.
2. What name or slug to use.
3. Whether to upload a zip or the plain files from the site directory.
4. Where to find the resulting URL.

## Post-deploy checklist (for the operator)

How to confirm the deploy is correct: pages reachable, layout intact on mobile, CTA works, Open Graph preview renders when shared.

## Updating a deployed site

How to ship a new version. How to roll back to a previous version.

## Common errors

| Error | Cause | Fix |
|---|---|---|
| ... | ... | ... |

## What this guide does not cover

Anything explicitly out of scope (DNS quirks, edge functions, build-step deploys, etc.).
