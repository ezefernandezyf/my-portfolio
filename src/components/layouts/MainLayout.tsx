import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

interface MainLayoutProps {}

export const MainLayout = (_props: MainLayoutProps): React.JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      <Header />

      <main role="main" className="flex-1 site-container pb-8 pt-6">
        <div className="grid-clean transition-opacity duration-300 ease-in-out">
          <section className="page-transition will-change-opacity motion-safe:transition-opacity">
            <Outlet />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
