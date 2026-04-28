import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components';
import { ProjectCaseStudyPage } from '../features/projects-case-study/page';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { PrivacyPage } from '../pages/PrivacyPage';

export const AppRoutes = (): React.JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="/projects/cinelab" element={<ProjectCaseStudyPage projectId="cinelab" namespace="cinelabcasestudy" />} />
        <Route path="/projects/movie-dashboard" element={<ProjectCaseStudyPage projectId="movie-dashboard" namespace="moviedashboardcasestudy" />} />
        <Route path="/projects/chefcitoia" element={<ProjectCaseStudyPage projectId="chefcitoia" namespace="chefcitoiacasestudy" />} />
        <Route path="/projects/nexus-talent" element={<ProjectCaseStudyPage projectId="nexus-talent" namespace="nexustalentcasestudy" />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Route>
    </Routes>
  );
};
