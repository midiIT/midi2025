import React, { useState, useEffect, useMemo } from 'react';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// Helper function to calculate the time left
const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const CountdownComponent: React.FC = () => {
  const targetDate = useMemo(
    () => new Date(import.meta.env.VITE_MIDI_DATE || '2025-01-01T00:00:00'),
    [],
  );

  // State for the countdown timer
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(targetDate),
  );

  // Effect to start the timer
  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetDate)); // Initialize the state immediately

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]); // Only re-run if targetDate changes

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
