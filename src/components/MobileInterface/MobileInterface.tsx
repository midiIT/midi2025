import React, { useState, useEffect } from 'react';
import SwipeablePages from './SwipeablePages';
import Notification from './OtherMobile/Notification';
import EventDisplay from '../EventsPage/EventDisplay';
import { PagesList } from './PagesList';
import './MobileStyles.css';

// Photos
import backgroundImg from '@/images/MobileImages/fonas.png';

interface PhoneDisplayProps {
  className?: string;
}

const MobileInterface: React.FC<PhoneDisplayProps> = ({ className = '' }) => {
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const [showEventInfo, setShowEventInfo] = useState(false); // Controls when EventDisplay is shown
  const [showWindow, setShowWindow] = useState(false);
  const [showNotification, setShowNotification] = useState(true); // State for the message notification
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

  return (
    <div
      className={`flex items-center justify-center h-screen w-screen bg-gray-900 overflow-scroll ${className}`}
    >
      {/* Phone box */}
      <div
        className="relative w-[100vw] h-[100%]
                   flex flex-row justify-between items-center 
                   bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2rem] shadow-2xl border-[10px]
                   border-gray-600 p-4"
      >
        {/* Speaker Slot */}
        <div className="portrait:absolute top-2 w-[25%] h-2 bg-gray-600 rounded-full left-[37%]" />

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
          className={`absolute h-[88vh] w-[90vw] left-[2.5vw] top-[7vh] bg-black rounded-[1rem] border-4 border-gray-600
                     transition-opacity duration-500 shadow-inner`}
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundColor: 'black',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: `brightness(${brightness / 100})`,
          }}
        >
          {/* Notification */}
          {(localStorage.getItem('notificationAlreadyShown') === null ||
            localStorage.getItem('notificationAlreadyShown') === '1') &&
            showNotification && (
              <Notification
                dismissNotification={() => setShowNotification(false)}
              />
            )}

          {/* Status bar */}
          <div
            className="absolute top-0 left-0 w-full h-7 flex items-center justify-between px-6
                     bg-black bg-opacity-90 text-white text-sm font-medium backdrop-blur-sm "
          >
            {/* Time on the Left */}
            <div className="flex items-center">
              <span className="font-semibold tracking-wide">
                {time.toLocaleTimeString('lt-LT', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {/* Signal Strength */}
              <div className="flex flex-row-reverse space-x-0.5 space-x-reverse items-end h-3">
                <div className="w-0.5 h-3 bg-white rounded-sm opacity-90"></div>
                <div className="w-0.5 h-2.5 bg-white rounded-sm opacity-90"></div>
                <div className="w-0.5 h-2 bg-white rounded-sm opacity-90"></div>
                <div className="w-0.5 h-1.5 bg-white rounded-sm opacity-90"></div>
              </div>

              {/* Battery Icon */}
              <div className="relative flex items-center h-3">
                <div className="relative w-6 h-3 border border-white rounded-sm flex items-center">
                  <div
                    className="h-full bg-white transition-all duration-300"
                    style={{ width: '69%' }}
                  ></div>
                </div>
                <div className="w-0.5 h-2 bg-white ml-0.5 rounded-r-sm"></div>
              </div>
            </div>
          </div>

          {
            <div className="h-full w-full scrollbar-hide">
              {/* Pages */}
              <SwipeablePages
                pages={PagesList({
                  brightness,
                  setBrightness,
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
          {showEventInfo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 rounded-[1rem]">
              <div className="relative bg-gray-800 rounded-lg shadow-lg p-6 w-[90%] h-[80%] overflow-y-auto">
                <button
                  onClick={() => setShowEventInfo(false)}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white rounded-full font-bold flex items-center justify-center"
                >
                  ✕
                </button>
                <EventDisplay />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileInterface;
