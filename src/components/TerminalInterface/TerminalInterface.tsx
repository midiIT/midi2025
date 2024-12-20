import React, { useEffect, useRef, useState } from 'react';
import CRTDisplay from '@/components/CTRDisplay/CTRDisplay';

const TerminalInterface: React.FC = () => {
  const [lines, setLines] = useState<string[]>(['']);
  const lastLineRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setLines(prevLines => [...prevLines, '']);
    } else if (e.key.length === 1 && lines[lines.length - 1].length < 100) {
      setLines(prevLines => {
        const updatedLines = [...prevLines];
        updatedLines[updatedLines.length - 1] += e.key;
        return updatedLines;
      });
    } else if (e.key === 'Backspace') {
      setLines(prevLines => {
        const updatedLines = [...prevLines];
        const currentLine = updatedLines[updatedLines.length - 1];

        if (currentLine.length > 0) {
          updatedLines[updatedLines.length - 1] = currentLine.slice(0, -1);
        }
        return updatedLines;
      });
    }
  };

  useEffect(() => {
    if (lastLineRef.current) {
      lastLineRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lines]);

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
            |_   \\  /   _|_   _|_   _ \`.|_   _|
              |   \\/   |   | |   | | \`. \\ | |  
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
                className={index === lines.length - 1 ? 'inline-flex' : ''}
                key={index}
                ref={index === lines.length - 1 ? lastLineRef : null}
              >
                &#62;&#62;&#62;&nbsp;
                {line}
              </div>
            ))}
            <span className="animate-pulse">█</span>
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
