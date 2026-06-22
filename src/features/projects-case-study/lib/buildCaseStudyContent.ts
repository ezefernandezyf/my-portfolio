type TranslationFunction = (key: string, options?: Record<string, unknown>) => unknown;

type StackSection = {
  title: string;
  items: string[];
};

type CaseStudySection =
  | {
      kind: 'list';
      heading: string;
      items: string[];
      icon: 'architecture' | 'accessibility' | 'performance' | 'challenges' | 'improvements';
      span?: 'wide';
    }
  | {
      kind: 'code';
      heading: string;
      title: string;
      code: string;
      description: string;
    };

export type CaseStudyContent = {
  stackSections: StackSection[];
  sections: CaseStudySection[];
};

type StackItem = {
  titleKey: string;
  defaultTitle: string;
  items: string[];
};

const stackByProject: Record<string, StackItem[]> = {
  echolog: [
    { titleKey: 'stack.sections.frontend', defaultTitle: 'Frontend', items: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'React Router 7'] },
    { titleKey: 'stack.sections.backend', defaultTitle: 'Backend & API', items: ['Node.js', 'Express 5', 'REST API', 'JWT (httpOnly cookies)'] },
    { titleKey: 'stack.sections.state', defaultTitle: 'State & Validation', items: ['React Query', 'Zustand', 'Zod', 'React Hook Form'] },
    { titleKey: 'stack.sections.data', defaultTitle: 'Database & ORM', items: ['PostgreSQL', 'Prisma ORM', 'Composite keys', 'SQLite (dev)'] },
    { titleKey: 'stack.sections.testing', defaultTitle: 'Testing & Infra', items: ['Vitest', 'Testing Library', 'Playwright', 'Supertest', 'GitHub Actions CI'] },
  ],
  'movie-dashboard': [
    { titleKey: 'stack.sections.frontend', defaultTitle: 'Frontend', items: ['React', 'TypeScript', 'Vite'] },
    { titleKey: 'stack.sections.styles', defaultTitle: 'Styles', items: ['Tailwind CSS'] },
    { titleKey: 'stack.sections.data', defaultTitle: 'Data', items: ['Supabase', 'React Query'] },
    { titleKey: 'stack.sections.forms', defaultTitle: 'Forms', items: ['react-hook-form', 'Zod'] },
    {
      titleKey: 'stack.sections.testing',
      defaultTitle: 'Testing',
      items: ['Vitest', 'React Testing Library'],
    },
    { titleKey: 'stack.sections.vcs', defaultTitle: 'Version control', items: ['Git', 'GitHub'] },
  ],
  cinelab: [
    { titleKey: 'stack.sections.frontend', defaultTitle: 'Frontend', items: ['React', 'TypeScript', 'Vite'] },
    { titleKey: 'stack.sections.styles', defaultTitle: 'Styles', items: ['Tailwind CSS'] },
    { titleKey: 'stack.sections.data', defaultTitle: 'Data & APIs', items: ['TMDB API', 'Axios'] },
    {
      titleKey: 'stack.sections.state',
      defaultTitle: 'State',
      items: ['Context API', 'Custom hooks (useApi, useFavorites, useLocalStorage)'],
    },
    {
      titleKey: 'stack.sections.testing',
      defaultTitle: 'Testing',
      items: ['Vitest', 'React Testing Library'],
    },
    { titleKey: 'stack.sections.vcs', defaultTitle: 'Version control', items: ['Git', 'GitHub'] },
  ],
  chefcitoia: [
    { titleKey: 'stack.sections.frontend', defaultTitle: 'Frontend', items: ['React 19', 'TypeScript', 'Vite 5'] },
    { titleKey: 'stack.sections.styles', defaultTitle: 'Styles', items: ['Tailwind CSS 4'] },
    {
      titleKey: 'stack.sections.data',
      defaultTitle: 'Data',
      items: ['Fetch + AbortController', '/api/recipe-generator/*', 'recipeMapper'],
    },
    { titleKey: 'stack.sections.forms', defaultTitle: 'Forms', items: ['Zod', 'react-hook-form'] },
    { titleKey: 'stack.sections.testing', defaultTitle: 'Testing', items: ['Vitest', 'Testing Library'] },
    { titleKey: 'stack.sections.vcs', defaultTitle: 'Version control', items: ['Git', 'GitHub'] },
  ],
  'nexus-talent': [
    {
      titleKey: 'stack.sections.frontend',
      defaultTitle: 'Frontend',
      items: ['React 19', 'TypeScript', 'Tailwind CSS 4', 'Framer Motion'],
    },
    { titleKey: 'stack.sections.state', defaultTitle: 'State & Validation', items: ['TanStack Query', 'Zod', 'Context API'] },
    {
      titleKey: 'stack.sections.backend',
      defaultTitle: 'Backend & Auth',
      items: ['Supabase Auth', 'Supabase Postgres'],
    },
    {
      titleKey: 'stack.sections.testing',
      defaultTitle: 'Testing & Infra',
      items: ['Vitest', 'React Testing Library', 'Vercel'],
    },
  ],
  'geo-seo-opencode': [
    {
      titleKey: 'stack.sections.tools',
      defaultTitle: 'Herramientas / Tools',
      items: ['Bash', 'Python', 'Shell Scripting'],
    },
    {
      titleKey: 'stack.sections.languages',
      defaultTitle: 'Lenguajes / Languages',
      items: ['Bash', 'Python'],
    },
    {
      titleKey: 'stack.sections.platforms',
      defaultTitle: 'Plataformas / Platforms',
      items: ['Cross-Platform', 'MIT License'],
    },
  ],
};

function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map((item) => String(item)) : [];
}

function toText(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

export function buildCaseStudyContent(projectId: string, t: TranslationFunction): CaseStudyContent | null {
  const stackItems = stackByProject[projectId];
  if (!stackItems) {
    return null;
  }

  return {
    stackSections: stackItems.map((stackItem) => ({
      title: toText(t(stackItem.titleKey, { defaultValue: stackItem.defaultTitle })),
      items: stackItem.items,
    })),
    sections: [
      {
        kind: 'list',
        heading: toText(t('architecture.heading')),
        items: toStringArray(t('architecture.list', { returnObjects: true })),
        icon: 'architecture',
        span: 'wide',
      },
      {
        kind: 'list',
        heading: toText(t('accessibility.heading')),
        items: toStringArray(t('accessibility.list', { returnObjects: true })),
        icon: 'accessibility',
      },
      {
        kind: 'list',
        heading: toText(t('performance.heading')),
        items: toStringArray(t('performance.list', { returnObjects: true })),
        icon: 'performance',
      },
      {
        kind: 'list',
        heading: toText(t('challenges.heading')),
        items: toStringArray(t('challenges.list', { returnObjects: true })),
        icon: 'challenges',
      },
      {
        kind: 'list',
        heading: toText(t('improvements.heading')),
        items: toStringArray(t('improvements.list', { returnObjects: true })),
        icon: 'improvements',
      },
      {
        kind: 'code',
        heading: toText(t('implementation.heading')),
        title: toText(t('implementation.hookTitle')),
        code: toText(t('implementation.hookCode', { defaultValue: '' })),
        description: toText(t('implementation.hookDescription')),
      },
    ],
  };
}