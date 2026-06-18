# GitHub-Managed Static Site

## When to use

Use this guide when:

- The operator wants to manage the generated website with GitHub.
- The operator wants to publish later through GitHub Pages, Cloudflare Pages Git integration, Vercel, Netlify, or another Git-backed platform.
- The operator or agent will commit the static files directly.

This handoff does **not** need a zip by default.

## Operator prerequisites

- A GitHub account.
- A repository where the static site files should live, or permission for the agent to create/use one.
- If publishing through a Git-backed host, access to that hosting account.

## Handoff steps

1. Keep the generated site directory as the source of truth.
2. Commit the contents of the site directory directly to the chosen repository path.
3. Ensure `index.html` is at the repository root or at the hosting platform's configured publish directory.
4. If using GitHub Pages, configure Pages to publish from the selected branch and folder.
5. If using another Git-backed host, connect the repository and set the publish directory to the folder containing `index.html`.

## Post-handoff checklist

- Repository contains `index.html` at the expected publish root.
- `assets/` and all selected HTML pages are committed.
- No local machine paths such as `/Users/...`, `C:\...`, `file://`, or `localhost` remain in HTML.
- The deployed preview URL loads the homepage and subpages.
- Future edits happen in the same site directory or repository path.

## Updating a deployed site

1. Revise files in the same site directory.
2. Run final QA again.
3. Commit and push the changed static files.
4. Let the Git-backed host redeploy from the new commit.

## Common errors

| Error | Cause | Fix |
|---|---|---|
| Site shows a directory listing or 404 | `index.html` is not in the configured publish root | Move files or update the host's publish directory |
| Assets missing | `assets/` was not committed or the publish directory is wrong | Commit `assets/` and verify relative paths |
| Host tries to run a build | Platform detected a framework | Disable build command and use the static publish directory |

## What this guide does not cover

- Advanced Git branching strategy.
- CI build pipelines.
- Custom domain DNS setup.
