import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GraphicalInterface from '@/components/GraphicalInterface/GraphicalInterface.tsx';
import TerminalInterface from '@/components/TerminalInterface/TerminalInterface.tsx';

import CountdownComponent from '@/components/CountdownComponent/CountdownComponent.tsx';
import EventsPage from '@/components/EventsPage/EventsPage.tsx';
import SponsorsPage from '@/components/SponsorsPage/SponsorsPage.tsx';
import TeamPage from '@/components/TeamPage/TeamPage.tsx';


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
  {
    path: 'countdown',
    element: <CountdownComponent />,
  },
  {
    path: 'events',
    element: <EventsPage />,
  },
  {
    path: 'sponsors',
    element: <SponsorsPage />,
  },
  {
    path: 'team',
    element: <TeamPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
