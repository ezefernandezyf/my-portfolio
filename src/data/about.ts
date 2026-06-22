interface AboutCategory {
  titleKey: string;
  items: readonly string[];
}

interface AboutAbilityGroup {
  items: readonly string[];
}

interface AboutProject {
  id: string;
  nameKey: string;
  shortKey: string;
  repo?: string;
  demo?: string;
  whatILearnedKey: string;
  tech: readonly string[];
}

interface AboutEducation {
  titleKey: string;
  periodKey: string;
  bulletsKeys: readonly string[];
}

interface AboutData {
  name: string;
  role: string;
  email: string;
  github: string;
  linkedIn: string;
  cv: string;
  summaryKey: string;
  categories: readonly AboutCategory[];
  abilities: readonly AboutAbilityGroup[];
  abilitiesKey: string;
  projects: readonly AboutProject[];
  education: readonly AboutEducation[];
  availabilityKey: string;
}

export const about: AboutData = {
  name: 'Ezequiel Fernández',
  role: 'Full Stack Developer',
  email: 'ezefernandezyf@gmail.com',
  github: 'https://github.com/ezefernandezyf',
  linkedIn: 'https://www.linkedin.com/in/ezequiel-fernandez-59a21a387/',
  cv: '/Ezequiel_Fernandez_CV.pdf',

  summaryKey: 'aboutpage.summary',

  categories: [
    {
      titleKey: 'aboutpage.categories.frontend',
      items: ['React', 'TypeScript', 'JavaScript', 'Vite', 'TanStack Query', 'React Router', 'HTML'],
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
  
  abilitiesKey: 'abilities.items',

  projects: [
    {
      id: 'echolog',
      nameKey: 'echolog.name',
      shortKey: 'echolog.short',
      repo: 'https://github.com/ezefernandezyf/echolog',
      demo: 'https://echolog-web.vercel.app',
      whatILearnedKey: 'projects.echolog.whatILearned',
      tech: ['React 19', 'TypeScript', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Tailwind 4', 'Zod'],
    },
    {
      id: 'movie-dashboard',
      nameKey: 'movie-dashboard.name',
      shortKey: 'movie-dashboard.short',
      repo: 'https://github.com/ezefernandezyf/movie-management-dashboard',
      demo: 'https://moviesdashboard.vercel.app/',
      whatILearnedKey: 'projects.movie-dashboard.whatILearned',
      tech: ['React', 'TypeScript', 'Tanstack Query', 'Vite', 'Supabase', 'Tailwind'],
    },
    {
      id: 'cinelab',
      nameKey: 'cinelab.name',
      shortKey: 'cinelab.short',
      repo: 'https://github.com/ezefernandezyf/cinelab-react',
      demo: 'https://cinelab-movies.vercel.app',
      whatILearnedKey: 'projects.cinelab.whatILearned',
      tech: ['React', 'TypeScript', 'TMDB API', 'Vite', 'Tailwind'],
    },
    {
      id: 'chefcitoia',
      nameKey: 'chefcitoia.name',
      shortKey: 'chefcitoia.short',
      repo: 'https://github.com/ezefernandezyf/ia-recipe-generator',
      demo: 'https://chefcitoia.vercel.app',
      whatILearnedKey: 'projects.chefcitoia.whatILearned',
      tech: ['React', 'TypeScript', 'Zod', 'Vite', 'Tailwind'],
    },
    {
      id: 'geo-seo-opencode',
      nameKey: 'geo-seo-opencode.name',
      shortKey: 'geo-seo-opencode.short',
      repo: 'https://github.com/ezefernandezyf/geo-seo-opencode',
      whatILearnedKey: 'projects.geo-seo-opencode.whatILearned',
      tech: ['Bash', 'Python', 'Shell Scripting', 'Cross-Platform', 'MIT License'],
    },
  ],

  education: [
    {
      titleKey: 'aboutpage.education.0.title',
      periodKey: 'education.0.period',
      bulletsKeys: [],
    },
    {
      titleKey: 'aboutpage.education.1.title',
      periodKey: 'education.1.period',
      bulletsKeys: [],
    },
    {
      titleKey: 'aboutpage.education.2.title',
      periodKey: 'education.2.period',
      bulletsKeys: [],
    },
    {
      titleKey: 'aboutpage.education.3.title',
      periodKey: 'education.3.period',
      bulletsKeys: [],
    },
  ],

  availabilityKey: 'aboutpage.availability',
};
