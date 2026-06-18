# FTP / SFTP Static File Upload

## When to use

Use this guide when:

- The operator wants to upload the site through FTP, SFTP, or a hosting control panel file manager.
- The hosting provider serves plain static files.
- The operator does not need a zip archive.

This handoff uses the plain site directory by default.

## Operator prerequisites

- Hosting account access.
- FTP/SFTP host, username, password or key, and target web root path.
- An FTP/SFTP client or the hosting provider's file manager.

## Upload steps

1. Open the FTP/SFTP client or hosting file manager.
2. Navigate to the site's public web root, commonly `public_html`, `www`, `htdocs`, or the provider's configured static folder.
3. Upload the **contents** of the generated site directory, not the parent folder itself.
4. Confirm `index.html` appears directly in the web root.
5. Upload `assets/` and every selected HTML page.
6. Open the public domain or temporary preview URL and verify the site.

## Post-upload checklist

- Homepage loads at the domain root.
- Subpages such as `about.html`, `services.html`, `contact.html`, `privacy.html`, and `terms.html` load if selected.
- Images, CSS, favicon, and social preview assets load from `assets/`.
- Navigation and main contact action work.
- Mobile layout is intact.

## Updating a deployed site

1. Revise files in the same site directory.
2. Run final QA again.
3. Upload changed files to the same web root.
4. If the host caches files, clear cache or wait for cache expiry.

## Common errors

| Error | Cause | Fix |
|---|---|---|
| Domain shows old site | Files were uploaded to the wrong folder or cache is active | Confirm the public web root and clear cache |
| 404 on homepage | `index.html` is inside a nested folder | Move `index.html` directly into the web root |
| Broken images or CSS | `assets/` folder was not uploaded | Upload the full `assets/` folder |
| Garbled non-English text | Server sends the wrong charset | Ensure HTML has UTF-8 meta tag and ask the host to serve UTF-8 |

## What this guide does not cover

- Hosting account purchase.
- DNS propagation and registrar setup.
- Server-side forms, PHP, databases, or backend features.
