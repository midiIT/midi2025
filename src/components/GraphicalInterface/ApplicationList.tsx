import { Application } from '@/components/GraphicalInterface/types.ts';
import { DEFAULT_Z_INDEX } from '@/components/GraphicalInterface/consts.ts';
import EventDisplay from '@/components/EventsPage/EventDisplay.tsx';
import TerminalInterfaceContent from '../TerminalInterface/TerminalInterfaceContent';
import TeamContent from '../TeamPage/TeamContent';
import calendarIcon from '@/images/kalendorius.png';
import teamAppIcon from '@/images/komanda.png';
import terminalIcon from '@/images/terminalas.png';

const applications: Application[] = [
  {
    windowContent: <EventDisplay />,
    hidden: true,
    data: {
      title: 'EventDisplay',
      iconPath: calendarIcon,
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
      iconPath: terminalIcon,
      minimized: false,
      zIndex: DEFAULT_Z_INDEX,
      focused: true,
    },
  },
];

export default applications;
