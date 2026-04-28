import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ProjectCarousel } from '../ProjectCarousel/ProjectCarousel';

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

  it('avanza solo con autoPlay y se pausa al pasar el mouse', async () => {
    vi.useFakeTimers();
    const images = ['a.jpg', 'b.jpg'];

    const { getByRole } = render(<ProjectCarousel images={images} alt="Auto" />);
    expect(screen.getByText(/imagen 1 de 2/i)).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.getByText(/imagen 2 de 2/i)).toBeInTheDocument();

    fireEvent.mouseEnter(getByRole('region', { name: /auto carousel/i }));

    await act(async () => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.getByText(/imagen 2 de 2/i)).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('no crea intervalo cuando hay una sola imagen', () => {
    vi.useFakeTimers();

    render(<ProjectCarousel images={['only.jpg']} autoPlay={true} alt="Single" />);

    expect(screen.getByText(/imagen 1 de 1/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(8000);
    });

    expect(screen.getByText(/imagen 1 de 1/i)).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('reanuda el autoplay al salir del foco o del hover', async () => {
    vi.useFakeTimers();
    const images = ['a.jpg', 'b.jpg'];

    const { getByRole } = render(<ProjectCarousel images={images} alt="Resume" />);
    const region = getByRole('region', { name: /resume carousel/i });

    fireEvent.focus(region);
    await act(async () => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.getByText(/imagen 1 de 2/i)).toBeInTheDocument();

    fireEvent.blur(region);
    await act(async () => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.getByText(/imagen 2 de 2/i)).toBeInTheDocument();

    fireEvent.mouseEnter(region);
    await act(async () => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.getByText(/imagen 2 de 2/i)).toBeInTheDocument();

    fireEvent.mouseLeave(region);
    await act(async () => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.getByText(/imagen 1 de 2/i)).toBeInTheDocument();

    vi.useRealTimers();
  });
});
