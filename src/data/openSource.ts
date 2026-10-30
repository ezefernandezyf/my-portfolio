/**
 * Open source contributions | static typed repository.
 *
 * Every entry is a MERGED pull request in a repository owned by someone else.
 * That is the whole point of the section: it is the only part of this portfolio
 * validated by a third party, so nothing here may be aspirational.
 *
 * Rules for editing this file:
 * - Only merged PRs. An open PR is an intention, not a fact. A rejected PR is
 *   a lesson, not an achievement.
 * - Name the package that shipped the fix (`@fastify/cookie`), never the
 *   organisation alone (`fastify`).
 * - Never describe the author as a maintainer or a regular contributor.
 *
 * Prose lives in `src/locales/<lang>/opensource.json`, keyed by `keyPrefix`.
 * This file holds only language-independent facts.
 */
export interface OpenSourceContribution {
  /** Stable identifier used as a React key */
  id: string;
  /** i18n key prefix inside the `opensource` namespace */
  keyPrefix: string;
  /** GitHub `owner/repo` of the merged pull request */
  repository: string;
  /** Public pull request | the verifiable evidence behind the claim */
  pullRequestUrl: string;
  pullRequestNumber: number;
  /** Merge date, ISO 8601 */
  mergedAt: string;
  /** GitHub stars recorded when the contribution was catalogued */
  stars: number;
  /** Merged diff size, e.g. `+59 / -6` */
  diff: string;
  /** NPM package the fix shipped in, when it shipped in a release */
  packageName?: string;
  /** Version the fix was published in */
  releasedIn?: string;
  /** Maintainer approvals recorded on the pull request */
  approvals?: number;
  /** True when a maintainer requested changes before approving */
  reviewCycle: boolean;
}

export const openSourceContributions: OpenSourceContribution[] = [
  {
    id: 'vitest-vm-deps',
    keyPrefix: 'vitestVmDeps',
    repository: 'vitest-dev/vitest',
    pullRequestUrl: 'https://github.com/vitest-dev/vitest/pull/11360',
    pullRequestNumber: 11360,
    mergedAt: '2026-09-29',
    stars: 17200,
    diff: '+59 / -6',
    reviewCycle: false,
  },
  {
    id: 'fastify-cookie-encode',
    keyPrefix: 'fastifyCookieEncode',
    repository: 'fastify/fastify-cookie',
    pullRequestUrl: 'https://github.com/fastify/fastify-cookie/pull/377',
    pullRequestNumber: 377,
    mergedAt: '2026-10-27',
    stars: 301,
    diff: '+42 / -1',
    packageName: '@fastify/cookie',
    releasedIn: '11.1.5',
    approvals: 2,
    reviewCycle: false,
  },
  {
    id: 'vitest-cache-unwritable',
    keyPrefix: 'vitestCacheUnwritable',
    repository: 'vitest-dev/vitest',
    pullRequestUrl: 'https://github.com/vitest-dev/vitest/pull/11781',
    pullRequestNumber: 11781,
    mergedAt: '2026-10-30',
    stars: 17200,
    diff: '+72 / -12',
    reviewCycle: true,
  },
];
