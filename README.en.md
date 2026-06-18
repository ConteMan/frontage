<div align="center">
  <h1>frontage</h1>
  <p><b>Static business website skill for AI coding agents.</b></p>
  <sub>Guide non-technical operators from "I need a website" to a Cloudflare-Pages-ready zip — in one conversation.</sub>
  <p>🌐 <b>English</b> · <a href="README.md">中文</a></p>
</div>

---

`frontage` is a Skill for AI coding agents (Codex, Claude Code, and others) that guides a non-technical operator through generating, previewing, refining, and packaging a multi-page static business website. The agent does the work; the operator answers numbered questions, double-clicks `index.html` to preview, and uploads the final zip to Cloudflare Pages.

> **v0.1.0 scope: enterprise / corporate sites.** SaaS landing, APP, and game/developer templates are planned for later releases.

## How an operator uses it

1. Open Codex / Claude Code.
2. Type a prompt like:

   ```text
   Use $frontage in guided mode to build a corporate website.
   ```

3. Answer the agent's numbered questions.
4. Double-click `index.html` to preview the generated site.
5. Tell the agent in natural language what to change.
6. When happy, confirm — the agent produces a zip ready to upload.
7. Upload the zip via Cloudflare Pages Direct Upload (or your chosen target).

The operator never needs Git, Node, a local server, or build tools.

## Install

### Codex

**macOS / Linux**

```bash
mkdir -p ~/.codex/skills
git clone https://github.com/ConteMan/frontage.git ~/.codex/skills/frontage
```

**Windows PowerShell**

```powershell
$dir = "$env:USERPROFILE\.codex\skills"
mkdir $dir -Force | Out-Null
git clone https://github.com/ConteMan/frontage.git "$dir\frontage"
```

Restart Codex (or open a new session). The skill is auto-discovered.

### Claude Code

Two install paths.

**Option A — Plugin marketplace** (requires Claude Code v2.1.142+):

```text
/plugin marketplace add ConteMan/frontage
/plugin install frontage@frontage
```

**Option B — Manual install**

**macOS / Linux**

```bash
mkdir -p ~/.claude/skills
git clone https://github.com/ConteMan/frontage.git ~/.claude/skills/frontage
```

**Windows PowerShell**

```powershell
$dir = "$env:USERPROFILE\.claude\skills"
mkdir $dir -Force | Out-Null
git clone https://github.com/ConteMan/frontage.git "$dir\frontage"
```

### Other agents

Download [`frontage.zip` from the latest release](https://github.com/ConteMan/frontage/releases/latest), and either:

- Extract it into your agent's skill directory.
- Upload the zip via your agent's Skill upload UI if it has one.

## Update

**Git install**

```bash
# macOS / Linux
git -C ~/.codex/skills/frontage pull          # Codex
git -C ~/.claude/skills/frontage pull         # Claude Code manual install
```

```powershell
# Windows PowerShell
git -C $env:USERPROFILE\.codex\skills\frontage pull
git -C $env:USERPROFILE\.claude\skills\frontage pull
```

**Claude Code plugin marketplace install**

```text
claude plugin update frontage
```

frontage also runs a quiet daily version check from inside the skill (`scripts/check-update.mjs`) and reports one line in chat when a newer version is available. It supports Windows PowerShell and macOS agent environments, only reads a public version file, sends no data, and stays silent when offline, sandboxed, or when Node.js is unavailable.

## Repository layout

```text
SKILL.md                              skill entry point and workflow
references/
  site-standards.md                   page structure, copy rules, QA
  operator-guided-flow.md             option-based intake flow
  page-matrix.md                      pages by site type
  design-md-guide.md                  visual style + design.md handling
  brand-assets-guide.md               logo, favicon, icon rules
  image-policy.md                     image roles, SVG placeholder rules
  legal-page-templates.md             privacy, terms, contact handling
  deploy/
    cloudflare-pages.md               Cloudflare Pages Direct Upload guide
    _template.md                      template for new deploy targets
assets/templates/
  corporate/                          enterprise site starter template (v0.1.0)
scripts/
  validate-static-site.mjs            HTML / asset / nav validation
  package-static-site.mjs             pure-Node validate + zip
  check-update.mjs                    cross-platform non-blocking daily update check
  check-update.sh                     Bash compatibility entry
.claude-plugin/marketplace.json       Claude plugin marketplace metadata
VERSION                               0.1.1
```

## Roadmap

- More site types: SaaS landing, APP marketing, game / developer.
- More deploy targets: Vercel, Netlify, internal upload platforms.
- Optional plugin marketplace listings.

## License

MIT. See [LICENSE](LICENSE).
