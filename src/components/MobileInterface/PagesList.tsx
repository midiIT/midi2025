import React from 'react';
import PageWithApplications from './ApplicationComponents/PageWithApplications';

// Icons
import teamIcon from '@/images/komanda.png';
import eventsLogo from '@/images/renginiai.png';
import fbLogo from '@/images/fb.png';
import igLogo from '@/images/ig.png';
import photoGalerryIcon from '@/images/PhotoGalleryLogo.png';
import volunteersIcon from '@/images/savanoriai.png';

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
    <div className="h-[88vh] overflow-y-scroll">
      <Clock />
      <div className="text-5xl text-center">Organizatoriai</div>
      <div className="flex flex-col items-center gap-10 mt-10">
        <div className="w-[12rem] bg-white rounded-lg">
          <a href="https://midi.lt">
            <img src="images/MIDI_logo.webp" alt="MIDI logo" />
          </a>
        </div>
        <div className="w-[10rem]">
          <a href="https://mif.vusa.lt/lt">
            <img src="images/VUSAMIF_logo.webp" alt="VUSA MIF logo" />
          </a>
        </div>
      </div>
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
          iconPath: volunteersIcon,
          appText: 'Prisijunk prie MIDI!',
          href: 'https://forms.office.com/pages/responsepage.aspx?id=XVfIeiHvL0yhJSx6Ldsk1ozdT6lf8khCpJGHuI2p37JUQUpQRFlBMEtWV0hLU0JCUlI2Uk9IOFVYTS4u&route=shorturl',
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
