import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { changeTestLang } from '../../setupTests';
import { openSourceContributions } from '../../data/openSource';
import { OpenSourcePage } from '../OpenSourcePage';

const renderPage = () =>
  render(
    <MemoryRouter>
      <OpenSourcePage />
    </MemoryRouter>,
  );

describe('OpenSourcePage', () => {
  it('renders the Spanish hero and the three merged contributions', () => {
    renderPage();

    expect(screen.getByRole('heading', { level: 1, name: 'Contribuciones open source' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 1, name: 'Contribuciones open source' })).toBeInTheDocument();

    // vitest-dev/vitest is listed twice, so each repository heading is counted.
    const perRepository = openSourceContributions.reduce<Record<string, number>>((acc, item) => {
      acc[item.repository] = (acc[item.repository] ?? 0) + 1;
      return acc;
    }, {});

    for (const [repository, expectedCount] of Object.entries(perRepository)) {
      expect(screen.getAllByRole('heading', { level: 2, name: repository })).toHaveLength(expectedCount);
    }
  });

  it('links every contribution to its public pull request as verifiable evidence', () => {
    renderPage();

    for (const contribution of openSourceContributions) {
      const link = screen.getByRole('link', {
        name: new RegExp(`Ver el PR #${contribution.pullRequestNumber} en GitHub`),
      });

      expect(link).toHaveAttribute('href', contribution.pullRequestUrl);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('derives the stats from the data instead of hardcoding them', () => {
    renderPage();

    expect(screen.getByText(String(openSourceContributions.length))).toBeInTheDocument();

    const repositoryCount = new Set(openSourceContributions.map((item) => item.repository)).size;
    expect(screen.getByText(String(repositoryCount))).toBeInTheDocument();
  });

  it('shows the release, approval and review-cycle chips only when the data supports them', () => {
    renderPage();

    const withRelease = openSourceContributions.find((item) => item.releasedIn);
    if (withRelease) {
      expect(screen.getByText(new RegExp(`Publicado en .*${withRelease.releasedIn}`))).toBeInTheDocument();
    }

    const withApprovals = openSourceContributions.find((item) => item.approvals);
    if (withApprovals) {
      expect(
        screen.getByText(new RegExp(`${withApprovals.approvals} aprobaciones`)),
      ).toBeInTheDocument();
    }

    const reviewCycleCount = openSourceContributions.filter((item) => item.reviewCycle).length;
    expect(screen.getAllByText('Ciclo de review completo')).toHaveLength(reviewCycleCount);
  });

  it('frames the work as one-off contributions reviewed upstream', () => {
    renderPage();

    expect(
      screen.getByText(/un bug por pr, revisado por quien mantiene ese código/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/mantenedor/i)).not.toBeInTheDocument();
  });

  it('starts the hero with the heading, with no eyebrow above it', () => {
    renderPage();

    expect(screen.queryByText(/^open source$/i)).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Contribuciones open source');
  });

  it('renders every article with its three evidence blocks', () => {
    renderPage();

    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(openSourceContributions.length);

    for (const article of articles) {
      expect(within(article).getByRole('heading', { level: 3, name: 'El problema' })).toBeInTheDocument();
      expect(within(article).getByRole('heading', { level: 3, name: 'El arreglo' })).toBeInTheDocument();
      expect(within(article).getByRole('heading', { level: 3, name: 'Verificación y review' })).toBeInTheDocument();
    }
  });

  it('links the GitHub profile from the verification section', () => {
    renderPage();

    expect(screen.getByRole('link', { name: /Ver mi perfil de GitHub/i })).toHaveAttribute(
      'href',
      'https://github.com/ezefernandezyf',
    );
  });

  it('renders the English copy after a language change', async () => {
    await changeTestLang('en');
    renderPage();

    expect(
      screen.getByRole('heading', { level: 1, name: 'Open source contributions' }),
    ).toBeInTheDocument();

    for (const contribution of openSourceContributions) {
      expect(
        screen.getByRole('link', {
          name: new RegExp(`View PR #${contribution.pullRequestNumber} on GitHub`),
        }),
      ).toBeInTheDocument();
    }
  });
});
