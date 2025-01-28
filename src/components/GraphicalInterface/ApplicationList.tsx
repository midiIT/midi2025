import { Application } from '@/components/GraphicalInterface/types.ts';
import calendarPng from '@/images/calendar.png';
import EventDisplay from '@/components/EventsPage/EventDisplay.tsx';
import { DEFAULT_Z_INDEX } from '@/components/GraphicalInterface/consts.ts';
import TeamPage from '@/components/TeamPage/TeamPage.tsx';
import teamAppIcon from '@/images/TeamAppIcon.jpg';
import randomTerminal from '@/images/random_terminal.png';
import TerminalInterfaceContent from '../TerminalInterface/TerminalInterfaceContent';

const applications: Application[] = [
  {
    windowContent: <EventDisplay />,
    hidden: true,
    data: {
      title: 'Kalendorius',
      iconPath: calendarPng,
      minimized: false,
      zIndex: DEFAULT_Z_INDEX,
    },
  },
  {
    windowContent: <TeamPage />,
    hidden: false,
    data: {
      title: 'Komanda',
      iconPath: teamAppIcon,
      minimized: false,
      zIndex: DEFAULT_Z_INDEX,
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
    },
  },
];

export default applications;
