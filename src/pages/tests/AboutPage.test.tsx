import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AboutPage } from '../AboutPage';
import { about } from '../../data/about';

describe('AboutPage', () => {
  it('renderiza la estructura principal del about con hero, stack, soft skills y educación', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /acerca de mí/i })).toBeInTheDocument();
    expect(screen.getByText(new RegExp(about.name, 'i'))).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /foto de/i })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /ver proyectos/i })).toHaveAttribute('href', '/projects');
    expect(screen.getByRole('link', { name: /contactar/i })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: /descargar cv/i })).toHaveAttribute('href', about.cv);

    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', about.github);
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', about.linkedIn);

    expect(screen.getByText(about.email)).toBeInTheDocument();
    expect(screen.getByText(/disponibilidad: inmediata/i)).toBeInTheDocument();

    const stackHeading = screen.getByRole('heading', { name: /stack tecnológico/i });
    const stackSection = stackHeading.closest('section');
    expect(stackSection).toBeTruthy();
    expect(within(stackSection as HTMLElement).getByText(/frontend core/i)).toBeInTheDocument();
    expect(within(stackSection as HTMLElement).getByText(/styles & ui/i)).toBeInTheDocument();
    expect(within(stackSection as HTMLElement).getByText(/testing & tools/i)).toBeInTheDocument();
    expect(within(stackSection as HTMLElement).getByText('React')).toBeInTheDocument();
    expect(within(stackSection as HTMLElement).getByText('Tailwind CSS')).toBeInTheDocument();
    expect(within(stackSection as HTMLElement).getByText('Vitest')).toBeInTheDocument();

    const softSkillsHeading = screen.getByRole('heading', { name: /habilidades blandas/i });
    const softSkillsSection = softSkillsHeading.closest('section');
    expect(softSkillsSection).toBeTruthy();
    expect(within(softSkillsSection as HTMLElement).getByText(/comunicación clara|clear communication/i)).toBeInTheDocument();
    expect(within(softSkillsSection as HTMLElement).getByText(/trabajo en equipo|teamwork/i)).toBeInTheDocument();

    const educationHeading = screen.getByRole('heading', { name: /educación/i });
    const educationSection = educationHeading.closest('section');
    expect(educationSection).toBeTruthy();
    expect(within(educationSection as HTMLElement).getByText(/analista en sistemas/i)).toBeInTheDocument();
    expect(within(educationSection as HTMLElement).getByText(/ciberseguridad/i)).toBeInTheDocument();
    expect(within(educationSection as HTMLElement).getByText(/desarrollo con ia/i)).toBeInTheDocument();
  });
});
