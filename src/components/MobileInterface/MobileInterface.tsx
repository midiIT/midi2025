import React, { useState, useEffect } from 'react';
import SwipeablePages from './SwipeablePages';
import PageWithApplications from './ApplicationComponents/PageWithApplications';
import Notification from './OtherMobile/Notification';

// Pages
import TeamPage from '../TeamPage/TeamPage';
import SponsorsPage from '../SponsorsPage/SponsorsPage';
import SettingsApp from './OtherMobile/SettingsApp';
import Clock from './OtherMobile/Clock';
import DatePicker from '../EventsPage/DatePicker';
import EventDisplay from '../EventsPage/EventDisplay';
import CountdownComponent from '../CountdownComponent/CountdownComponent';
import SecretCodeApp from '../SecretPage/SecretCodeApp';

// Photos
import RandomTerminalPng from '@/images/random_terminal.png';
import MIDI from '@/images/MobileImages/MIDI.png';
import LandscapeMIDI from '@/images/MobileImages/LandscapeMIDI.png';
import Sponsors from '@/images/MobileImages/sponsors.png';
import Settings from '@/images/MobileImages/settings.png';
import Anonymous from '@/images/MobileImages/anonymous.png';

interface PhoneDisplayProps {
  className?: string;
}

const MobileInterface: React.FC<PhoneDisplayProps> = ({ className = '' }) => {
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // For EventDisplay
  const [showEventInfo, setShowEventInfo] = useState(false); // Controls when EventDisplay is shown
  const [showWindow, setShowWindow] = useState(false);
  const [showNotification, setShowNotification] = useState(true); // State for the message notification
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight,
  );
  const [time, setTime] = useState(new Date()); // For status bar time
  const [brightness, setBrightness] = useState(80); // Brightness state

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Change document style
  useEffect(() => {
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = '#111827';
    document.body.style.overflow = 'auto';

    return () => {
      document.documentElement.style.height = '';
      document.body.style.height = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.backgroundColor = '';
      document.body.style.overflow = '';
    };
  }, []);

  // Handle landscape mode
  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Pages array
  const pages = [
    // 1 Page
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <Clock />
    </div>,

    // 2 Page
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
        { iconPath: Sponsors, appText: 'test', windowContent: SponsorsPage },
        { iconPath: Sponsors, appText: 'test', windowContent: SponsorsPage },
        {
          iconPath: Anonymous,
          appText: 'Paslaptis',
          windowContent: SecretCodeApp,
        },
      ]}
      showWindow={showWindow}
      setShowWindow={setShowWindow}
    />,

    // 3 Page
    <div className="w-full h-full flex flex-col items-center justify-center space-y-0">
      <CountdownComponent />
      <DatePicker
        onDatePicked={date => {
          setSelectedDate(date.toISOString().split('T')[0]);
          setShowEventInfo(true);
        }}
      />
    </div>,
    <div className="text-center"></div>,
  ];

  return (
    <div
      className={`flex items-center justify-center h-screen w-screen bg-gray-900 overflow-hidden ${className}`}
    >
      {/* Phone box */}
      <div
        className="relative w-[100vw] h-[100%] landscape:w-[100%] landscape:h-[90%]
                   flex flex-row justify-between items-center 
                   bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2rem] shadow-2xl border-[10px]
                   border-gray-600 p-4"
      >
        {/* Speaker Slot */}
        <div
          className="portrait:absolute top-2 w-[25%] h-2 bg-gray-600 rounded-full left-[37%]
                     landscape:rotate-[270deg] landscape:w-[10%] landscape:top-1/2 landscape:left-1/2
                     landscape:transform landscape:-translate-x-1/2"
        ></div>

        {/* MIDI */}
        <div
          className="absolute top-6 left-0 w-full text-center text-white font-bold text-xl tracking-wider
                     landscape:top-1/2 landscape:transform landscape:-translate-x-1/2 landscape:-translate-y-1/2 
                     landscape:rotate-[270deg] landscape:origin-center landscape:left-10"
        >
          MIDI 2025
        </div>

        {/* Screen Area */}
        <div
          className={`absolute h-[82vh] w-[90vw] left-[2.5vw] top-[7vh] bg-black rounded-[1rem] border-4 border-gray-600
                     overflow-hidden transition-opacity duration-500 landscape:h-[80vh] landscape:w-[80vw] shadow-inner
                     landscape:left-[8vw] landscape:top-[2.5vh]`}
          style={{
            backgroundImage: isLandscape
              ? `url(${LandscapeMIDI})`
              : `url(${MIDI})`,
            backgroundColor: 'black',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: `brightness(${brightness / 100})`, // Apply brightness
          }}
        >
          {/* Notification */}
          {showNotification && (
            <Notification
              dismissNotification={() => setShowNotification(false)}
            />
          )}

          {/* Status bar */}
          <div
            className={`absolute top-0 left-0 w-full h-8 flex items-center justify-between px-4 bg-black${' bg-opacity-100'} text-white text-xs transition-opacity duration-500 `}
          >
            {/* Time on the Left */}
            <div className="flex items-center">
              <span>
                {time.toLocaleTimeString('lt-LT', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex space-x-1 items-end">
                <div className="w-1 h-2 bg-white rounded-sm"></div>{' '}
                <div className="w-1 h-3 bg-white rounded-sm"></div>{' '}
                <div className="w-1 h-4 bg-white rounded-sm"></div>{' '}
              </div>

              {/* Battery Icon */}
              <div className="relative flex items-center">
                <div className="relative w-8 h-4 border-2 border-white rounded-sm flex items-center justify-start">
                  <div
                    className={`h-full bg-green-600`}
                    style={{ width: '69%' }}
                  ></div>

                  <span className="absolute left-1 text-xs text-gray-300 font-bold">
                    69
                  </span>
                </div>

                <div className="w-1 h-2 bg-white ml-1"></div>
              </div>
            </div>
          </div>

          {
            <div className="relative h-full w-full overflow-y-auto scrollbar-hide">
              <SwipeablePages
                pages={pages.map(page => (
                  <div className="absolute inset-0 h-full w-full flex flex-col overflow-hidden scrollbar-hide">
                    {page}
                  </div>
                ))}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                disableSwipe={showWindow || showEventInfo}
              />

              {/* Event Pop-Up */}
              {showEventInfo && selectedDate && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 rounded-[1rem]">
                  <div className="relative bg-gray-800 rounded-lg shadow-lg p-6 w-[90%] h-[80%] overflow-y-auto">
                    <button
                      onClick={() => setShowEventInfo(false)}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white rounded-full font-bold flex items-center justify-center"
                    >
                      ✕
                    </button>
                    <EventDisplay eventDate={selectedDate} />
                  </div>
                </div>
              )}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default MobileInterface;
