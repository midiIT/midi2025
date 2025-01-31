import React from 'react';
import PageWithApplications from './ApplicationComponents/PageWithApplications';
import { setEventDate } from '@/app/ApplicationsSlice.ts';
import { useAppDispatch } from '@/app/hooks.ts';

// Photos
import RandomTerminalPng from '@/images/random_terminal.png';
import Sponsors from '@/images/MobileImages/sponsors.png';
import Settings from '@/images/MobileImages/settings.png';
import Anonymous from '@/images/MobileImages/anonymous.png';

// Pages
import TeamPage from '../TeamPage/TeamPage';
import SponsorsPage from '../SponsorsPage/SponsorsPage';
import SettingsApp from './OtherMobile/SettingsApp';
import Clock from './OtherMobile/Clock';
import SecretCodeApp from '../SecretPage/SecretCodeApp';
import CountdownComponent from '../CountdownComponent/CountdownComponent';
import DatePicker from '../EventsPage/DatePicker';

import AllForms from '../RegistrationForms/AllForms';

interface PagesProps {
  brightness: number;
  setBrightness: React.Dispatch<React.SetStateAction<number>>;
  setShowEventInfo: React.Dispatch<React.SetStateAction<boolean>>;
  showWindow: boolean;
  setShowWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PagesList = ({
  brightness,
  setBrightness,
  setShowEventInfo,
  showWindow,
  setShowWindow,
}: PagesProps): React.ReactElement[] => {
  const dispatch = useAppDispatch();

  return [
    // 1 Page: Clock
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <Clock />
    </div>,

    // 2 Page: Applications
    <PageWithApplications
      title="Pagrindinis"
      applications={[
        {
          iconPath: RandomTerminalPng,
          appText: 'Komanda',
          windowContent: TeamPage,
        },
        { iconPath: Sponsors, appText: 'Rėmėjai', windowContent: SponsorsPage },
        {
          iconPath: Settings,
          appText: 'Nustatymai',
          windowContent: () => (
            <SettingsApp
              brightness={brightness}
              setBrightness={setBrightness}
            />
          ),
        },
        {
          iconPath: Anonymous,
          appText: 'Paslaptis',
          windowContent: SecretCodeApp,
        },
        {
          iconPath: RandomTerminalPng,
          appText: 'Registracija',
          windowContent: AllForms,
        },
      ]}
      showWindow={showWindow}
      setShowWindow={setShowWindow}
    />,

    // 3 Page: Countdown and Date Picker
    <div className="w-full h-full flex flex-col items-center justify-center space-y-0 translate-y-[4vh] landscape:translate-y-[7vh]">
      <CountdownComponent />
      <DatePicker
        onDatePicked={date => {
          dispatch(setEventDate(date.toISOString().split('T')[0]));
          setShowEventInfo(true);
        }}
      />
    </div>,
  ];
};
