import React, { useState } from 'react';
import CodeEntry from './CodeEntry';
import SecretPage from './SecretPage';

const SecretCodeApp: React.FC = () => {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white p-4">
      {!unlocked ? (
        <>
          <h1 className="text-2xl font-bold mb-4 animate-pulse text-green-400">
            Įveskite Kodą
          </h1>
          <CodeEntry
            correctCode="MIDI2025"
            onUnlock={() => setUnlocked(true)}
          />
        </>
      ) : (
        <SecretPage />
      )}
    </div>
  );
};

export default SecretCodeApp;
