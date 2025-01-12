import React, { useState, useEffect } from 'react';
import { calculateTimeLeft, TimeLeft } from '@/utils/timeUtils';

// a functional component
const CountdownComponent: React.FC = () => {
  const targetDate = import.meta.env.VITE_MIDI_DATE;

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(targetDate),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // with little tailwind css
  return (
    <div className=" bg-blue-500 text-white p-6 rounded-lg flex flex-col items-center sm:w-full sm:h-full">
      <h1 className="text-2xl font-bold mb-4">Time Left</h1>
      <p className="text-lg font-mono bg-blue-800 p-4 rounded-md">
        {timeLeft.days} <span className="font-semibold">Days</span>,{' '}
        {timeLeft.hours} <span className="font-semibold">Hours</span>,{' '}
        {timeLeft.minutes} <span className="font-semibold">Minutes</span>,{' '}
        {timeLeft.seconds} <span className="font-semibold">Seconds</span>
      </p>
    </div>
  );
};

export default CountdownComponent;
