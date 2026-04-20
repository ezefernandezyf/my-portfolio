import { render, screen } from '@testing-library/react';

import { TechChip, TechIcon } from '../TechCategories/TechChip';

describe('TechChip and TechIcon', () => {
  it('renderiza iniciales cuando no hay icono específico', () => {
    render(<TechChip name="Design System" />);

    expect(screen.getByText('DS')).toBeInTheDocument();
    expect(screen.getByText('Design System')).toBeInTheDocument();
  });

  it('cubre el branch de GitHub y el tamaño md', () => {
    const { container } = render(<TechIcon name="GitHub" size="md" />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('cubre el branch de Vite', () => {
    const { container } = render(<TechIcon name="Vite" />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('cubre los branches de servidor y código', () => {
    const { container: serverIcon } = render(<TechIcon name="Zod" />);
    expect(serverIcon.querySelector('svg')).toBeInTheDocument();

    const { container: codeIcon } = render(<TechIcon name="Prettier" />);
    expect(codeIcon.querySelector('svg')).toBeInTheDocument();
  });

  it('permite ocultar el icono desde TechChip', () => {
    const { container } = render(<TechChip name="React" showIcon={false} />);

    expect(container.querySelector('svg')).toBeNull();
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});