import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('Kraunama...');
  const city = 'Vilnius';

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch weather data for Vilnius
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Vilnius&units=metric&lang=lt&appid=81279801d34470e5dbb037fabe491c60`,
    )
      .then(response => response.json())
      .then(data => {
        setWeather(data.weather[0].description);
        setTemperature(`${Math.round(data.main.temp)}°C`);
      })
      .catch(() => {
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
          {city}
        </p>
        <p className="text-gray-400 text-3xl  font-medium drop-shadow-md landscape">
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
