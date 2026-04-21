import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const MainLayout = (): React.JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body">
      <Header />

      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
