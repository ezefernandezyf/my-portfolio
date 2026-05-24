import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components';
import { ProjectCaseStudyPage } from '../features/projects-case-study/page';
const HomePage = lazy(() => import('../pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('../pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ProjectsPage = lazy(() => import('../pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ContactPage = lazy(() => import('../pages/ContactPage').then(m => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const PrivacyPage = lazy(() => import('../pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));

export const AppRoutes = (): React.JSX.Element => {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>}>
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
        <Route path="/projects/echolog" element={<ProjectCaseStudyPage projectId="echolog" namespace="echologcasestudy" />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Route>
    </Routes>
    </Suspense>
  );
};
