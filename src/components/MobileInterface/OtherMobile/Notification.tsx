import React, { useState, useEffect } from 'react';

interface NotificationProps {
  dismissNotification: () => void;
}

const Notification: React.FC<NotificationProps> = ({ dismissNotification }) => {
  const [startY, setStartY] = useState<number | null>(null);
  const [translateY, setTranslateY] = useState(0);

  // Apply styles to body
  useEffect(() => {
    document.body.classList.add('notification');

    return () => {
      document.body.classList.remove('notification');
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startY !== null) {
      const deltaY = e.touches[0].clientY - startY;
      if (deltaY < 0) {
        setTranslateY(deltaY);
      }
    }
  };

  const handleTouchEnd = () => {
    if (translateY < -50) {
      dismissNotification();
    }
    setTranslateY(0);
  };

  return (
    <div
      className="absolute top-2 left-[5%] w-[90%] bg-blue-600 bg-opacity-80 text-white rounded-lg shadow-lg p-4 flex items-center justify-between 
                 z-50"
      style={{
        transform: `translateY(${translateY}px)`,
        transition: translateY === 0 ? 'transform 0.3s ease' : 'none',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Message Content */}
      <div className="flex items-center space-x-3 animate-pulse">
        <span className="text-3xl">📩</span>
        <div>
          <p className="font-bold text-lg">Nauja žinutė iš MIDI 2025</p>
          <p className="text-sm">Galite eiti per puslapius braukdami ekraną!</p>
        </div>
      </div>

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
