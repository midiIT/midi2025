import React, { useState, useEffect } from 'react';
import CountdownComponent from '../CountdownComponent/CountdownComponent';
import DatePicker from '../EventsPage/DatePicker';
import EventDisplay from '../EventsPage/EventDisplay';
import SwipeablePages from './SwipeablePages';

interface PhoneDisplayProps {
  className?: string;
}

const MobileInterface: React.FC<PhoneDisplayProps> = ({ className = '' }) => {
  const [powerOn, setPowerOn] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // For EventDisplay
  const [showEventInfo, setShowEventInfo] = useState(false); // Controls when EventDisplay is shown

  const togglePower = () => setPowerOn(!powerOn);

  useEffect(() => {
    // Apply styles to the html and body
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overscrollBehavior = 'none';
    document.body.style.backgroundColor = '#111827';
    document.body.style.overflow = 'auto';

    return () => {
      // Cleanup styles when the component is unmounted
      document.documentElement.style.height = '';
      document.body.style.height = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overscrollBehavior = '';
      document.body.style.backgroundColor = '';
      document.body.style.overflow = '';
    };
  }, []);

  const pages = [
    <div className="text-center text-green-400 text-base">
      <p>Home Page</p>
    </div>,
    <div className="w-full h-full flex">
      <CountdownComponent />
    </div>,
    <div className="w-full h-full flex overflow-y-auto">
      <DatePicker
        onDatePicked={date => {
          setSelectedDate(date.toISOString().split('T')[0]);
          setShowEventInfo(true);
        }}
      />
    </div>,
    <div className="text-center text-green-400 text-base"></div>,
  ];

  return (
    <div
      className={`flex items-center justify-center h-screen w-screen bg-gray-900 overflow-hidden  ${className}`}
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
                     landscape:left-[8vw] landscape:top-[2.5vh]  ${powerOn ? 'opacity-100' : 'opacity-50'}`}
        >
          {powerOn && (
            <div className="relative h-full w-full overflow-y-auto">
              <SwipeablePages
                pages={pages.map(page => (
                  <div className="absolute inset-0 h-full w-full flex flex-col overflow-y-auto scrollbar-hide">
                    {page}
                  </div>
                ))}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
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
          )}
        </div>

        {/* Controls */}
        <div
          className={`absolute portrait:bottom-[1vh] portrait:w-full flex flex-col items-center left-0 portrait:space-y-4 
               landscape:absolute landscape:bottom-[35vh] landscape:-right-[88vw] 
               landscape:transform landscape:translate-y-0 landscape:translate-x-0 
               landscape:rotate-[270deg] landscape:space-y-6`}
        >
          {/* Power Button */}
          <button
            onClick={togglePower}
            className={`w-14 h-14 rounded-full bg-gray-500 text-white font-bold hover:bg-gray-400
                       active:bg-gray-600 shadow-xl ${
                         powerOn
                           ? 'ring-4 ring-green-500'
                           : 'ring-4 ring-red-500'
                       }`}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileInterface;
