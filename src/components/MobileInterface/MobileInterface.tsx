import React, { useRef, useState } from 'react';
import CountdownComponent from '../CountdownComponent/CountdownComponent';
import DatePicker from '../EventsPage/DatePicker';
import EventDisplay from '../EventsPage/EventDisplay';

interface PhoneDisplayProps {
  className?: string;
}

const MobileInterface: React.FC<PhoneDisplayProps> = ({ className = '' }) => {
  const [powerOn, setPowerOn] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // For EventDisplay
  const [showEventInfo, setShowEventInfo] = useState(false); // Controls when EventDisplay is shown

  const scrollRef = useRef<HTMLDivElement>(null); // Reference to the scrollable screen

  const togglePower = () => setPowerOn(!powerOn);

  const handleScroll = (direction: 'up' | 'down') => {
    if (scrollRef.current) {
      const currentScrollTop = scrollRef.current.scrollTop;
      const scrollAmount = 50; // Scroll distance
      scrollRef.current.scrollTo({
        top:
          direction === 'up'
            ? currentScrollTop - scrollAmount
            : currentScrollTop + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const pages = [
    <div className="text-center text-green-400 text-base">
      <p>Home Page</p>
    </div>,

    <div className="w-full h-full flex flex-col items-center justify-center ">
      <CountdownComponent />
    </div>,

    <div className="w-full h-full flex items-center justify-center">
      <DatePicker
        onDatePicked={date => {
          setSelectedDate(date.toISOString().split('T')[0]);
          setShowEventInfo(false);
        }}
      />
    </div>,

    showEventInfo && selectedDate ? (
      <div className="w-full h-full flex items-center justify-center">
        <EventDisplay eventDate={selectedDate} />
      </div>
    ) : null,
  ];

  const goToNextPage = () => {
    if (currentPage === 2 && selectedDate) return;
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleOkPress = () => {
    if (currentPage === 2 && selectedDate) {
      setShowEventInfo(true);
      setCurrentPage(3);
    }
  };

  return (
    <div
      className={`flex items-center justify-center h-screen w-screen bg-gray-900 overflow-hidden ${className}`}
    >
      {/* Phone box */}
      <div
        className="relative w-[90%] h-[100%] landscape:w-[100%] landscape:h-[90%]
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
          ref={scrollRef}
          className={`absolute h-[55%] w-[85%] left-[7%] top-[8%] bg-black rounded-[1rem] border-4 border-gray-600
                     overflow-y-scroll transition-opacity duration-500 landscape:h-[85%] landscape:w-[55%] shadow-inner
                     landscape:left-[8%] landscape:top-[7%] ${powerOn ? 'opacity-100' : 'opacity-50'}`}
        >
          {powerOn && (
            <div className="h-full flex items-center justify-center">
              {pages[currentPage]}
            </div>
          )}
        </div>

        {/* Controls */}
        <div
          className={`absolute portrait:bottom-9 portrait:w-full flex flex-col items-center left-0 portrait:space-y-4 
                     landscape:absolute landscape:left-[80%] landscape:top-1/2 
                     landscape:transform landscape:-translate-x-1/2 landscape:-translate-y-1/2
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
            aria-label="Power"
          >
            ⚫
          </button>
          {/* Navigation Pad */}
          <div
            className="relative w-36 h-36 bg-gray-700 rounded-full flex items-center justify-center shadow-lg
                          border-4 border-gray-500"
          >
            {/* Up Button */}
            <button
              className="absolute top-1 w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center
                         text-white font-bold hover:bg-gray-500 active:bg-gray-700 shadow-md"
              aria-label="Up"
              onClick={() => handleScroll('up')}
            >
              ▲
            </button>

            {/* Left Button */}
            <button
              className="absolute left-1 w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center
                         text-white font-bold hover:bg-gray-500 active:bg-gray-700 shadow-md"
              aria-label="Previous Page"
              onClick={goToPreviousPage}
            >
              ◀
            </button>

            {/* OK Button */}
            <button
              className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center text-white
                         font-bold hover:bg-gray-600 active:bg-gray-800 shadow-lg border-2 border-gray-500"
              aria-label="Center"
              onClick={handleOkPress}
            >
              OK
            </button>

            {/* Right Button */}
            <button
              className="absolute right-1 w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center
                         text-white font-bold hover:bg-gray-500 active:bg-gray-700 shadow-md"
              aria-label="Next Page"
              onClick={goToNextPage}
            >
              ▶
            </button>

            {/* Down Button */}
            <button
              className="absolute bottom-1 w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center
                        text-white font-bold hover:bg-gray-500 active:bg-gray-700 shadow-md"
              aria-label="Down"
              onClick={() => handleScroll('down')}
            >
              ▼
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileInterface;
