import { Application } from '@/components/GraphicalInterface/types.ts';
import React from 'react';
import randomTerminalPng from '@/images/random_terminal.png';
import randomSomethingElsePng from '@/images/random_cat.jpeg';
import calendarPng from '@/images/calendar.png';
import EventDisplay from '@/components/EventsPage/EventDisplay.tsx';
import { DEFAULT_Z_INDEX } from '@/components/GraphicalInterface/consts.ts';

const TempTerminal: React.FC = () => {
  return <p>Insert terminal as import later!!!</p>;
};
const TempSomethingElse: React.FC = () => {
  return <p>Insert something else here!</p>;
};

const applications: Application[] = [
  {
    windowContent: <TempTerminal />,
    hidden: false,
    data: {
      title: 'Terminal',
      iconPath: randomTerminalPng,
      minimized: false,
      zIndex: DEFAULT_Z_INDEX,
    },
  },
  {
    windowContent: <TempSomethingElse />,
    hidden: false,
    data: {
      title: 'Something 1',
      iconPath: randomSomethingElsePng,
      minimized: false,
      zIndex: DEFAULT_Z_INDEX,
    },
  },
  {
    windowContent: <TempSomethingElse />,
    hidden: false,
    data: {
      title: 'Something 2',
      iconPath: randomSomethingElsePng,
      minimized: false,
      zIndex: DEFAULT_Z_INDEX,
    },
  },
  {
    windowContent: <EventDisplay />,
    hidden: true,
    data: {
      title: 'Calendar',
      iconPath: calendarPng,
      minimized: false,
      zIndex: DEFAULT_Z_INDEX,
    },
  },
];

export default applications;
