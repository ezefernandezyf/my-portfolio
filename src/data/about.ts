export const about = {
  name: 'Ezequiel Fernández',
  role: 'Front-end Developer',
  email: 'ezefernandezyf@gmail.com',
  github: 'https://github.com/ezefernandezyf',
  linkedIn: 'https://www.linkedin.com/in/ezequiel-fernandez-59a21a387/',
  cv: '/CV.pdf',
  summary:
    'Soy Front-end Developer enfocado en construir interfaces limpias, accesibles y mantenibles. Trabajo principalmente con React, TypeScript y JavaScript, desarrollando SPAs que consumen APIs REST y priorizan rendimiento, buenas prácticas y experiencia de usuario. Me interesa escribir código claro, testeable y escalable, aplicando principios de arquitectura por features, manejo de estado eficiente y validación de datos.',
  categories: [
    {
      title: 'Frontend',
      items: ['React', 'TypeScript', 'JavaScript', 'Vite', 'React Router', 'bun', 'HTML'],
    },
    {
      title: 'Estilos',
      items: ['Tailwind', 'CSS'],
    },
    {
      title: 'Testing',
      items: ['Vitest', 'React Testing Library'],
    },
    {
      title: 'APIs',
      items: ['Axios', 'Zod', 'TMDB API'],
    },
    {
      title: 'Herramientas',
      items: ['Git', 'GitHub', 'Prettier', 'ESLint', 'React Hook Form'],
    },
  ],
  projects: [
    {
      id: 'cinelab',
      name: 'CineLab',
      short:
        'Movie Search App — búsqueda, filtros, favoritos persistentes y recomendaciones dinámicas (TMDB). Construida con React, TypeScript y Vite; foco en rendimiento y UX.',
      repo: 'https://github.com/ezefernandezyf/cinelab-react',
      demo: 'https://cinelab-movies.vercel.app',
      whatILearned:
        'Optimización de imágenes, manejo de cache, arquitectura de hooks y testing de UI. (Detalles en el case study)',
      tech: ['React', 'TypeScript', 'TMDB API', 'Vite', 'Tailwind'],
    },
  ],
  education: [
    {
      title: 'Analista en Sistemas - Da Vinci | Primera Escuela de Arte Multimedial',
      period: '2025 - presente',
      bullets: [],
    },
  ],
  availability: 'Disponibilidad: inmediata, horario flexible.',
} as const;
