import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Todos from './pages/Todos';
import ErrorPage from './pages/ErrorPage';
import GeneralLayout from './layout/GeneralLayout';

interface RouterElement {
  id: number;
  path: string;
  element: React.ReactNode;
  withAuth?: boolean;
}

const routerData: RouterElement[] = [
  {
    id: 0,
    path: '/',
    element: <Home />,
    withAuth: false,
  },
  {
    id: 1,
    path: '/signup',
    element: <SignUp />,
    withAuth: false,
  },
  {
    id: 2,
    path: '/signin',
    element: <SignIn />,
    withAuth: false,
  },
  {
    id: 3,
    path: '/todo',
    element: <Todos />,
    withAuth: true,
  },
];

export const authRoutes = ['/signin', '/signup'];

export const routers = createBrowserRouter(
  routerData.map((router) => {
    return {
      path: router.path,
      withAuth: router.withAuth,
      element: <GeneralLayout withAuth={router.withAuth}>{router.element}</GeneralLayout>,
      errorElement: <ErrorPage />,
    };
  })
);
