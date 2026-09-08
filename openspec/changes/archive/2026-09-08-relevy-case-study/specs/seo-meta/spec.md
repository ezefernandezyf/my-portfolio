# Delta for seo-meta

## ADDED Requirements

### Requirement: Geo-SaaS Route-Meta Entry

`src/data/route-meta.ts` SHALL add a `projects/geo-saas` key to `ROUTE_META` with `pathname: '/projects/geo-saas'`, `titleI18nKey: 'geosaascasestudy:meta.title'`, `descI18nKey: 'geosaascasestudy:meta.description'`, resolved `es`/`en` `LocaleSEO` objects (title, description, keywords), `ogImage: '/og-image.png'`, `schemaType: 'WebPage'`, `priority: 0.7`, `changefreq: 'monthly'`. The key SHALL also be appended to `ROUTE_KEYS` (after `projects/egg-demo`).

#### Scenario: ES title follows author convention without typo

- GIVEN route key `projects/geo-saas`
- WHEN `ROUTE_META['projects/geo-saas'].es.title` is read
- THEN it contains `"Ezequiel Fernández"` and does NOT contain `" , "`

#### Scenario: EN title follows author convention without typo

- GIVEN route key `projects/geo-saas`
- WHEN `ROUTE_META['projects/geo-saas'].en.title` is read
- THEN it contains `"Ezequiel Fernández"` and does NOT contain `" , "`

#### Scenario: Route-meta integrity test coverage

- GIVEN `projects/geo-saas` is in `ROUTE_KEYS`
- WHEN `pnpm test` runs the route-meta suite
- THEN the non-empty title / author-name / no-typo / unique-title assertions pass for the new key

#### Scenario: Snapshot regeneration

- GIVEN the new route entry
- WHEN the route-meta snapshot test runs with update
- THEN `route-meta.test.ts.snap` regenerates to include `projects/geo-saas`

### Requirement: Sitemap and llms.txt regeneration

`public/sitemap.xml` SHALL be regenerated (via `node --experimental-strip-types scripts/generate-sitemap.mjs`) to include the `geo-saas` route in both locales, and `public/llms.txt` SHALL gain the two new rows for `/projects/geo-saas` (ES + EN).

#### Scenario: Sitemap contains new route

- GIVEN the site is built
- WHEN a crawler reads `sitemap.xml`
- THEN `/projects/geo-saas` and `/en/projects/geo-saas` appear with correct hreflang alternates

#### Scenario: llms.txt contains new entry

- GIVEN `public/llms.txt`
- WHEN an LLM agent reads it
- THEN Relevy is discoverable with the `/projects/geo-saas` URL and a one-line summary
