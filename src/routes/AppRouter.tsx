import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';

export const AppRouter = (): React.JSX.Element => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
