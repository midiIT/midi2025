import React, { useState, useEffect } from 'react';

// a functional component
const CountdownComponent: React.FC = () => {
  const targetDate = '2024-12-24T23:59:59'; // for now let's say 'time until christmas'

  // helper function
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = new Date(targetDate).getTime() - now.getTime(); // in milliseconds

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  // state to hold the calculated time left
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // a hook to set up a timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft()); // update the time left every 1s
    }, 1000);

    return () => clearInterval(timer); // cleanup func
  }, [targetDate]);

  // with little tailwind css
  return (
    <div className="countdown-container bg-blue-500 text-white p-6 rounded-lg flex flex-col items-center">
      <h1 className="countdown-header text-2xl font-bold mb-4">Time Left</h1>
      <p className="countdown-time text-lg font-mono bg-blue-800 p-4 rounded-md">
        {timeLeft.days} <span className="font-semibold">Days</span>,{' '}
        {timeLeft.hours} <span className="font-semibold">Hours</span>,{' '}
        {timeLeft.minutes} <span className="font-semibold">Minutes</span>, {' '}
        {timeLeft.seconds} <span className="font-semibold">Seconds</span>
      </p>
    </div>
  );
};

export default CountdownComponent;
