import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AboutPage } from '../AboutPage';
import { about } from '../../data/about';

describe('AboutPage', () => {
  it('renderiza las secciones principales, enlaces y el stack categorizado', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /acerca de mí/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: new RegExp(about.name, 'i') })).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: new RegExp(`Descargar CV de ${about.name}`, 'i') }),
    ).toHaveAttribute('href', about.cv);
    expect(
      screen.getByRole('link', { name: new RegExp(`GitHub de ${about.name}`, 'i') }),
    ).toHaveAttribute('href', about.github);
    expect(
      screen.getByRole('link', { name: new RegExp(`LinkedIn de ${about.name}`, 'i') }),
    ).toHaveAttribute('href', about.linkedIn);

    expect(
      screen.getByText(new RegExp(about.summary.split('.')[0].trim(), 'i')),
    ).toBeInTheDocument();

    const occurrences = screen.getAllByText(about.email);
    expect(occurrences.length).toBeGreaterThanOrEqual(1);

    const mailtoLink = screen.getByRole('link', { name: new RegExp(about.email, 'i') });
    expect(mailtoLink).toHaveAttribute('href', `mailto:${about.email}`);

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
    expect(
      screen.getByRole('link', { name: new RegExp(`Repositorio ${cine!.name}`, 'i') }),
    ).toHaveAttribute('href', cine!.repo);
    expect(
      screen.getByRole('link', { name: new RegExp(`Demo ${cine!.name}`, 'i') }),
    ).toHaveAttribute('href', cine!.demo);
    expect(screen.getByRole('link', { name: /case study/i })).toBeInTheDocument();
  });
});
