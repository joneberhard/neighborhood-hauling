// Renders og-card.html -> public/og-default.jpg (1200x630).
// Usage: node og/render.mjs
// Headless Edge screenshots the card, sharp converts PNG -> JPEG.
import { execFileSync } from "node:child_process";
import { existsSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const html = join(here, "og-card.html");
const png = join(here, "og-default.png");
const out = join(here, "..", "public", "og-default.jpg");

const edge = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].find(existsSync);
if (!edge) throw new Error("msedge.exe not found");

execFileSync(edge, [
  "--headless=new",
  "--disable-gpu",
  "--allow-file-access-from-files",
  "--virtual-time-budget=10000",
  "--window-size=1200,630",
  "--hide-scrollbars",
  `--screenshot=${png}`,
  pathToFileURL(html).href,
]);

await sharp(png)
  .jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
  .toFile(out);
unlinkSync(png);
console.log("wrote", out);
