#!/usr/bin/env node
import fs from "node:fs";
import https from "node:https";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repo = "ConteMan/frontage";
const upstreamUrl = `https://raw.githubusercontent.com/${repo}/main/VERSION`;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function exitQuietly() {
  process.exit(0);
}

function getStateDir() {
  if (process.platform === "win32") {
    const base = process.env.LOCALAPPDATA || process.env.APPDATA || path.join(os.homedir(), "AppData", "Local");
    return path.join(base, "frontage");
  }

  if (process.platform === "darwin") {
    return path.join(os.homedir(), "Library", "Application Support", "frontage");
  }

  const base = process.env.XDG_STATE_HOME || path.join(os.homedir(), ".local", "state");
  return path.join(base, "frontage");
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(
      url,
      {
        headers: { "User-Agent": "frontage-update-check" },
        timeout: 4000,
      },
      (response) => {
        if (response.statusCode !== 200) {
          response.resume();
          reject(new Error(`Unexpected status: ${response.statusCode}`));
          return;
        }

        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
          if (body.length > 1024) request.destroy(new Error("Response too large"));
        });
        response.on("end", () => resolve(body));
      },
    );

    request.on("timeout", () => request.destroy(new Error("Request timed out")));
    request.on("error", reject);
  });
}

try {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const localVersionFile = path.join(scriptDir, "..", "VERSION");
  const localVersion = fs.readFileSync(localVersionFile, "utf8").trim();
  if (!localVersion) exitQuietly();

  const stateDir = getStateDir();
  const stampFile = path.join(stateDir, "last-check");
  fs.mkdirSync(stateDir, { recursive: true });

  if (fs.existsSync(stampFile)) {
    const last = Number(fs.readFileSync(stampFile, "utf8"));
    if (Number.isFinite(last) && Date.now() - last < ONE_DAY_MS) exitQuietly();
  }

  fs.writeFileSync(stampFile, String(Date.now()));

  const remoteVersion = (await fetchText(upstreamUrl)).trim();
  if (remoteVersion && remoteVersion !== localVersion) {
    console.log(`frontage update available: ${localVersion} -> ${remoteVersion} (https://github.com/${repo}/releases/latest)`);
  }
} catch {
  exitQuietly();
}
