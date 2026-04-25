import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

import { ThemeProvider } from '../../context/ThemeProvider';
import { MainLayout } from '../layouts/MainLayout';

describe('MainLayout', () => {
  it('renderiza header, outlet y footer en el orden esperado', () => {
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
    expect(screen.getByText('Layout outlet content').parentElement?.previousElementSibling).not.toBeNull();
  });

  it('sube al inicio cuando cambia la ruta', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);

    render(
      <MemoryRouter initialEntries={['/home']}>
        <ThemeProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route
                path="home"
                element={(
                  <div>
                    <Link to="/about">Go to about</Link>
                    <div>Home route</div>
                  </div>
                )}
              />
              <Route path="about" element={<div>About route</div>} />
            </Route>
          </Routes>
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);

    fireEvent.click(screen.getByText('Go to about'));

    expect(screen.getByText('About route')).toBeInTheDocument();
    expect(scrollToSpy).toHaveBeenCalledTimes(2);

    scrollToSpy.mockRestore();
  });
});