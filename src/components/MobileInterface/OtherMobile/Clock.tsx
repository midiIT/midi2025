import React, { useState, useEffect, useRef } from 'react';
import { BACKEND_URL } from '@/consts';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<string>('Kraunama...');
  const [temperature, setTemperature] = useState<string>('Kraunama...');
  const hasFetchedWeather = useRef(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch weather data only once
  useEffect(() => {
    if (hasFetchedWeather.current) return;
    hasFetchedWeather.current = true;

    fetch(`${BACKEND_URL}/weather`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        return response.json();
      })
      .then(data => {
        console.log('Weather Data from API:', data);
        setWeather(data.weather || 'Nėra duomenų');
        setTemperature(data.temperature || '--');
      })
      .catch(error => {
        console.error('Error fetching weather:', error.message);
        setWeather('Nepavyko gauti orų');
        setTemperature('--');
      });
  }, []);

  return (
    <div>
      {/* Time and Date */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center landscape:rotate-[270deg] landscape:-translate-x-[85vh] landscape:top-[19vh]">
        <p className="text-blue-400 text-5xl md:text-7xl font-bold leading-none drop-shadow-md">
          {time.toLocaleTimeString('lt-LT', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        <p className="text-blue-400 text-2xl md:text-4xl mt-4 font-medium drop-shadow-md">
          {time.toLocaleDateString('lt-LT', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </p>
      </div>

      {/* Weather Information */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center landscape:rotate-[270deg] landscape:-translate-[20vh] landscape:bottom-[23vh] landscape:left-[145vh]">
        <p className="text-gray-300 text-xl md:text-3xl font-medium drop-shadow-md">
          Vilnius
        </p>
        <p className="text-gray-400 text-3xl font-medium drop-shadow-md landscape">
          {weather}
        </p>
        <p className="text-blue-400 text-2xl mt-2 font-medium drop-shadow-md">
          {temperature}
        </p>
      </div>
    </div>
  );
};

export default Clock;
