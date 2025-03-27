import React, { useState, useEffect, useCallback } from 'react';

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

  const loadWeather = useCallback(() => {
    const cachedWeather = localStorage.getItem('weather');
    const currentTime = new Date().getTime();

    if (cachedWeather) {
      const { weather, temperature, timestamp } = JSON.parse(cachedWeather);

      // Use cached weather if 30 minutes have not passed
      if (currentTime - timestamp < 30 * 60 * 1000) {
        setWeather(weather);
        setTemperature(temperature);
        return;
      }
    }

    // Fetch new weather data
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=lt&appid=81279801d34470e5dbb037fabe491c60`,
    )
      .then(response => response.json())
      .then(data => {
        const weatherData = {
          weather: data.weather[0]?.description ?? 'Nėra duomenų',
          temperature:
            data.main?.temp !== undefined
              ? `${Math.round(data.main.temp)}°C`
              : '--',
          timestamp: new Date().getTime(),
        };
        localStorage.setItem('weather', JSON.stringify(weatherData));
        setWeather(weatherData.weather);
        setTemperature(weatherData.temperature);
      })
      .catch(() => {
        setWeather('Nepavyko gauti orų');
        setTemperature('--');
      });
  }, [city]);

  // Fetch weather data on component mount
  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  return (
    <div className="flex flex-col w-full h-[88vh] justify-between">
      {/* Time and Date */}
      <div className="text-center mt-20 mx-auto">
        <p
          style={{
            textShadow:
              '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
          }}
          className="text-white text-5xl md:text-7xl font-bold leading-none drop-shadow-md"
        >
          {time.toLocaleTimeString('lt-LT', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        <p
          style={{
            textShadow:
              '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
          }}
          className="text-white text-2xl md:text-4xl mt-4 font-medium drop-shadow-md"
        >
          {time.toLocaleDateString('lt-LT', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </p>
      </div>

      {/* Weather Information */}
      <div className="text-center mx-auto mb-16">
        <p
          style={{
            textShadow:
              '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
          }}
          className="text-white text-xl md:text-3xl font-medium drop-shadow-md"
        >
          {city}
        </p>
        <p
          style={{
            textShadow:
              '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
          }}
          className="text-white text-3xl  font-medium drop-shadow-md landscape"
        >
          {weather}
        </p>
        <p
          style={{
            textShadow:
              '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
          }}
          className="text-white text-2xl mt-2 font-medium drop-shadow-md"
        >
          {temperature}
        </p>
      </div>
    </div>
  );
};

export default Clock;
