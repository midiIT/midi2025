import React from 'react';
import PageWithApplications from './ApplicationComponents/PageWithApplications';

// Icons
import teamIcon from '@/images/komanda.png';
import eventsLogo from '@/images/renginiai.png';
import bpLogo from '@/images/BP.png';
import fbLogo from '@/images/fb.png';
import igLogo from '@/images/ig.png';
import photoGalerryIcon from '@/images/PhotoGalleryLogo.png';

// Pages
import TeamPage from '@/components/TeamPage/TeamPage';
import Clock from './OtherMobile/Clock';
import Bp from '@/components/bp/Bp.tsx';
import DatePicker from '@/components/EventsPage/DatePicker.tsx';
import PhotoGalleryContent from '../PhotoGallery/PhotoGalleryContent';

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
        {
          iconPath: eventsLogo,
          appText: 'Renginiai',
          windowContent: DatePicker,
        },
        {
          iconPath: photoGalerryIcon,
          appText: 'Nuotraukų galerija',
          windowContent: PhotoGalleryContent,
        },
        {
          iconPath: bpLogo,
          appText: 'Bendradarbiavimo pasiūlymas',
          windowContent: Bp,
        },
        // {
        //   iconPath: fbLogo,
        //   appText: 'Facebook',
        //   windowContent: TeamPage,
        // },
        // {
        //   iconPath: igLogo,
        //   appText: 'Instagram',
        //   windowContent: TeamPage,
        // },
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
