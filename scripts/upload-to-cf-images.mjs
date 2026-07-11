#!/usr/bin/env node
// Bulk-upload src/assets/photos/ to Cloudflare Images with deterministic IDs.
//
// Usage:
//   CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=... node scripts/upload-to-cf-images.mjs
//
// Idempotent: queries CF for each ID first and skips files already uploaded.
// Writes scripts/image-mapping.json as a local record (gitignored).
//
// ID convention: nbh_<slug-of-filename> where slug = lowercase, non-alnum -> _,
// collapsed and trimmed. Stable across re-runs and matches the per-site
// prefix table in docs/CLOUDFLARE_IMAGES_MIGRATION.md §3.1 on the
// claude/app-store-infrastructure-iaO1H branch of astro-test-site.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const PHOTOS_DIR = path.join(REPO_ROOT, 'src', 'assets');
const MAPPING_FILE = path.join(__dirname, 'image-mapping.json');

const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID;
const PREFIX = 'nbh_';

// CF Images max upload is 10 MB. Files above ~9 MB get downscaled in-memory
// before upload — originals on disk are not modified. Target: longest edge
// 4000px, JPEG q85. That's still well above the `hero` variant's 1600w, so
// no visual quality is lost in any rendered variant.
const SIZE_LIMIT_BYTES = 9 * 1024 * 1024;
const RESIZE_LONGEST_EDGE = 4000;
const JPEG_QUALITY = 85;

if (!TOKEN || !ACCOUNT) {
  console.error('Missing CLOUDFLARE_API_TOKEN or CLOUDFLARE_ACCOUNT_ID env vars.');
  process.exit(1);
}

const API = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}/images/v1`;

function slugId(relPath) {
  // relPath e.g. "A05A5369.JPG" or "moves/Small -20180810_142113.jpg"
  const slug = relPath
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  return PREFIX + slug;
}

function walkImages(dir, prefix = '') {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkImages(abs, rel));
    } else if (/\.(jpe?g|png|webp|gif|avif)$/i.test(entry.name)) {
      out.push({ rel, abs });
    }
  }
  return out;
}

async function existsOnCloudflare(id) {
  const res = await fetch(`${API}/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return res.ok;
}

async function uploadOne(abs, id) {
  let buf = fs.readFileSync(abs);
  let resized = false;

  if (buf.length > SIZE_LIMIT_BYTES) {
    buf = await sharp(buf)
      .rotate()
      .resize({
        width: RESIZE_LONGEST_EDGE,
        height: RESIZE_LONGEST_EDGE,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toBuffer();
    resized = true;
  }

  const form = new FormData();
  form.append('file', new Blob([buf]), path.basename(abs));
  form.append('id', id);
  const res = await fetch(API, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}` },
    body: form,
  });
  const json = await res.json();
  if (!json.success) {
    throw new Error(`API error for ${id}: ${JSON.stringify(json.errors)}`);
  }
  return { ...json.result, resized, uploadedBytes: buf.length };
}

async function main() {
  if (!fs.existsSync(PHOTOS_DIR)) {
    console.error(`Photos dir not found: ${PHOTOS_DIR}`);
    process.exit(1);
  }

  const files = walkImages(PHOTOS_DIR);
  console.log(`Found ${files.length} images under src/assets/photos/`);

  const mapping = fs.existsSync(MAPPING_FILE)
    ? JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'))
    : {};

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const [i, { rel, abs }] of files.entries()) {
    const id = slugId(rel);
    const tag = `[${i + 1}/${files.length}]`;

    if (mapping[rel] === id && (await existsOnCloudflare(id))) {
      skipped++;
      if (i % 25 === 0) console.log(`${tag} skip ${rel} (already on CF as ${id})`);
      continue;
    }

    if (await existsOnCloudflare(id)) {
      mapping[rel] = id;
      skipped++;
      console.log(`${tag} skip ${rel} (id ${id} exists on CF)`);
      continue;
    }

    try {
      const result = await uploadOne(abs, id);
      mapping[rel] = id;
      uploaded++;
      const sizeKb = Math.round(result.uploadedBytes / 1024);
      const note = result.resized ? ` [resized to ${sizeKb}KB]` : '';
      console.log(`${tag} ok   ${rel} -> ${id}${note}`);
    } catch (err) {
      failed++;
      console.error(`${tag} FAIL ${rel}: ${err.message}`);
    }

    fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2));
  }

  console.log('');
  console.log(`Done. uploaded=${uploaded} skipped=${skipped} failed=${failed}`);
  console.log(`Mapping written to ${path.relative(REPO_ROOT, MAPPING_FILE)}`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
