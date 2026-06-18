# Cloudflare Pages Direct Upload

## When to use

Use this guide when:

- The operator chose Cloudflare Pages Direct Upload as the deploy target.
- The operator explicitly needs a dashboard upload flow that accepts a zip.

## Operator prerequisites

- A Cloudflare account.
- Logged into the Cloudflare dashboard.
- A zip from the Skill's optional packaging step.

## Deploy steps (for the operator)

1. Open the Cloudflare dashboard: <https://dash.cloudflare.com/?to=/:account/workers-and-pages>.
2. Click **Create application** → **Pages** tab → **Upload assets**.
3. Project name: use the brand or site name in lowercase Latin letters and hyphens (e.g., `acme-co`).
4. Drag the zip into the upload zone, or click the upload area and select the zip file.
5. Wait for the build to complete — usually under 60 seconds for a static site.
6. Cloudflare assigns a `*.pages.dev` preview URL. Open it to verify.
7. Optional: add a custom domain via the project's **Custom domains** tab.

## Post-deploy checklist (for the operator)

- All pages load: `index`, `about`, `services`, `contact`, `privacy`, `terms`.
- Navigation between pages works.
- Mobile layout intact (open from a phone or use Chrome DevTools device mode).
- The main action button / CTA opens the intended target (mailto, phone, or external URL).
- The Open Graph preview renders correctly when the URL is shared (test on WeChat, Twitter/X, or Slack).

## Updating a deployed site

1. Regenerate or revise the site in the Skill.
2. Re-run the optional packaging step to produce a new zip.
3. In the existing Pages project, open **Deployments** → **Upload** → upload the new zip.
4. Cloudflare keeps a deployment history. To roll back, promote an older deployment to production from the **Deployments** list.

## Common errors

| Error | Cause | Fix |
|---|---|---|
| "index.html not found at zip root" | The operator zipped the parent folder, not its contents | Re-zip with the site files at the zip root |
| Broken `/Users/...` or `C:\...` links on the deployed site | HTML used local machine paths | Re-run `scripts/validate-static-site.mjs` — it errors on local paths |
| Missing logo or favicon | The `assets/` folder was excluded from the zip | Ensure every file under the site directory is in the zip |
| 404 on subpages | The zip is missing `about.html`, `services.html`, etc. | Confirm with the site directory listing before re-zipping |
| Social preview blank or wrong | `og:image` references a missing file, or the file is an SVG that the platform does not render | Replace `assets/social-preview.svg` with a 1200x630 PNG or JPG before sharing externally |

## What this guide does not cover

- DNS configuration on registrars outside Cloudflare.
- Edge functions or Workers integration.
- Build-step deploys (Pages CI). Direct Upload is intentionally CI-free.
