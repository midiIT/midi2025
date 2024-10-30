import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GraphicalInterface from '@/components/GraphicalInterface/GraphicalInterface.tsx';
import TerminalInterface from '@/components/TerminalInterface/TerminalInterface.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'gui',
    element: <GraphicalInterface />,
  },
  {
    path: 'cli',
    element: <TerminalInterface />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
