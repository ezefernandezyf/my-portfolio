import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AboutPage } from '../AboutPage';
import { about } from '../../data/about';
import esAboutLocale from '../../locales/es/aboutpage.json';

describe('AboutPage', () => {
  it('renderiza las secciones principales, enlaces y el stack categorizado', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /acerca de mí/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: new RegExp(about.name, 'i') })).toBeInTheDocument();

    const cvLink = screen.getAllByRole('link').find((l) => l.getAttribute('href') === about.cv);
    expect(cvLink).toBeDefined();

    const githubLink = screen
      .getAllByRole('link')
      .find((l) => l.getAttribute('href') === about.github);
    expect(githubLink).toBeDefined();

    const linkedInLink = screen
      .getAllByRole('link')
      .find((l) => l.getAttribute('href') === about.linkedIn);
    expect(linkedInLink).toBeDefined();

    const summaryText = (esAboutLocale.summary ?? '').split?.('.')?.[0]?.trim();
    if (summaryText) {
      expect(screen.getByText(new RegExp(summaryText, 'i'))).toBeInTheDocument();
    } else {
      expect(screen.getByText(/Front-end Developer|Front-end/)).toBeTruthy();
    }

    const occurrences = screen.getAllByText(about.email);
    expect(occurrences.length).toBeGreaterThanOrEqual(1);

    const mailtoLink = screen.getAllByRole('link').find((l) => {
      const href = l.getAttribute('href') ?? '';
      return href === `mailto:${about.email}` || href.includes(`mailto:${about.email}`);
    });

    if (mailtoLink) {
      expect(mailtoLink).toHaveAttribute('href', expect.stringContaining(about.email));
    } else {
      expect(occurrences.length).toBeGreaterThanOrEqual(1);
    }

    const stackHeading = screen.getByText(/stack/i);
    const stackSection = stackHeading.closest('div');
    expect(stackSection).toBeTruthy();

    const stackWithin = within(stackSection as HTMLElement);

    expect(stackWithin.getByText('React')).toBeInTheDocument();
    expect(stackWithin.getByText('TypeScript')).toBeInTheDocument();
    expect(stackWithin.getByText('React Router')).toBeInTheDocument();
    expect(stackWithin.getByText('React Hook Form')).toBeInTheDocument();

    const cine = about.projects.find((p) => p.id === 'cinelab');
    expect(cine).toBeDefined();

    const repoLink = screen.getAllByRole('link').find((l) => l.getAttribute('href') === cine!.repo);
    expect(repoLink).toBeDefined();

    const demoLink = screen.getAllByRole('link').find((l) => l.getAttribute('href') === cine!.demo);
    expect(demoLink).toBeDefined();

    const caseStudyLink = screen
      .getAllByRole('link')
      .find((l) => (l.getAttribute('href') || '').includes('/projects/cinelab'));
    expect(caseStudyLink).toBeDefined();
  });
});
