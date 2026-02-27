import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProjectCard } from '../';

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

  const repoLink = screen
    .getAllByRole('link')
    .find((l) => l.getAttribute('href') === 'https://repo');
  expect(repoLink).toBeDefined();

  const demoLink = screen
    .getAllByRole('link')
    .find((l) => l.getAttribute('href') === 'https://demo');
  expect(demoLink).toBeDefined();
  expect(demoLink?.querySelector('svg')).toBeTruthy();

  expect(screen.getByText('React')).toBeInTheDocument();
  expect(screen.getByText('Vite')).toBeInTheDocument();
});
