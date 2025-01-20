import React, { useEffect, useRef, useState } from 'react';
import { calculateTimeLeft } from '@/utils/timeUtils';

interface TerminalInterfaceContentProps {
  windowTitle?: string;
  isFocused?: boolean;
}

const TerminalInterfaceContent: React.FC<TerminalInterfaceContentProps> = ({
  windowTitle = '',
  isFocused = false,
}) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [, setHistoryIndex] = useState<number | null>(null);
  const lastLineRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const targetDate = import.meta.env.VITE_MIDI_DATE;

  const printingCommand = (s: string) => '  ' + s;
  const printingCommands = (arr: string[]): string[] =>
    arr.map(s => printingCommand(s));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      const handleCommand = (): string[] => {
        switch (currentInput.trim().toLowerCase()) {
          case '?': {
            return printingCommands([
              'Galimos komandos:',
              "1. 'rėmėjai'",
              "2. 'komanda'",
              "3. 'veiklos'",
              "4. 'laikas'",
            ]);
          }
          case 'remejai':
          case 'remėjai':
          case 'rėmejai':
          case 'rėmėjai': {
            return printingCommands(['Rėmėjų sąrašas:', 'Kolkas nėra']);
          }
          case 'komanda': {
            return printingCommands(['MIDI komanda:', 'Kolkas nėra']);
          }
          case 'veiklos': {
            return printingCommands(['MIDI veiklos:', 'Kolkas nėra']);
          }
          case 'laikas': {
            const timeLeft = calculateTimeLeft(targetDate);
            return printingCommands([
              `Laikas iki MIDI: ${timeLeft.days} dien, ${timeLeft.hours} val, ${timeLeft.minutes} min, ${timeLeft.seconds} sek`,
            ]);
          }
          default:
            return printingCommands([
              "Tokios komandos nėra, jei reikia galimų komandų sąrašo, irašyk '?'",
            ]);
        }
      };

      setLines(prevLines => [
        ...prevLines,
        `>>> ${currentInput}`,
        ...handleCommand(),
      ]);
      setCommandHistory(prevHistory => [...prevHistory, currentInput]);
      setCurrentInput('');
      setHistoryIndex(null);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        setHistoryIndex(prevIndex => {
          const newIndex =
            prevIndex === null
              ? commandHistory.length - 1
              : Math.max(prevIndex - 1, 0);
          setCurrentInput(commandHistory[newIndex] || '');
          return newIndex;
        });
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        setHistoryIndex(prevIndex => {
          const newIndex =
            prevIndex === null
              ? null
              : Math.min(prevIndex + 1, commandHistory.length);
          setCurrentInput(
            newIndex === null || newIndex === commandHistory.length
              ? ''
              : commandHistory[newIndex],
          );
          return newIndex;
        });
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      switch (currentInput[0]?.toLowerCase()) {
        case 'r':
          setCurrentInput('rėmėjai');
          break;
        case 'k':
          setCurrentInput('komanda');
          break;
        case 'v':
          setCurrentInput('veiklos');
          break;
        case 'l':
          setCurrentInput('laikas');
          break;
      }
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

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (isFocused && terminalRef.current) {
      terminalRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div className="space-y-2 flex flex-col overflow-hidden">
      <div className="flex items-center justify-center flex-shrink-0 h-[25%] overflow-hidden">
        <pre className="text-center text-midi-blue pr-20 whitespace-pre leading-none">
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
      <div className="w-full text-center flex-shrink-0">
        <div className="text-xs text-gray-600 leading-none">
          {'='.repeat(200)}
        </div>
      </div>
      <div
        ref={terminalRef}
        id={`terminal-input-${windowTitle}`}
        className="flex-1 overflow-y-auto focus:outline-none px-4"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="whitespace-pre text-lg text-midi-blue break-words">
          {
            '>>> Sveiki prisijungę! Šiame terminale galite sužinoti apie MIDI 2025 rėmėjus, komandą, veiklas ir kt.\n'
          }
          {'>>> Galimos komandos:\n'}
          {"  'rėmėjai'\n"}
          {"  'komanda'\n"}
          {"  'veiklos'\n"}
          {"  'laikas'\n"}
          {lines.map((line, index) => (
            <div
              key={index}
              ref={index === lines.length - 1 ? lastLineRef : null}
            >
              {line}
            </div>
          ))}
          <div>
            {`>>>`} {currentInput}
            <span className="animate-pulse">█</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalInterfaceContent;
