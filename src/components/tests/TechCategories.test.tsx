import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

let abilitiesItems: string[] = [];

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: { returnObjects?: boolean; defaultValue?: string }) => {
      if (key === 'abilities.items' && opts?.returnObjects) return abilitiesItems;

      const translations: Record<string, string> = {
        'categoriesTitle.stack': 'Stack',
        'abilities.title': 'Professional skills',
        'categories.frontend': 'Frontend',
        'aboutpage:categories.styles': 'Styling',
      };

      return translations[key] ?? opts?.defaultValue ?? key;
    },
  }),
}));

import { TechCategories } from '../TechCategories/TechCategories';

describe('TechCategories', () => {
  afterEach(() => {
    abilitiesItems = [];
  });

  it('normaliza claves y usa el fallback de abilities cuando no hay traducción', () => {
    render(
      <TechCategories
        categories={[
          {
            titleKey: 'aboutpage.categories.frontend',
            items: ['React', 'TypeScript'],
          },
          {
            title: 'Custom category',
            items: ['Testing'],
          },
          {
            titleKey: 'aboutpage:categories.styles',
            items: ['Tailwind'],
          },
        ]}
        abilities={[
          {
            title: 'Core abilities',
            items: ['Design systems', 'CI/CD'],
          },
        ]}
      />,
    );

    expect(screen.getByText('Stack')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Custom category')).toBeInTheDocument();
    expect(screen.getByText('Styling')).toBeInTheDocument();
    expect(screen.getByText('Core abilities')).toBeInTheDocument();
    expect(screen.getByText('Design systems')).toBeInTheDocument();
    expect(screen.getByText('CI/CD')).toBeInTheDocument();
  });

  it('usa abilities traducidas cuando están disponibles', () => {
    abilitiesItems = ['Mentoring', 'Leadership'];

    render(
      <TechCategories
        categories={[
          {
            titleKey: 'aboutpage.categories.frontend',
            items: ['React'],
          },
        ]}
        abilities={[
          {
            title: 'Should not render',
            items: ['Should not render item'],
          },
        ]}
      />,
    );

    expect(screen.getByText('Mentoring')).toBeInTheDocument();
    expect(screen.getByText('Leadership')).toBeInTheDocument();
    expect(screen.queryByText('Should not render')).not.toBeInTheDocument();
  });
});