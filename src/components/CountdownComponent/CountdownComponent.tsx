import React, { useState, useEffect } from 'react';
import { calculateTimeLeft, TimeLeft } from '@/utils/timeUtils';

// a functional component
const CountdownComponent: React.FC = () => {
  const targetDate = import.meta.env.VITE_MIDI_DATE;

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(targetDate),
  );

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetDate)); // Initialize the state immediately

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const padNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="p-6 md:border-4 border-b-4 border-gray-700 rounded-lg flex flex-col items-center w-[98%] sm:w-full sm:h-full bg-black">
      <h1 className="whitespace-pre text-4xl mb-4 tracking-wide border-b-4 border-midi-blue pb-2 text-midi-blue animate-pulse">
        IKI MIDI LIKO
      </h1>
      <div className="relative md:w-full w-[77vw]">
        <div className="bg-black p-4 rounded border-4 border-midi-blue w-full">
          <div className="grid grid-cols-4 gap-2 md:gap-16 md:mx-8 text-center font-mono m-auto">
            <div className="flex flex-col">
              <span className="text-midi-blue text-5xl font-bold">
                {padNumber(timeLeft.days)}
              </span>
              <span className="text-midi-blue text-xl">D</span>
            </div>
            <div className="flex flex-col">
              <span className="text-midi-blue text-5xl font-bold">
                {padNumber(timeLeft.hours)}
              </span>
              <span className="text-midi-blue text-xl">VAL</span>
            </div>
            <div className="flex flex-col">
              <span className="text-midi-blue text-5xl font-bold">
                {padNumber(timeLeft.minutes)}
              </span>
              <span className="text-midi-blue text-xl">MIN</span>
            </div>
            <div className="flex flex-col">
              <span className="text-midi-blue text-5xl font-bold">
                {padNumber(timeLeft.seconds)}
              </span>
              <span className="text-midi-blue text-xl">SEK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownComponent;
