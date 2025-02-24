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
// import TerminalInterface from '@/components/TerminalInterface/TerminalInterface.tsx';
import MobileInterface from './components/MobileInterface/MobileInterface';

// import CountdownComponent from '@/components/CountdownComponent/CountdownComponent.tsx';
// import EventsPage from '@/components/EventsPage/EventsPage.tsx';
// import SponsorsPage from '@/components/SponsorsPage/SponsorsPage.tsx';
// import TeamPage from '@/components/TeamPage/TeamPage.tsx';
import Tracking from '@/components/Tracking/Tracking.tsx';
// import TwitchPlayer from '@/components/TwitchPage/TwitchPlayer';
// import GameKatazauras from '@/components/Games/Katazauras/GameKatazauras.tsx';
// import GameKatris from '@/components/Games/Katris/GameKatris';
import { Provider } from 'react-redux';
import store from '@/app/Store.ts';

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
    path: 'mobile',
    element: <MobileInterface />,
  },
  // {
  //   path: 'cli',
  //   element: <TerminalInterface />,
  // },
  // {
  //   path: 'countdown',
  //   element: <CountdownComponent />,
  // },
  // {
  //   path: 'events',
  //   element: <EventsPage />,
  // },
  // {
  //   path: 'sponsors',
  //   element: <SponsorsPage />,
  // },
  // {
  //   path: 'team',
  //   element: <TeamPage />,
  // },
  // {
  //   path: 'twitch',
  //   element: <TwitchPlayer />,
  // },
  // {
  //   path: 'game',
  //   element: <GameKatazauras />,
  // },
  // {
  //   path: 'katris',
  //   element: <GameKatris />,
  // },
]);

const router = createBrowserRouter(routes, { basename: '/2025' });

function addTracking(routes: RouteObject[]): RouteObject[] {
  return routes.map(route => ({
    ...route,
    element: <Tracking element={route.element} />,
  }));
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
