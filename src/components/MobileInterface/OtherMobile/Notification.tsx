import React from 'react';

interface NotificationProps {
  dismissNotification: () => void;
}

const Notification: React.FC<NotificationProps> = ({ dismissNotification }) => {
  return (
    <div
      className="absolute top-2 left-[5%] w-[90%] bg-blue-600 bg-opacity-80 text-white rounded-lg shadow-lg p-4 flex items-center justify-between 
                     z-50 animate-slide-in"
      style={{ animation: 'slide-in 0.5s ease-out' }}
    >
      {/* Message Content */}
      <div className="flex items-center space-x-3 animate-pulse">
        <span className="text-3xl ">📩</span>
        <div>
          <p className="font-bold text-lg">Nauja žinutė iš MIDI 2025</p>
          <p className="text-sm">Galite eiti per puslapius braukdami ekraną!</p>
        </div>
      </div>

      {/* Dismiss Button */}
      <button
        onClick={dismissNotification}
        className="bg-blue-800 hover:bg-blue-900 rounded-full w-6 h-6 flex items-center justify-center text-xs"
      >
        ✕
      </button>

      {/* Slide-In Animation */}
      <style>
        {`
              @keyframes slide-in {
                0% {
                  transform: translateY(-150%);
                  opacity: 0;
                }
                100% {
                  transform: translateY(0);
                  opacity: 1;
                }
              }
            `}
      </style>
    </div>
  );
};
export default Notification;
