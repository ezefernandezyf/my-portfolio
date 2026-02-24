import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProjectCard } from '../';

test('ProjectCard muestra título, enlaces y botón demo con icono', () => {
  render(
    <MemoryRouter>
      <ProjectCard
        id="x"
        name="Demo"
        short="Short description"
        repo="https://repo"
        demo="https://demo"
        image="/img.jpg"
        tech={['React', 'Vite', 'TypeScript', 'Tailwind', 'Axios', 'Zod']}
        year={2024}
      />
    </MemoryRouter>,
  );

  // título y textos
  expect(screen.getByText('Demo')).toBeInTheDocument();
  expect(screen.getByText('Ver case study')).toBeInTheDocument();
  expect(screen.getByText('Ver repo')).toBeInTheDocument();

  const demoLinks = screen.getAllByRole('link', { name: /Demo/i });
  expect(demoLinks.length).toBeGreaterThan(0);
  expect(demoLinks.some((link) => link.getAttribute('href') === 'https://demo')).toBe(true);

  expect(screen.getByRole('link', { name: /Repositorio Demo/i })).toHaveAttribute(
    'href',
    'https://repo',
  );
});
