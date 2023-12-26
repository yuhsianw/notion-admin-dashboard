import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WorkspacesLayout from './Workspaces/WorkspacesLayout';
import UsersLayout from './Users/UsersLayout';
import AppLayout from './AppLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'workspaces', element: <WorkspacesLayout /> },
      { path: 'users', element: <UsersLayout /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
