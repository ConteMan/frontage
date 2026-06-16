#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { deflateRawSync } from "node:zlib";
import { spawnSync } from "node:child_process";

const [siteDirArg, outputArg] = process.argv.slice(2);

if (!siteDirArg || !outputArg) {
  console.error("Usage: node package-static-site.mjs <site-dir> <output.zip>");
  process.exit(2);
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const siteDir = path.resolve(siteDirArg);
const outputZip = path.resolve(outputArg);

// Required pre-package QA: validate first. Abort on any error.
const validation = spawnSync(
  process.execPath,
  [path.join(scriptDir, "validate-static-site.mjs"), siteDir],
  { stdio: "inherit" },
);
if (validation.status !== 0) {
  console.error("Aborting package: validation failed. Fix the errors above and re-run.");
  process.exit(validation.status ?? 1);
}

fs.mkdirSync(path.dirname(outputZip), { recursive: true });
if (fs.existsSync(outputZip)) fs.unlinkSync(outputZip);

const excludeNames = new Set([".DS_Store", "__MACOSX"]);

function collectFiles(dir, prefix = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (excludeNames.has(entry.name)) continue;
    const absolute = path.join(dir, entry.name);
    if (absolute === outputZip) continue;
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      files.push(...collectFiles(absolute, relative));
    } else if (entry.isFile()) {
      files.push({ absolute, relative });
    }
  }
  return files.sort((a, b) => a.relative.localeCompare(b.relative));
}

// CRC32 (IEEE 802.3) — table-based, no Node version dependency.
const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c >>> 0;
  }
  return table;
})();
function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = CRC_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function u16(n) { const b = Buffer.alloc(2); b.writeUInt16LE(n & 0xffff, 0); return b; }
function u32(n) { const b = Buffer.alloc(4); b.writeUInt32LE(n >>> 0, 0); return b; }

const files = collectFiles(siteDir);
if (!files.length) {
  console.error("No files to package.");
  process.exit(1);
}

const chunks = [];
const directory = [];
let offset = 0;
const flag = 0x0800; // language encoding: UTF-8 filenames

// DOS date/time. Fixed timestamp (1980-01-01) makes the zip deterministic.
const dosTime = 0x0000;
const dosDate = 0x0021;

for (const file of files) {
  const data = fs.readFileSync(file.absolute);
  const nameBuf = Buffer.from(file.relative, "utf8");
  const crc = crc32(data);
  const deflated = data.length > 0 ? deflateRawSync(data, { level: 9 }) : Buffer.alloc(0);
  const useDeflate = deflated.length > 0 && deflated.length < data.length;
  const stored = useDeflate ? deflated : data;
  const method = useDeflate ? 8 : 0;

  const localHeader = Buffer.concat([
    Buffer.from([0x50, 0x4b, 0x03, 0x04]),
    u16(20), u16(flag), u16(method),
    u16(dosTime), u16(dosDate),
    u32(crc), u32(stored.length), u32(data.length),
    u16(nameBuf.length), u16(0),
    nameBuf,
  ]);

  directory.push({
    nameBuf, crc, method,
    originalSize: data.length,
    storedSize: stored.length,
    offset,
  });

  chunks.push(localHeader, stored);
  offset += localHeader.length + stored.length;
}

const cdStart = offset;
for (const e of directory) {
  const cdEntry = Buffer.concat([
    Buffer.from([0x50, 0x4b, 0x01, 0x02]),
    u16(0x031e), // version made by: UNIX, ZIP 3.0
    u16(20),
    u16(flag), u16(e.method),
    u16(dosTime), u16(dosDate),
    u32(e.crc), u32(e.storedSize), u32(e.originalSize),
    u16(e.nameBuf.length), u16(0), u16(0),
    u16(0), u16(0),
    u32(0),
    u32(e.offset),
    e.nameBuf,
  ]);
  chunks.push(cdEntry);
  offset += cdEntry.length;
}
const cdSize = offset - cdStart;

const eocd = Buffer.concat([
  Buffer.from([0x50, 0x4b, 0x05, 0x06]),
  u16(0), u16(0),
  u16(directory.length), u16(directory.length),
  u32(cdSize), u32(cdStart),
  u16(0),
]);
chunks.push(eocd);

fs.writeFileSync(outputZip, Buffer.concat(chunks));

const size = fs.statSync(outputZip).size;
console.log(`Package created: ${outputZip} (${size} bytes)`);
