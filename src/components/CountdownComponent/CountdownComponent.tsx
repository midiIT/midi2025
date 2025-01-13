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
    <div className="p-6 border-4 border-gray-700 rounded-lg flex flex-col items-center sm:w-full sm:h-full bg-black">
      <h1 className="whitespace-pre text-4xl mb-4 tracking-wide border-b-4 border-midi-blue pb-2 text-midi-blue animate-pulse">
        IKI MIDI LIKO
      </h1>
      <div className="relative w-full">
        <div className="bg-black p-4 rounded border-4 border-midi-blue w-full">
          <div className="grid grid-cols-4 gap-2 text-center font-mono">
            <div className="flex flex-col">
              <span className="text-midi-blue text-4xl font-bold pr-10 pl-10">
                {padNumber(timeLeft.days)}
              </span>
              <span className="text-midi-blue text-sm pr-10 pl-10">DIEN</span>
            </div>
            <div className="flex flex-col">
              <span className="text-midi-blue text-4xl font-bold pr-10 pl-10">
                {padNumber(timeLeft.hours)}
              </span>
              <span className="text-midi-blue text-sm pr-10 pl-10">VAL</span>
            </div>
            <div className="flex flex-col">
              <span className="text-midi-blue text-4xl font-bold pr-10 pl-10">
                {padNumber(timeLeft.minutes)}
              </span>
              <span className="text-midi-blue text-sm pr-10 pl-10">MIN</span>
            </div>
            <div className="flex flex-col">
              <span className="text-midi-blue text-4xl font-bold pr-10 pl-10">
                {padNumber(timeLeft.seconds)}
              </span>
              <span className="text-midi-blue text-sm pr-10 pl-10">SEK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownComponent;
