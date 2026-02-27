import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components';
import {
  AboutPage,
  ContactPage,
  HomePage,
  NotFoundPage,
  ProjectsPage,
  CineLabCaseStudy,
  PrivacyPage,
} from '../pages';

export const AppRoutes = (): React.JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="/projects/cinelab" element={<CineLabCaseStudy />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Route>
    </Routes>
  );
};
