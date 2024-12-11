import React, { useState } from 'react';
import CRTDisplay from '@/components/CTRDisplay/CTRDisplay';

const TerminalInterface: React.FC = () => {
  // const [inputValue, setInputValue] = useState('');
  const [lines, setLines] = useState<string[]>(['']);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Add a new line on Enter
      setLines(prevLines => [...prevLines, '']);
    } else if (e.key.length === 1) {
      // Add typed character to the current line
      setLines(prevLines => {
        const updatedLines = [...prevLines];
        updatedLines[updatedLines.length - 1] += e.key;
        return updatedLines;
      });
    } else if (e.key === 'Backspace') {
      // Handle backspace
      setLines(prevLines => {
        const updatedLines = [...prevLines];
        const currentLine = updatedLines[updatedLines.length - 1];

        if (currentLine.length > 0) {
          // Remove character from current line
          updatedLines[updatedLines.length - 1] = currentLine.slice(0, -1);
        } else if (updatedLines.length > 1) {
          // Remove the empty line if there are multiple lines
          updatedLines.pop();
        }
        return updatedLines;
      });
    }
  };

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
        <div className="flex mt-4">
          <div className="text-green-500 font-mono">
            &#62;&#62;&#62;
            {lines.map((line, index) => (
              <div key={index}>{line}</div>
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
