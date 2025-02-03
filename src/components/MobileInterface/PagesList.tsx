import React from 'react';
import PageWithApplications from './ApplicationComponents/PageWithApplications';

// Icons
import teamIcon from '@/images/komandaTamsi.png';

// Pages
import TeamPage from '@/components/TeamPage/TeamPage';
import Clock from './OtherMobile/Clock';
import DatePicker from '@/components/EventsPage/DatePicker';

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
      ]}
      showWindow={showWindow}
      setShowWindow={setShowWindow}
    />,

    // 3 Page: Countdown and Date Picker
    <div className="absolute top-[32px] w-full flex flex-col items-center justify-center">
      <DatePicker onDatePicked={() => setShowEventInfo(true)} />
    </div>,
  ];
};
