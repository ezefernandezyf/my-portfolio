import { describe, expect, it } from 'vitest';

import { openSourceContributions } from '../openSource';

describe('openSourceContributions data integrity', () => {
  it('lists at least one merged contribution', () => {
    expect(openSourceContributions.length).toBeGreaterThan(0);
  });

  it('keeps unique ids and i18n key prefixes', () => {
    const ids = openSourceContributions.map((item) => item.id);
    const prefixes = openSourceContributions.map((item) => item.keyPrefix);

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(prefixes).size).toBe(prefixes.length);
  });

  it.each(openSourceContributions)(
    '$repository#$pullRequestNumber points at a pull request URL that matches repository and number',
    (contribution) => {
      const expectedUrl = `https://github.com/${contribution.repository}/pull/${contribution.pullRequestNumber}`;

      expect(contribution.pullRequestUrl).toBe(expectedUrl);
      expect(contribution.repository).toMatch(/^[\w.-]+\/[\w.-]+$/);
      expect(contribution.pullRequestNumber).toBeGreaterThan(0);
    },
  );

  it.each(openSourceContributions)('$repository#$pullRequestNumber has a real past merge date', (contribution) => {
    const mergedAt = new Date(`${contribution.mergedAt}T00:00:00`);

    expect(Number.isNaN(mergedAt.getTime())).toBe(false);
    expect(mergedAt.getTime()).toBeLessThanOrEqual(Date.now());
    expect(contribution.mergedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it.each(openSourceContributions)('$repository#$pullRequestNumber declares a positive diff size', (contribution) => {
    expect(contribution.diff).toMatch(/^\+\d+ \/ -\d+$/);
  });

  it('only claims a release when a package name is present', () => {
    for (const contribution of openSourceContributions) {
      if (contribution.releasedIn) {
        expect(contribution.packageName, `${contribution.id} claims a release without a package name`).toBeTruthy();
        expect(contribution.releasedIn).toMatch(/^\d+\.\d+\.\d+$/);
      }
    }
  });
});
