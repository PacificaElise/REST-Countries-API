import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { Details } from './pages/Details';
import { NotFound } from './pages/NotFound';
import { RootLayout } from './layout/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'country/:name',
        element: <Details />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export const App = () => <RouterProvider router={router} />;
