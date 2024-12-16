import { Application } from '@/components/GraphicalInterface/types.ts';
import React from 'react';
import randomTerminalPng from '@/images/random_terminal.png';
import randomSomethingElsePng from '@/images/random_cat.jpeg';

const TempTerminal: React.FC = () => {
  return <p>Insert terminal as import later!!!</p>;
};
const TempSomethingElse: React.FC = () => {
  return <p>Insert something else here!</p>;
};

const applications: Application[] = [
  {
    windowContent: <TempTerminal />,
    data: {
      title: 'Terminal',
      iconPath: randomTerminalPng,
      minimized: false,
      zIndex: 30,
    },
  },
  {
    windowContent: <TempSomethingElse />,
    data: {
      title: 'Something 1',
      iconPath: randomSomethingElsePng,
      minimized: false,
      zIndex: 30,
    },
  },
  {
    windowContent: <TempSomethingElse />,
    data: {
      title: 'Something 2',
      iconPath: randomSomethingElsePng,
      minimized: false,
      zIndex: 30,
    },
  },
];

export default applications;
