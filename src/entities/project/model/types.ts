export interface Project {
  id: string;
  nameKey: string;
  shortKey: string;
  repo: string;
  demo: string;
  images: string[];
  tech: string[];
  year: number;
  featured?: boolean;
}

export interface ProjectRepository {
  getProjects(): Project[];
  getProjectById(id: string): Project | null;
}
