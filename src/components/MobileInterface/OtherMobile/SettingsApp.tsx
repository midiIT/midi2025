import React, { useState, useEffect } from 'react';

interface SettingsAppProps {
  brightness: number;
  setBrightness: React.Dispatch<React.SetStateAction<number>>;
}

const SettingsApp: React.FC<SettingsAppProps> = ({
  brightness,
  setBrightness,
}) => {
  const [currentBrightness, setCurrentBrightness] = useState(brightness);

  useEffect(() => {
    setCurrentBrightness(brightness);
  }, [brightness]);

  const handleBrightnessChange = (value: number) => {
    setCurrentBrightness(value);
    setBrightness(value);
  };

  return (
    <div className="p-4 space-y-6 text-white">
      <h2 className="text-xl font-bold">Nustatymai</h2>

      {/* Brightness Control */}
      <div className="space-y-2">
        <p className="text-sm">Ryškumas</p>
        <input
          type="range"
          min={10}
          max={100}
          value={currentBrightness}
          onChange={e => handleBrightnessChange(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-sm">Ryškumas: {currentBrightness}%</p>
      </div>
    </div>
  );
};

export default SettingsApp;
