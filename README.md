<div align="center">
  <h1>frontage</h1>
  <p><b>Static business website skill for AI coding agents.</b></p>
  <sub>Guide non-technical operators from "I need a website" to a Cloudflare-Pages-ready zip — in one conversation.</sub>
</div>

---

> **Status: early development (v0.1.0).**
> The full Skill, templates and install instructions land in the upcoming v0.1.0 release. This repository is being initialized.

## What it is

`frontage` is a Skill for AI coding agents (Codex, Claude Code, and other tools that load skills from `~/.codex/skills/` or `~/.claude/skills/`). It guides a non-technical operator through:

1. Collecting brand/business info via numbered-option questions
2. Generating a multi-page static website
3. Local preview by double-clicking `index.html`
4. Multi-round natural-language revisions
5. A pre-package checklist of missing or placeholder content
6. A deploy-ready zip for Cloudflare Pages Direct Upload (other targets planned)

The first release focuses on **enterprise / corporate sites**. The architecture is designed to extend to SaaS landing pages, APP marketing sites, game/developer sites, and additional deploy targets in later releases.

## Supported agents

- [Codex](https://github.com/openai/codex) — via `~/.codex/skills/frontage/`
- [Claude Code](https://www.claude.com/product/claude-code) — via `~/.claude/skills/frontage/` or the Claude plugin marketplace
- Any agent runtime that reads skills from a known directory

Install instructions for each will ship with v0.1.0.

## Roadmap

- **v0.1.0** — Skill bootstrap, corporate template, Cloudflare Pages deploy guide, install paths for Codex and Claude Code, release zip on GitHub.
- **Later** — additional site types (SaaS landing / APP / game), additional deploy targets, plugin-marketplace entries.

## License

MIT. See [LICENSE](LICENSE).
