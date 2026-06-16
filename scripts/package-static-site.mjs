#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const [siteDirArg, outputArg] = process.argv.slice(2);

if (!siteDirArg || !outputArg) {
  console.error("Usage: node package-static-site.mjs <site-dir> <output.zip>");
  process.exit(2);
}

const scriptDir = path.dirname(new URL(import.meta.url).pathname);
const siteDir = path.resolve(siteDirArg);
const outputZip = path.resolve(outputArg);

execFileSync(process.execPath, [path.join(scriptDir, "validate-static-site.mjs"), siteDir], {
  stdio: "inherit",
});

fs.mkdirSync(path.dirname(outputZip), { recursive: true });
if (fs.existsSync(outputZip)) fs.unlinkSync(outputZip);

const excludeNames = new Set([".DS_Store", "__MACOSX"]);

function commandExists(command) {
  try {
    execFileSync("which", [command], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function collectFiles(dir, prefix = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (excludeNames.has(entry.name)) continue;
    const absolute = path.join(dir, entry.name);
    const relative = path.join(prefix, entry.name);
    if (absolute === outputZip) continue;
    if (entry.isDirectory()) {
      files.push(...collectFiles(absolute, relative));
    } else if (entry.isFile()) {
      files.push(relative);
    }
  }
  return files.sort();
}

if (commandExists("zip")) {
  const files = collectFiles(siteDir);
  execFileSync("zip", ["-q", "-r", outputZip, ...files], {
    cwd: siteDir,
    stdio: "inherit",
  });
} else if (commandExists("python3")) {
  const tempList = path.join(os.tmpdir(), `static-site-files-${Date.now()}.txt`);
  const files = collectFiles(siteDir);
  fs.writeFileSync(tempList, files.join("\n"), "utf8");
  const python = [
    "import pathlib, sys, zipfile",
    "root = pathlib.Path(sys.argv[1])",
    "out = pathlib.Path(sys.argv[2])",
    "items = pathlib.Path(sys.argv[3]).read_text().splitlines()",
    "with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:",
    "    for item in items:",
    "        z.write(root / item, item)",
  ].join("\n");
  execFileSync("python3", ["-c", python, siteDir, outputZip, tempList], {
    stdio: "inherit",
  });
  fs.unlinkSync(tempList);
} else {
  console.error("Neither zip nor python3 is available. Cannot create zip package.");
  process.exit(1);
}

if (!fs.existsSync(outputZip)) {
  console.error(`Package was not created: ${outputZip}`);
  process.exit(1);
}

const size = fs.statSync(outputZip).size;
console.log(`Package created: ${outputZip} (${size} bytes)`);
