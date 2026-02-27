export const about = {
  name: 'Ezequiel Fernández',
  role: 'Front-end Developer',
  email: 'ezefernandezyf@gmail.com',
  github: 'https://github.com/ezefernandezyf',
  linkedIn: 'https://www.linkedin.com/in/ezequiel-fernandez-59a21a387/',
  cv: '/Ezequiel_Fernandez_CV.pdf',

  summaryKey: 'aboutpage.summary',

  categories: [
    {
      titleKey: 'aboutpage.categories.frontend',
      items: ['React', 'TypeScript', 'JavaScript', 'Vite', 'React Router', 'HTML'],
    },
    {
      titleKey: 'aboutpage.categories.styles',
      items: ['Tailwind', 'CSS'],
    },
    {
      titleKey: 'aboutpage.categories.testing',
      items: ['Vitest', 'React Testing Library'],
    },
    {
      titleKey: 'aboutpage.categories.apis',
      items: ['Axios', 'Zod', 'TMDB API'],
    },
    {
      titleKey: 'aboutpage.categories.tools',
      items: ['Git', 'GitHub', 'Bun', 'NPM', 'Prettier', 'ESLint', 'React Hook Form'],
    },
  ],

  abilities: [
    {
      items: [
        'Comunicación clara',
        'Resolución de problemas',
        'Pensamiento analítico',
        'Arquitectura modular',
        'Trabajo en equipo',
        'Scrum / Kanban',
        'Aprendizaje continuo',
        'Autonomía',
      ],
    },
  ],

  projects: [
    {
      id: 'cinelab',
      nameKey: 'cinelab.name',
      shortKey: 'cinelab.short',
      repo: 'https://github.com/ezefernandezyf/cinelab-react',
      demo: 'https://cinelab-movies.vercel.app',
      whatILearnedKey: 'projects.cinelab.whatILearned',
      tech: ['React', 'TypeScript', 'TMDB API', 'Vite', 'Tailwind'],
    },
  ],

  education: [
    {
      titleKey: 'aboutpage.education.0.title',
      period: '2025 - presente',
      bulletsKeys: [],
    },
  ],

  availabilityKey: 'aboutpage.availability',
} as const;
