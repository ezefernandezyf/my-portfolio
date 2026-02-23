import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectCarousel } from '../';

describe('ProjectCarousel', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('muestra la imagen inicial y cambia con botones y/o indicadores', async () => {
    const images = ['a.jpg', 'b.jpg', 'c.jpg'];

    render(<ProjectCarousel images={images} autoPlay={false} alt="Test preview" />);

    const region = screen.getByRole('region', { name: /test preview carousel/i });
    expect(region).toBeInTheDocument();

    expect(screen.getByText(/imagen 1 de 3/i)).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /siguiente/i });
    const prevBtn = screen.getByRole('button', { name: /anterior/i });

    await act(async () => {
      await userEvent.click(nextBtn);
    });
    expect(screen.getByText(/imagen 2 de 3/i)).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(prevBtn);
    });
    expect(screen.getByText(/imagen 1 de 3/i)).toBeInTheDocument();

    const dot3 = screen.getByRole('button', { name: /ir a imagen 3/i });
    await act(async () => {
      await userEvent.click(dot3);
    });
    expect(screen.getByText(/imagen 3 de 3/i)).toBeInTheDocument();
  });

  it('permite navegar con flechas del teclado cuando el contenedor está enfocado', async () => {
    const images = ['x.jpg', 'y.jpg'];
    render(<ProjectCarousel images={images} autoPlay={false} alt="Keyboard" />);

    const region = screen.getByRole('region', { name: /keyboard carousel/i });
    await act(async () => {
      (region as HTMLElement).focus();
    });

    await act(async () => {
      await userEvent.keyboard('{ArrowRight}');
    });
    expect(screen.getByText(/imagen 2 de 2/i)).toBeInTheDocument();

    await act(async () => {
      await userEvent.keyboard('{ArrowLeft}');
    });
    expect(screen.getByText(/imagen 1 de 2/i)).toBeInTheDocument();
  });
});
