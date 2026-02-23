import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const MainLayout = (): React.JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      <Header />

      <main role="main" className="flex-1 site-container py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
