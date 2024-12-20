import React, { useState, useEffect, useRef } from 'react';

interface SettingsAppProps {
  brightness: number;
  setBrightness: React.Dispatch<React.SetStateAction<number>>;
}

const SettingsApp: React.FC<SettingsAppProps> = ({
  brightness,
  setBrightness,
}) => {
  const [currentBrightness, setCurrentBrightness] = useState(brightness);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentBrightness(brightness);
  }, [brightness]);

  const handleBrightnessChange = (newValue: number) => {
    if (newValue >= 10 && newValue <= 100) {
      setCurrentBrightness(newValue);
      setBrightness(newValue);
    }
  };

  const handleDrag = (event: TouchEvent) => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const rect = slider.getBoundingClientRect();
      const offsetX = event.touches[0].clientX - rect.left;
      const percentage = Math.min(Math.max(offsetX / rect.width, 0), 1);
      const newValue = Math.round(percentage * 90 + 10);
      handleBrightnessChange(newValue);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    handleDrag(e.nativeEvent);

    const moveHandler = (event: TouchEvent) => handleDrag(event);
    const endHandler = () => {
      window.removeEventListener('touchmove', moveHandler);
      window.removeEventListener('touchend', endHandler);
    };

    window.addEventListener('touchmove', moveHandler);
    window.addEventListener('touchend', endHandler);
  };

  return (
    <div className="p-4 space-y-6 text-white">
      <h2 className="text-xl font-bold">Nustatymai</h2>

      {/* Brightness Control */}
      <div className="space-y-2">
        <p className="text-sm">Ryškumas</p>
        <div
          ref={sliderRef}
          className="relative w-full h-8 bg-gray-700 rounded-lg touch-manipulation"
          onTouchStart={handleTouchStart}
        >
          <div
            className="absolute top-1/2 transform -translate-y-1/2 bg-blue-500 h-4 w-4 rounded-full shadow-lg"
            style={{
              left: `${((currentBrightness - 10) / 90) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
          <div
            className="absolute top-1/2 left-0 transform -translate-y-1/2 h-2 bg-blue-500 rounded-l-lg"
            style={{
              width: `${((currentBrightness - 10) / 90) * 100}%`,
            }}
          />
        </div>
        <p className="text-sm">Ryškumas: {currentBrightness}%</p>
      </div>
    </div>
  );
};

export default SettingsApp;
