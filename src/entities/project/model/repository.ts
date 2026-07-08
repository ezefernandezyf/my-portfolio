import { projects } from '../../../data/projects';
import type { Project, ProjectRepository } from './types';

function cloneProject(project: (typeof projects)[number]): Project {
  return {
    id: project.id,
    nameKey: project.nameKey,
    shortKey: project.shortKey,
    repo: project.repo,
    demo: project.demo,
    images: [...project.images],
    tech: [...project.tech],
    year: project.year,
    featured: project.featured,
  };
}

export const projectRepository: ProjectRepository = {
  getProjects(): Project[] {
    return projects.map((project) => cloneProject(project));
  },
  getProjectById(id: string): Project | null {
    const project = projects.find((item) => item.id === id);
    return project ? cloneProject(project) : null;
  },
};
