import { ReactNode } from 'react';

interface ApplicationWindowProps {
  content: ReactNode;
  onExit: () => void;
}

const ApplicationWindowMobile: React.FC<ApplicationWindowProps> = ({
  content,
  onExit,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center p-4">
      <div
        className="absolute bg-gray-700 text-white rounded-lg shadow-xl transition duration-300 ease-out
       transform scale-95 opacity-0 animate-fade-in-scale w-full max-w-2xl h-full overflow-y-auto overscroll-none"
      >
        <button
          onClick={onExit}
          className="absolute right-4 top-4 z-50 w-9 h-8 flex items-center justify-center bg-red-600 rounded-full text-lg font-bold"
        >
          &times;
        </button>
        {content}
      </div>
    </div>
  );
};

export default ApplicationWindowMobile;
