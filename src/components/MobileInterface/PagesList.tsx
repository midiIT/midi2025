import React from 'react';
import PageWithApplications from './ApplicationComponents/PageWithApplications';

// Icons
import teamIcon from '@/images/komanda.png';
import eventsLogo from '@/images/renginiai.png';
import fbLogo from '@/images/fb.png';
import igLogo from '@/images/ig.png';
import photoGalerryIcon from '@/images/PhotoGalleryLogo.png';

// Pages
import TeamPage from '@/components/TeamPage/TeamPage';
import Clock from './OtherMobile/Clock';
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
          windowContent: <TeamPage />,
        },
        {
          iconPath: eventsLogo,
          appText: 'Renginiai',
          windowContent: (
            <DatePicker
              onDatePicked={() => setShowEventInfo(true)}
              eventsMonth={true}
            />
          ),
        },
        {
          iconPath: photoGalerryIcon,
          appText: 'Nuotraukų galerija',
          windowContent: <PhotoGalleryContent />,
        },
        {
          iconPath: fbLogo,
          appText: 'Facebook',
          href: 'https://www.facebook.com/midi.lt/',
        },
        {
          iconPath: igLogo,
          appText: 'Instagram',
          href: 'https://www.instagram.com/midi.lt/',
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
