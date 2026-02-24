import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CineLabCaseStudy } from '../Projects/CineLabCaseStudy';

test('CineLab muestra el stack por secciones en el aside', () => {
  render(
    <MemoryRouter>
      <CineLabCaseStudy />
    </MemoryRouter>,
  );

  const aside = screen.getByTestId('stack-aside');
  const withinAside = within(aside);
  expect(withinAside.getByText('Frontend')).toBeInTheDocument();
  expect(withinAside.getByText('Estilos')).toBeInTheDocument();
  expect(withinAside.getByText('Data & APIs')).toBeInTheDocument();
  expect(withinAside.getByText('Estado')).toBeInTheDocument();
  expect(withinAside.getByText('Testing')).toBeInTheDocument();
  expect(withinAside.getByText('Control de versiones')).toBeInTheDocument();

  expect(withinAside.getByText('React')).toBeInTheDocument();
  expect(withinAside.getByText('TMDB API')).toBeInTheDocument();
});
