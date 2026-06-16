#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const siteDir = process.argv[2];

if (!siteDir) {
  console.error("Usage: node validate-static-site.mjs <site-dir>");
  process.exit(2);
}

const root = path.resolve(siteDir);
const indexPath = path.join(root, "index.html");
const errors = [];
const warnings = [];

function exists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function isExternal(value) {
  return /^(https?:)?\/\//i.test(value)
    || /^(mailto|tel|sms|data|blob|javascript):/i.test(value)
    || value.startsWith("#")
    || value.trim() === "";
}

function normalizeAssetRef(ref) {
  const clean = ref.split("#")[0].split("?")[0].trim();
  if (!clean || clean.startsWith("/")) return clean;
  try {
    return decodeURIComponent(clean);
  } catch {
    return clean;
  }
}

if (!exists(root) || !fs.statSync(root).isDirectory()) {
  errors.push(`Site directory does not exist: ${root}`);
} else if (!exists(indexPath)) {
  errors.push("Missing index.html at site root.");
}

function collectHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "__MACOSX") continue;
      files.push(...collectHtmlFiles(absolute));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      files.push(absolute);
    }
  }
  return files.sort();
}

const htmlFiles = exists(root) && fs.statSync(root).isDirectory() ? collectHtmlFiles(root) : [];

if (!htmlFiles.length && exists(root) && fs.statSync(root).isDirectory()) {
  errors.push("No HTML files found.");
}

// Pre-pass: collect each page's header nav internal-html links for cross-page consistency.
const navLinksByPage = new Map();
for (const htmlPath of htmlFiles) {
  const html = fs.readFileSync(htmlPath, "utf8");
  const headerMatch = html.match(/<header[^>]*>([\s\S]*?)<\/header>/i);
  const navLinks = new Set();
  if (headerMatch) {
    const headerHtml = headerMatch[1];
    const linkPattern = /\bhref=["']([^"']+\.html)(?:[?#][^"']*)?["']/gi;
    let m;
    while ((m = linkPattern.exec(headerHtml)) !== null) {
      navLinks.add(m[1].toLowerCase());
    }
  }
  navLinksByPage.set(htmlPath, navLinks);
}

for (const htmlPath of htmlFiles) {
  const relativeHtml = path.relative(root, htmlPath);
  const html = fs.readFileSync(htmlPath, "utf8");
  const htmlDir = path.dirname(htmlPath);

  if (!/<meta\s+name=["']viewport["']/i.test(html)) {
    errors.push(`Missing viewport meta tag: ${relativeHtml}`);
  }

  if (/file:\/\/|\/Users\/|C:\\|localhost:\d+/i.test(html)) {
    errors.push(`HTML contains local machine paths or localhost URLs: ${relativeHtml}`);
  }

  if (!/<title>[^<]+<\/title>/i.test(html)) {
    errors.push(`Missing non-empty <title>: ${relativeHtml}`);
  }

  const metaDescTag = html.match(/<meta\s+[^>]*name=["']description["'][^>]*>/i);
  if (!metaDescTag) {
    errors.push(`Missing meta description: ${relativeHtml}`);
  } else {
    const contentMatch = metaDescTag[0].match(/content=["']([^"']*)["']/i);
    if (!contentMatch || !contentMatch[1].trim()) {
      errors.push(`Empty meta description: ${relativeHtml}`);
    }
  }

  const refs = [];
  const attrPattern = /\b(?:src|href)=["']([^"']+)["']/gi;
  let match;
  while ((match = attrPattern.exec(html)) !== null) {
    refs.push(match[1]);
  }

  for (const ref of refs) {
    if (isExternal(ref)) continue;
    const clean = normalizeAssetRef(ref);
    if (!clean || clean.startsWith("/")) continue;
    const target = path.resolve(htmlDir, clean);
    if (!target.startsWith(root + path.sep) && target !== root) {
      errors.push(`Asset escapes site directory in ${relativeHtml}: ${ref}`);
      continue;
    }
    if (!exists(target)) {
      errors.push(`Missing local asset in ${relativeHtml}: ${ref}`);
    }
  }
}

// Cross-page header nav consistency (warning only — legal pages may legitimately ship a reduced nav).
if (navLinksByPage.size > 1) {
  const pagesWithNav = [...navLinksByPage.entries()].filter(([, set]) => set.size > 0);
  if (pagesWithNav.length > 1) {
    const unionLinks = new Set();
    for (const [, set] of pagesWithNav) {
      for (const link of set) unionLinks.add(link);
    }
    for (const [htmlPath, set] of pagesWithNav) {
      const relativeHtml = path.relative(root, htmlPath);
      const selfBase = path.basename(htmlPath).toLowerCase();
      const missing = [...unionLinks].filter(link => !set.has(link) && link !== selfBase);
      if (missing.length) {
        warnings.push(`Header nav on ${relativeHtml} is missing links present on other pages: ${missing.join(", ")}`);
      }
    }
  }
}

if (warnings.length) {
  console.warn("Warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length) {
  console.error("Validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validation passed: ${root}`);
