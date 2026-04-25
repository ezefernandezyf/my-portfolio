import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CineLabCaseStudy } from '../Projects/CineLabCaseStudy';

test('CineLab muestra cabecera, metadata y deep dive principal', () => {
  render(
    <MemoryRouter>
      <CineLabCaseStudy />
    </MemoryRouter>,
  );

  const aside = screen.getByTestId('stack-aside');
  const withinAside = within(aside);
  expect(withinAside.getByText(/2026/)).toBeInTheDocument();
  expect(withinAside.getAllByText(/featured/i)).not.toHaveLength(0);
  expect(withinAside.getByText(/stack & tecnologías/i)).toBeInTheDocument();

  expect(screen.getByRole('heading', { name: /problema|problem/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /solución|solution/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /profundización técnica/i })).toBeInTheDocument();
});
