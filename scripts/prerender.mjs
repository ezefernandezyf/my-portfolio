#!/usr/bin/env node

/**
 * Prerender script — generates 22 static HTML files (11 routes × 2 locales).
 * Runs after `vite build` via the closeBundle plugin.
 *
 * Produces dist/{esPage}.html / dist/en/{enPage}.html with full text content
 * for crawlers, plus hreflang alternate links, title, meta description.
 *
 * Zero new dependencies — uses jsdom (already present), react-dom/server,
 * and reads i18n JSON files directly.
 */

import { JSDOM } from 'jsdom';
import { createElement, Fragment } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/* ── Paths ─────────────────────────────────────────────────── */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const SRC = path.resolve(__dirname, '..');
const SITE_URL = 'https://ezefernandez.com';

/* ── Routes ──────────────────────────────────────────────────── */
/* NOTE: Keep in sync with src/data/route-meta.ts (canonical source) */

const LANGUAGES = ['es', 'en'];
const ROUTES = [
  { path: 'home',            ns: 'home',            titleKey: 'meta.title',                   descKey: 'meta.description',                schemaType: 'WebPage',        priority: 1.0, changefreq: 'daily',   ogImage: '/og-image.png' },
  { path: 'about',           ns: 'aboutpage',       titleKey: 'meta.title',                   descKey: 'meta.title',                      schemaType: 'AboutPage',      priority: 0.8, changefreq: 'monthly', ogImage: '/og-image.png' },
  { path: 'projects',        ns: 'projects',        titleKey: 'meta.title',                   descKey: 'meta.description',                schemaType: 'CollectionPage', priority: 0.9, changefreq: 'weekly',  ogImage: '/og-image.png' },
  { path: 'projects/cinelab',           ns: 'cinelabcasestudy',          titleKey: 'meta.title', descKey: 'meta.title', schemaType: 'WebPage', priority: 0.7, changefreq: 'monthly', ogImage: '/og-image.png' },
  { path: 'projects/movie-dashboard',  ns: 'moviedashboardcasestudy',   titleKey: 'meta.title', descKey: 'meta.title', schemaType: 'WebPage', priority: 0.7, changefreq: 'monthly', ogImage: '/og-image.png' },
  { path: 'projects/chefcitoia',       ns: 'chefcitoiacasestudy',       titleKey: 'meta.title', descKey: 'meta.title', schemaType: 'WebPage', priority: 0.7, changefreq: 'monthly', ogImage: '/og-image.png' },
  { path: 'projects/nexus-talent',     ns: 'nexustalentcasestudy',      titleKey: 'meta.title', descKey: 'meta.title', schemaType: 'WebPage', priority: 0.7, changefreq: 'monthly', ogImage: '/og-image.png' },
  { path: 'projects/echolog',          ns: 'echologcasestudy',          titleKey: 'meta.title', descKey: 'meta.title', schemaType: 'WebPage', priority: 0.7, changefreq: 'monthly', ogImage: '/og-image.png' },
  { path: 'privacy',         ns: 'privacy',         titleKey: 'meta.title',                   descKey: 'meta.description',                schemaType: 'WebPage',        priority: 0.3, changefreq: 'yearly',  ogImage: '/og-image.png' },
  { path: 'contact',         ns: 'contact',         titleKey: 'meta.contact.title',           descKey: 'meta.contact.description',        schemaType: 'ContactPage',    priority: 0.6, changefreq: 'monthly', ogImage: '/og-image.png' },
  { path: 'not-found',       ns: 'notfoundpage',    titleKey: 'meta.title',                   descKey: 'meta.description',                schemaType: 'WebPage',        priority: 0.1, changefreq: 'yearly',  ogImage: '/og-image.png' },
];

/* ── I18N resources ──────────────────────────────────────────── */

function loadResources() {
  const res = { es: {}, en: {} };
  for (const lang of LANGUAGES) {
    const dir = path.join(SRC, 'src', 'locales', lang);
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json'))) {
      const ns = f.replace('.json', '');
      let raw = fs.readFileSync(path.join(dir, f), 'utf-8');
      // Strip BOM if present
      if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
      res[lang][ns] = JSON.parse(raw);
    }
  }
  return /** @type {Record<string,Record<string,any>>} */ (res);
}

const allResources = loadResources();

function getNs(lang, ns) {
  return allResources[lang]?.[ns] ?? {};
}

function getVal(obj, key) {
  if (!obj || !key) return '';
  return key.split('.').reduce((cur, k) => (cur && typeof cur === 'object' ? cur[k] : undefined), obj) ?? '';
}

function tr(lang, ns, key) {
  const nsData = getNs(lang, ns);
  const val = getVal(nsData, key);
  return typeof val === 'string' ? val : key;
}

/* ── Helpers ────────────────────────────────────────────────── */

function resolveI18n(lang, route, key) {
  return tr(lang, route.ns, key) || '';
}

function metaTitle(lang, route) {
  return resolveI18n(lang, route, route.titleKey) || route.path;
}

function metaDesc(lang, route) {
  return resolveI18n(lang, route, route.descKey) || '';
}

function ogImageUrl(route) {
  return `${SITE_URL}${route.ogImage}`;
}

function pageUrl(lang, route) {
  const prefix = lang === 'en' ? '/en' : '';
  return `${SITE_URL}${prefix}/${route.path}`;
}

/* ── JSON-LD Schema builder (mirrors src/data/schema.ts) ─── */

const SITE_AUTHOR = 'Ezequiel Fernández';
const SITE_DESC = 'Full Stack Developer — portfolio, projects, and case studies';

function buildJsonLdScript(lang, route) {
  const prefix = lang === 'en' ? '/en' : '';
  const pageUrl_ = `${SITE_URL}${prefix}/${route.path}`;
  const graph = [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: SITE_AUTHOR,
      url: `${SITE_URL}/about`,
      jobTitle: 'Full Stack Developer',
      sameAs: [
        'https://github.com/ezefernandezyf',
        'https://linkedin.com/in/ezequiel-fernandez-y-f/',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${SITE_AUTHOR} — ${SITE_DESC}`,
      description: SITE_DESC,
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': route.schemaType,
      '@id': pageUrl_,
      url: pageUrl_,
      name: metaTitle(lang, route),
      description: metaDesc(lang, route),
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#person` },
      inLanguage: lang,
    },
  ];
  const json = JSON.stringify(
    { '@context': 'https://schema.org', '@graph': graph },
    null,
    2,
  );
  return `<script type="application/ld+json">\n${json}\n</script>`;
}

/* ── Page content builders (createElement, no TSX) ──────────── */

function buildPageContent(lang, route) {
  const ns = route.ns;
  const content = getNs(lang, ns);

  if (ns === 'home') {
    const heroName = getVal(content, 'hero.name') || 'Ezequiel Fernández';
    const heroSummary = getVal(content, 'hero.summary') || '';
    const heading = getVal(content, 'hero.label') || 'Full Stack Developer';
    const stackH = getVal(content, 'stackHeading') || '';
    const recentH = getVal(content, 'recentWorkHeading') || '';
    const contactT = getVal(content, 'contactTitle') || '';
    const contactText = getVal(content, 'contactText') || '';
    return createElement('div', { className: 'prerendered-page' },
      createElement('section', { className: 'hero-section' },
        createElement('h1', null, heroName),
        createElement('p', { className: 'hero-label' }, heading),
        createElement('p', { className: 'hero-summary' }, heroSummary),
      ),
      stackH ? createElement('section', { className: 'stack-section' },
        createElement('h2', null, stackH),
      ) : null,
      recentH ? createElement('section', { className: 'recent-section' },
        createElement('h2', null, recentH),
      ) : null,
      contactT ? createElement('section', { className: 'contact-cta' },
        createElement('h2', null, contactT),
        contactText ? createElement('p', null, contactText) : null,
      ) : null,
    );
  }

  if (ns === 'projects') {
    const title = getVal(content, 'meta.title') || 'Projects';
    const subtitle = getVal(content, 'header.subtitle') || '';
    return createElement('div', { className: 'prerendered-page' },
      createElement('h1', null, title),
      subtitle ? createElement('p', null, subtitle) : null,
    );
  }

  if (ns === 'aboutpage') {
    const h1 = getVal(content, 'h1') || 'About';
    const summary = getVal(content, 'summary') || '';
    return createElement('div', { className: 'prerendered-page' },
      createElement('h1', null, h1),
      ...summary.split('\n\n').filter(Boolean).map(para =>
        createElement('p', { key: para.slice(0, 20) }, para.trim())
      ),
    );
  }

  if (ns === 'contact') {
    const title = getVal(content, 'meta.contact.title') || 'Contact';
    const desc = getVal(content, 'hero.description') || '';
    const label = getVal(content, 'hero.label') || '';
    return createElement('div', { className: 'prerendered-page' },
      createElement('h1', null, title),
      label ? createElement('p', { className: 'hero-label' }, label) : null,
      desc ? createElement('p', null, desc) : null,
    );
  }

  if (ns === 'privacy') {
    const title = getVal(content, 'title') || 'Privacy Policy';
    const intro = getVal(content, 'intro') || '';
    const sections = content?.sections;
    const sectionEls = [];
    if (sections && typeof sections === 'object') {
      for (const [key, sec] of Object.entries(sections)) {
        if (sec && typeof sec === 'object') {
          sectionEls.push(
            createElement('section', { key },
              createElement('h2', null, sec.heading || ''),
              createElement('p', null, sec.paragraph || ''),
            )
          );
        }
      }
    }
    return createElement('div', { className: 'prerendered-page' },
      createElement('h1', null, title),
      intro ? createElement('p', null, intro) : null,
      ...sectionEls,
    );
  }

  if (ns === 'notfoundpage') {
    const h1 = getVal(content, 'h1') || 'Not Found';
    const para = getVal(content, 'paragraph') || '';
    return createElement('div', { className: 'prerendered-page' },
      createElement('h1', null, h1),
      para ? createElement('p', null, para) : null,
    );
  }

  // Case studies (cinelabcasestudy, moviedashboardcasestudy, ...)
  if (ns.endsWith('casestudy')) {
    const title = getVal(content, 'header.title') || route.path.split('/').pop() || 'Case Study';
    const short = getVal(content, 'header.short') || '';
    const summaryH = getVal(content, 'summary.heading') || '';
    const summaryT = getVal(content, 'summary.text') || '';
    const problemH = getVal(content, 'problem.heading') || '';
    const problemT = getVal(content, 'problem.text') || '';
    const archH = getVal(content, 'architecture.heading') || '';
    const archT = getVal(content, 'architecture.text') || '';
    return createElement('div', { className: 'prerendered-page' },
      createElement('h1', null, title),
      short ? createElement('p', null, short) : null,
      summaryH ? createElement('section', null,
        createElement('h2', null, summaryH),
        summaryT ? createElement('p', null, summaryT) : null,
      ) : null,
      problemH ? createElement('section', null,
        createElement('h2', null, problemH),
        problemT ? createElement('p', null, problemT) : null,
      ) : null,
      archH ? createElement('section', null,
        createElement('h2', null, archH),
        archT ? createElement('p', null, archT) : null,
      ) : null,
    );
  }

  return createElement('div', { className: 'prerendered-page' },
    createElement('p', null, 'Page content loading...'),
  );
}

function renderPage(lang, route) {
  const urlPath = lang === 'en' ? `/en/${route.path}` : `/${route.path}`;
  const contentEl = buildPageContent(lang, route);

  // Wrap in StaticRouter so the SPA can hydrate over the same structure
  const appEl = createElement(StaticRouter, { location: urlPath },
    createElement('div', { id: 'root-inner' },
      contentEl,
    ),
  );

  let html;
  try {
    html = renderToStaticMarkup(appEl);
  } catch (err) {
    console.error(`  ✗ renderToStaticMarkup failed for ${route.path} (${lang}):`, err.message);
    console.error('    Falling back to empty shell');
    html = '<div class="prerendered-page"><p>Page content loading...</p></div>';
  }
  return html;
}

/* ── Hreflang link builder (Task A5) ────────────────────────── */

function buildHreflangLinks(route) {
  const esUrl = `${SITE_URL}/${route.path}`;
  const enUrl = `${SITE_URL}/en/${route.path}`;
  return [
    `<link rel="alternate" hreflang="es" href="${esUrl}" />`,
    `<link rel="alternate" hreflang="en" href="${enUrl}" />`,
    `<link rel="alternate" hreflang="x-default" href="${esUrl}" />`,
  ].join('\n    ');
}

/* ── Inject into template via JSDOM ──────────────────────────── */

function injectIntoHtml(templateHtml, renderedContent, lang, route) {
  const dom = new JSDOM(templateHtml, { url: SITE_URL });

  const { document } = dom.window;

  // Set html lang
  document.documentElement.setAttribute('lang', lang);

  // Inject rendered content into #root
  const rootEl = document.getElementById('root');
  if (rootEl) {
    rootEl.innerHTML = renderedContent;
  }

  // --- Head manipulation ---

  // Remove existing title (set by template)
  const existingTitle = document.querySelector('title');
  if (existingTitle) existingTitle.remove();

  // Remove existing meta description
  const existingMeta = document.querySelector('meta[name="description"]');
  if (existingMeta) existingMeta.remove();

  // Add new title with prerendered marker
  const titleText = metaTitle(lang, route);
  const titleEl = document.createElement('title');
  titleEl.textContent = titleText;
  titleEl.setAttribute('data-prerendered', 'true');
  document.head.appendChild(titleEl);

  // Add meta description
  const descText = metaDesc(lang, route);
  if (descText) {
    const metaDescEl = document.createElement('meta');
    metaDescEl.setAttribute('name', 'description');
    metaDescEl.setAttribute('content', descText);
    metaDescEl.setAttribute('data-prerendered', 'true');
    document.head.appendChild(metaDescEl);
  }

  // Add canonical URL with prerendered marker
  const canonical = document.createElement('link');
  canonical.setAttribute('rel', 'canonical');
  canonical.setAttribute('href', pageUrl(lang, route));
  canonical.setAttribute('data-prerendered', 'true');
  document.head.appendChild(canonical);

  // Add OG meta tags with prerendered markers
  const ogTags = [
    { property: 'og:title', content: titleText },
    { property: 'og:description', content: descText || titleText },
    { property: 'og:image', content: ogImageUrl(route) },
    { property: 'og:url', content: pageUrl(lang, route) },
    { property: 'og:type', content: 'website' },
  ];
  for (const tag of ogTags) {
    const el = document.createElement('meta');
    el.setAttribute('property', tag.property);
    el.setAttribute('content', tag.content);
    el.setAttribute('data-prerendered', 'true');
    document.head.appendChild(el);
  }

  // Add Twitter card meta with prerendered markers
  const twitterTags = [
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: titleText },
    { name: 'twitter:description', content: descText || titleText },
    { name: 'twitter:image', content: ogImageUrl(route) },
  ];
  for (const tag of twitterTags) {
    const el = document.createElement('meta');
    el.setAttribute('name', tag.name);
    el.setAttribute('content', tag.content);
    el.setAttribute('data-prerendered', 'true');
    document.head.appendChild(el);
  }

  // Inject JSON-LD structured data (Task B4)
  const jsonLdScript = buildJsonLdScript(lang, route);
  document.head.insertAdjacentHTML('beforeend', `\n    ${jsonLdScript}\n    `);

  // Add hreflang alternate links (Task A5)
  const hreflangHtml = buildHreflangLinks(route);
  // Insert before the first meta or title for clean head order
  const firstHeadChild = document.head.children[0];
  if (firstHeadChild) {
    firstHeadChild.insertAdjacentHTML('beforebegin', `\n    ${hreflangHtml}\n    `);
  } else {
    document.head.innerHTML = hreflangHtml + document.head.innerHTML;
  }

  return dom.serialize();
}

/* ── File writer ────────────────────────────────────────────── */

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writePage(lang, route, html) {
  const prefix = lang === 'en' ? path.join(DIST, 'en') : DIST;
  const outDir = path.join(prefix, route.path);
  ensureDir(outDir);
  const outFile = path.join(outDir, 'index.html');
  fs.writeFileSync(outFile, html, 'utf-8');
  return outFile;
}

/* ── Main ───────────────────────────────────────────────────── */

async function prerender() {
  console.log('\n━━━ Prerender: generating 22 static pages ━━━\n');

  // Read the template (Vite-built SPA entry)
  const templatePath = path.join(DIST, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('  ✗ dist/index.html not found. Run vite build first.');
    console.error('    Path checked:', templatePath);
    process.exit(1);
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  let success = 0;
  let failed = 0;

  for (const lang of LANGUAGES) {
    for (const route of ROUTES) {
      const label = `  ${lang === 'en' ? `/en/${route.path}` : `/${route.path}`}`;
      try {
        process.stdout.write(`${label} … `);

        // 1. Render the React content
        const renderedContent = renderPage(lang, route);
        if (!renderedContent || renderedContent.trim().length === 0) {
          throw new Error('renderToStaticMarkup produced empty output');
        }

        // 2. Inject into template via JSDOM
        const finalHtml = injectIntoHtml(template, renderedContent, lang, route);

        // 3. Write to disk
        const outFile = writePage(lang, route, finalHtml);
        const size = fs.statSync(outFile).size;

        // 4. Quick sanity check — ensure HTML has text content, not just empty div
        const contentCheck = finalHtml.includes('class="prerendered-page"') || finalHtml.includes('>Ezequiel');
        if (!contentCheck) {
          console.log(`⚠  written (${size}B, no expected content markers)`);
        } else {
          console.log(`✓ ${size}B`);
        }

        success++;
      } catch (err) {
        console.log(`✗ ${err.message}`);
        failed++;
      }
    }
  }

  console.log(`\n━━━ Done: ${success} pages generated, ${failed} failed ━━━\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

prerender().catch(err => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
