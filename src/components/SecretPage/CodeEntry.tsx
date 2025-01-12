import React, { useState } from 'react';

interface CodeEntryProps {
  correctCode: string;
  onUnlock: () => void;
}

const CodeEntry: React.FC<CodeEntryProps> = ({ correctCode, onUnlock }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (input === correctCode) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="text"
        placeholder="Įveskite kodą"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="px-4 py-2 rounded border border-gray-400 text-black"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 px-4 py-2 text-white rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Patvirtinti
      </button>
      {error && (
        <p className="text-red-500">Neteisingas kodas. Bandykite dar kartą.</p>
      )}
    </div>
  );
};

export default CodeEntry;
