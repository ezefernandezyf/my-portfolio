import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ProjectCaseStudyPage } from '../../features/projects-case-study/page';

describe('MovieDashboardCaseStudy', () => {
  it('muestra la cabecera con repo y demo, más stack y secciones principales', () => {
    render(
      <MemoryRouter>
        <ProjectCaseStudyPage projectId="movie-dashboard" namespace="moviedashboardcasestudy" />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /movie management dashboard/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: /repository movie management dashboard/i,
      }),
    ).toHaveAttribute('href', 'https://github.com/ezefernandezyf/movie-management-dashboard');
    expect(
      screen.getByRole('link', {
        name: /demo movie management dashboard/i,
      }),
    ).toHaveAttribute('href', 'https://moviesdashboard.vercel.app/');

    const aside = screen.getByTestId('stack-aside');
    const withinAside = within(aside);

    expect(withinAside.getByText(/2026/)).toBeInTheDocument();
    expect(withinAside.getAllByText(/featured/i)).not.toHaveLength(0);
    expect(withinAside.getByText(/stack\s*&\s*(tecnolog[ií]as|technologies)/i)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: /problem|problema/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /solution|soluci[oó]n/i,
      }),
    ).toBeInTheDocument();
  });
});