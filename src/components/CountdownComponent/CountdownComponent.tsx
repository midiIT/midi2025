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

  return (
    <div className="bg-green-900 text-white p-6 border-2 border-white rounded-lg flex flex-col items-center sm:w-full sm:h-full">
      <h1 className="text-2xl font-bold mb-4 tracking-wide uppercase border-b-2 border-white pb-2">
        Time Left
      </h1>
      <div className="bg-green-700 p-4 rounded-sm border-2 border-white w-full">
        <p className="text-lg font-mono flex justify-center space-x-6">
          <span>
            <span className="text-white">{timeLeft.days}</span> Days
          </span>
          <span>
            <span className="text-white">{timeLeft.hours}</span> Hours
          </span>
          <span>
            <span className="text-white">{timeLeft.minutes}</span> Minutes
          </span>
          <span>
            <span className="text-white">{timeLeft.seconds}</span> Seconds
          </span>
        </p>
      </div>
    </div>
  );
};

export default CountdownComponent;
