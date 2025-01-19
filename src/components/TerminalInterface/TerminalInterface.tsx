import React, { useEffect, useRef, useState } from 'react';
import { calculateTimeLeft } from '@/utils/timeUtils';
import CRTDisplay from '@/components/CTRDisplay/CTRDisplay';

const TerminalInterface: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const lastLineRef = useRef<HTMLDivElement>(null);
  const targetDate = import.meta.env.VITE_MIDI_DATE;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const handleCommand = (): string[] => {
        switch (currentInput.trim()) {
          case 'sponsors':
            return ['Displaying Sponsors Page...'];
          case 'time': {
            const timeLeft = calculateTimeLeft(targetDate);
            return [
              `Time till MIDI: ${timeLeft.days} Days, ${timeLeft.hours} Hours, ${timeLeft.minutes} Minutes, ${timeLeft.seconds} Seconds`,
            ];
          }
          default:
            return ['Command not found'];
        }
      };

      setLines(prevLines => [
        ...prevLines,
        `>>> ${currentInput}`,
        ...handleCommand(),
      ]);
      setCurrentInput('');
    } else if (e.key.length === 1 && currentInput.length < 100) {
      setCurrentInput(prevInput => prevInput + e.key);
    } else if (e.key === 'Backspace') {
      setCurrentInput(prevInput => prevInput.slice(0, -1));
    }
  };

  useEffect(() => {
    if (lastLineRef.current) {
      lastLineRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lines, currentInput]);

  return (
    <CRTDisplay
      initialPowerState={true}
      onPowerChange={isOn => console.log('Power state:', isOn)}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-center h-[25%]">
          <pre className="text-center whitespace-pre leading-none mr-10">
            {`
            ____    ____ _____ ______   _____ 
            |_   \\  /   _|_   _|_   _ \\ |_   _|
              |   \\/   |   | |   | | \\ \\ | |  
              | |\\  /| |   | |   | |  | | | |  
            _| |_\\/_| |_ _| |_ _| |_.' /_| |_ 
           |_____||_____|_____|______.'|_____|`}
          </pre>
        </div>
        <br />
        <div className="w-full text-center">
          <div className="text-xs text-gray-600 leading-none truncate">
            ===========================================================================================================================================================================
          </div>
        </div>
        <div className="flex mt-4 overflow-y-auto max-h-[75%]">
          <div className="text-green-500 font-mono">
            {lines.map((line, index) => (
              <div
                key={index}
                ref={index === lines.length - 1 ? lastLineRef : null}
              >
                {line}
              </div>
            ))}
            <div>
              {'>>>'} {currentInput}
              <span className="animate-pulse">█</span>
            </div>
          </div>
        </div>

        <input
          type="text"
          onKeyDown={handleKeyDown}
          className="absolute opacity-0 focus:outline-none"
          autoFocus
        />
      </div>
    </CRTDisplay>
  );
};

export default TerminalInterface;
