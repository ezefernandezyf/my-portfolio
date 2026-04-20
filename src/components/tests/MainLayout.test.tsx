import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { ThemeProvider } from '../../context/ThemeProvider';
import { MainLayout } from '../layouts/MainLayout';

describe('MainLayout', () => {
  it('renderiza header, outlet y footer', () => {
    render(
      <MemoryRouter initialEntries={['/']}> 
        <ThemeProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<div>Layout outlet content</div>} />
            </Route>
          </Routes>
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText('Layout outlet content')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});