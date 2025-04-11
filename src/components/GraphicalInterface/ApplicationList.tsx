import { Application } from '@/components/GraphicalInterface/types.ts';
import { DEFAULT_Z_INDEX } from '@/components/GraphicalInterface/consts.ts';
import EventDisplay from '@/components/EventsPage/EventDisplay.tsx';
import TerminalInterfaceContent from '../TerminalInterface/TerminalInterfaceContent';
import TeamContent from '../TeamPage/TeamContent';
import Bp from '@/components/bp/Bp.tsx';
import DatePicker from '@/components/EventsPage/DatePicker.tsx';
import PhotoGalleryContent from '../PhotoGallery/PhotoGalleryContent';
import SponsorsPage from '@/components/SponsorsPage/SponsorsPage';
import calendarIcon from '@/images/kalendorius.png';
import teamAppIcon from '@/images/komanda.png';
import terminalIcon from '@/images/terminalas.png';
import eventsLogo from '@/images/renginiai.png';
import bpLogo from '@/images/BP.png';
import fbLogo from '@/images/fb.png';
import igLogo from '@/images/ig.png';
import photoGalerryIcon from '@/images/PhotoGalleryLogo.png';
import volunteersIcon from '@/images/savanoriai.png';
import sponsorIcon from '@/images/Sponsors/sponsor.png';
import rokoOperaIcon from '@/images/roko_opera.png';

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
    windowContent: <SponsorsPage />,
    hidden: false,
    data: {
      title: 'Rėmėjai',
      iconPath: sponsorIcon,
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
  {
    windowContent: <PhotoGalleryContent />,
    hidden: false,
    data: {
      title: 'Nuotraukų galerija',
      iconPath: photoGalerryIcon,
      minimized: false,
      zIndex: DEFAULT_Z_INDEX,
      focused: true,
    },
  },
  {
    windowContent: <Bp />,
    hidden: false,
    data: {
      title: 'Bendradarbiavimo pasiūlymas',
      iconPath: bpLogo,
      minimized: false,
      zIndex: DEFAULT_Z_INDEX,
      focused: true,
    },
  },
  {
    windowContent: <DatePicker eventsMonth={true} isApp={true} />,
    hidden: false,
    data: {
      title: 'Renginiai',
      iconPath: eventsLogo,
      minimized: false,
      zIndex: DEFAULT_Z_INDEX,
      focused: true,
    },
  },
  {
    hidden: false,
    data: {
      title: 'Facebook',
      iconPath: fbLogo,
    },
    href: 'https://www.facebook.com/midi.lt/',
  },
  {
    hidden: false,
    data: {
      title: 'Instagram',
      iconPath: igLogo,
    },
    href: 'https://www.instagram.com/midi.lt/',
  },
  {
    hidden: false,
    data: {
      title: 'Prisijunk prie MIDI!',
      iconPath: volunteersIcon,
    },
    href: 'https://forms.office.com/pages/responsepage.aspx?id=XVfIeiHvL0yhJSx6Ldsk1ozdT6lf8khCpJGHuI2p37JUQUpQRFlBMEtWV0hLU0JCUlI2Uk9IOFVYTS4u&route=shorturl',
  },
  {
    hidden: false,
    data: {
      title: 'MIDI Roko Opera',
      iconPath: rokoOperaIcon,
    },
    href: 'https://www.facebook.com/events/622614794023338',
  },
];

export default applications;
