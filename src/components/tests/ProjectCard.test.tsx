import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProjectCard } from '../ProjectCard/ProjectCard';


it('ProjectCard muestra título, enlaces y botón demo con icono', () => {
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

  expect(screen.getByText('Demo')).toBeInTheDocument();

  const caseStudyLink = screen
    .getAllByRole('link')
    .find((l) => l.getAttribute('href') === '/projects/x');
  expect(caseStudyLink).toBeDefined();
  expect(caseStudyLink?.querySelector('svg')).toBeTruthy();

  const repoLink = screen
    .getAllByRole('link')
    .find((l) => l.getAttribute('href') === 'https://repo');
  expect(repoLink).toBeDefined();
  expect(repoLink?.querySelector('svg')).toBeTruthy();

  const demoLink = screen
    .getAllByRole('link')
    .find((l) => l.getAttribute('href') === 'https://demo');
  expect(demoLink).toBeDefined();
  expect(demoLink?.querySelector('svg')).toBeTruthy();

  expect(screen.getByText('React')).toBeInTheDocument();
  expect(screen.getByText('Vite')).toBeInTheDocument();
});

it('ProjectCard cubre los fallback de imagen, featured y exceso de tech', () => {
  render(
    <MemoryRouter>
      <ProjectCard
        id="y"
        nameKey="movie-dashboard.name"
        shortKey="movie-dashboard.short"
        repo={undefined}
        demo={undefined}
        images={[]}
        tech={['React', 'TypeScript', 'Vite', 'Tailwind', 'Zod', 'ESLint']}
      />
    </MemoryRouter>,
  );

  expect(screen.getByText('Movie Management Dashboard')).toBeInTheDocument();
  expect(screen.getByText('Proyecto no encontrado')).toBeInTheDocument();
  expect(screen.getByText('+3')).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /ver repo/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /ver demo/i })).not.toBeInTheDocument();
});

it('ProjectCard cubre el fallback cuando no hay textos directos ni keys', () => {
  render(
    <MemoryRouter>
      <ProjectCard
        id="z"
        repo="https://repo"
        demo="https://demo"
        images={['/img.jpg']}
        tech={['React']}
        year={2024}
      />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('');
  expect(screen.getByRole('link', { name: /ver repo|view repo/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /ver demo|view demo/i })).toBeInTheDocument();
});
