#!/usr/bin/env node

/**
 * Sitemap generator — reads route-meta.ts ROUTE_KEYS, generates public/sitemap.xml.
 *
 * Produces 22 <url> entries (11 indexable routes x 2 locales) with hreflang
 * alternates, lastmod, changefreq, priority.
 *
 * Runs standalone:  node scripts/generate-sitemap.mjs
 * Requires Node 22+ with --experimental-strip-types enabled via package.json.
 *
 * Zero new dependencies.
 */

import { ROUTE_META, ROUTE_KEYS } from '../src/data/route-meta.ts';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://ezefernandez.com';
const TODAY = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

const LANGUAGES = ['es', 'en'];
const DEFAULT_LANG = 'es';

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Build the sitemap XML string.
 */
function buildSitemap() {
  const entries = [];

  for (const key of ROUTE_KEYS) {
    const meta = ROUTE_META[key];
    if (!meta) {
      console.warn(`  ⚠ Skipping ${key}: no route meta found`);
      continue;
    }

    // Skip noIndex routes (not-found)
    if (meta.noIndex) {
      console.log(`  - ${key}: excluded (noIndex)`);
      continue;
    }

    for (const lang of LANGUAGES) {
      const loc = lang === DEFAULT_LANG
        ? `${SITE_URL}${meta.pathname}`
        : `${SITE_URL}/en${meta.pathname}`;

      const esLoc = `${SITE_URL}${meta.pathname}`;
      const enLoc = `${SITE_URL}/en${meta.pathname}`;

      entries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${escapeXml(esLoc)}" />
    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(enLoc)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(esLoc)}" />
    <lastmod>${TODAY}</lastmod>
    <changefreq>${meta.changefreq}</changefreq>
    <priority>${meta.priority.toFixed(1)}</priority>
  </url>`);
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
}

function main() {
  console.log('\n━━━ Sitemap Generator ─────────────────────────────\n');

  const outPath = path.resolve(__dirname, '..', 'public', 'sitemap.xml');
  const xml = buildSitemap();

  fs.writeFileSync(outPath, xml, 'utf-8');
  const size = fs.statSync(outPath).size;
  console.log(`  ✓ Generated: ${outPath} (${size} bytes)`);

  // Count entries
  const urlCount = (xml.match(/<url>/g) || []).length;
  console.log(`  ✓ ${urlCount} <url> entries\n`);
}

main();
