import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import './index.css';
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import GraphicalInterface from '@/components/GraphicalInterface/GraphicalInterface.tsx';
import TerminalInterface from '@/components/TerminalInterface/TerminalInterface.tsx';

import CountdownComponent from '@/components/CountdownComponent/CountdownComponent.tsx';
import EventsPage from '@/components/EventsPage/EventsPage.tsx';
import SponsorsPage from '@/components/SponsorsPage/SponsorsPage.tsx';
import TeamPage from '@/components/TeamPage/TeamPage.tsx';
import Tracking from '@/components/Tracking/Tracking.tsx';

import GameKatazauras from '@/components/Games/Katazauras/GameKatazauras.tsx';

const routes = addTracking([
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
  {
    path: 'game',
    element: <GameKatazauras />,
  },
]);

const router = createBrowserRouter(routes);

function addTracking(routes: RouteObject[]): RouteObject[] {
  return routes.map(route => ({
    ...route,
    element: <Tracking element={route.element} />,
  }));
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
