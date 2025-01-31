import React from 'react';
import PageWithApplications from './ApplicationComponents/PageWithApplications';

// Photos
// import terminalIcon from '@/images/terminalas.png';
import teamIcon from '@/images/komanda.png';
// import Sponsors from '@/images/MobileImages/sponsors.png';
// import Settings from '@/images/MobileImages/settings.png';
// import Anonymous from '@/images/MobileImages/anonymous.png';

// Pages
import TeamPage from '../TeamPage/TeamPage';
// import SponsorsPage from '../SponsorsPage/SponsorsPage';
// import SettingsApp from './OtherMobile/SettingsApp';
import Clock from './OtherMobile/Clock';
// import SecretCodeApp from '../SecretPage/SecretCodeApp';
import CountdownComponent from '../CountdownComponent/CountdownComponent';
import DatePicker from '../EventsPage/DatePicker';

interface PagesProps {
  brightness: number;
  setBrightness: React.Dispatch<React.SetStateAction<number>>;
  setShowEventInfo: React.Dispatch<React.SetStateAction<boolean>>;
  showWindow: boolean;
  setShowWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PagesList = ({
  // brightness,
  // setBrightness,
  setShowEventInfo,
  showWindow,
  setShowWindow,
}: PagesProps): React.ReactElement[] => {
  return [
    // 1 Page: Clock
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <Clock />
    </div>,

    // 2 Page: Applications
    <PageWithApplications
      applications={[
        {
          iconPath: teamIcon,
          appText: 'Komanda',
          windowContent: TeamPage,
        },
        // { iconPath: Sponsors, appText: 'Rėmėjai', windowContent: SponsorsPage },
        // {
        //   iconPath: Settings,
        //   appText: 'Nustatymai',
        //   windowContent: () => (
        //     <SettingsApp
        //       brightness={brightness}
        //       setBrightness={setBrightness}
        //     />
        //   ),
        // },
        // {
        //   iconPath: Anonymous,
        //   appText: 'Paslaptis',
        //   windowContent: SecretCodeApp,
        // },
      ]}
      showWindow={showWindow}
      setShowWindow={setShowWindow}
    />,

    // 3 Page: Countdown and Date Picker
    <div className="absolute top-0 w-full h-full flex flex-col items-center justify-center space-y-0">
      <CountdownComponent />
      <DatePicker onDatePicked={() => setShowEventInfo(true)} />
    </div>,
  ];
};
