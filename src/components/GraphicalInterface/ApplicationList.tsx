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
    iconPath: randomTerminalPng,
    data: {
      title: 'Terminal',
      minimized: false,
    },
  },
  {
    windowContent: <TempSomethingElse />,
    iconPath: randomSomethingElsePng,
    data: {
      title: 'Something 1',
      minimized: false,
    },
  },
  {
    windowContent: <TempSomethingElse />,
    iconPath: randomSomethingElsePng,
    data: {
      title: 'Something 2',
      minimized: false,
    },
  },
];

export default applications;
