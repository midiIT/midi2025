import { Application } from '@/components/GraphicalInterface/types.ts';
import calendarPng from '@/images/calendar.png';
import EventDisplay from '@/components/EventsPage/EventDisplay.tsx';
import { DEFAULT_Z_INDEX } from '@/components/GraphicalInterface/consts.ts';
import teamAppIcon from '@/images/TeamAppIcon.jpg';
import randomTerminal from '@/images/random_terminal.png';
import TerminalInterfaceContent from '../TerminalInterface/TerminalInterfaceContent';
import TeamContent from '../TeamPage/TeamContent';

const applications: Application[] = [
  {
    windowContent: <EventDisplay />,
    hidden: true,
    data: {
      title: 'Kalendorius',
      iconPath: calendarPng,
      minimized: false,
      zIndex: DEFAULT_Z_INDEX,
      focused: false,
    },
  },
  {
    windowContent: <TeamContent />,
    hidden: false,
    data: {
      title: 'Komanda',
      iconPath: teamAppIcon,
      minimized: false,
      zIndex: DEFAULT_Z_INDEX,
      focused: false,
    },
  },
  {
    windowContent: <TerminalInterfaceContent />,
    hidden: false,
    data: {
      title: 'Terminalas',
      iconPath: randomTerminal,
      minimized: false,
      zIndex: DEFAULT_Z_INDEX,
      focused: true,
    },
  },
];

export default applications;
