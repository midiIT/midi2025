import React, { useState, useEffect } from 'react';
import SwipeablePages from './SwipeablePages';
import Notification from './OtherMobile/Notification';
import EventDisplay from '../EventsPage/EventDisplay';
import { PagesList } from './PagesList';
import './MobileStyles.css';

// Photos
import MIDI from '@/images/MobileImages/MIDI.png';
import LandscapeMIDI from '@/images/MobileImages/LandscapeMIDI.png';

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

  // Apply styles to body
  useEffect(() => {
    document.body.classList.add('mobile-interface-body');

    return () => {
      document.body.classList.remove('mobile-interface-body');
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
            filter: `brightness(${brightness / 100})`,
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
                <div className="w-1 h-2 bg-white rounded-sm"></div>
                <div className="w-1 h-3 bg-white rounded-sm"></div>
                <div className="w-1 h-4 bg-white rounded-sm"></div>
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
              {/* Pages */}
              <SwipeablePages
                pages={PagesList({
                  brightness,
                  setBrightness,
                  selectedDate,
                  setSelectedDate,
                  setShowEventInfo,
                  showWindow,
                  setShowWindow,
                })}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                disableSwipe={showWindow || showEventInfo}
              />
            </div>
          }
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
      </div>
    </div>
  );
};

export default MobileInterface;
