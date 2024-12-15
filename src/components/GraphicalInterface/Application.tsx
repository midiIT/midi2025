import React from 'react';

interface ApplicationProps {
  iconPath: string;
  appText: string;
  windowContent: React.FC;
  onClick: (windowContent: React.FC) => void;
}
const Application: React.FC<ApplicationProps> = ({
  iconPath,
  appText,
  windowContent,
  onClick,
}) => {
  const isTouchDevice =
    'ontouchstart' in window || navigator.maxTouchPoints > 0;

  const handleTouch = () => {
    if (isTouchDevice) {
      onClick(windowContent);
    }
  };

  const handleDoubleClick = () => {
    if (!isTouchDevice) {
      onClick(windowContent);
    }
  };

  return (
    <div className="md:flex md:flex-col md:items-center lg:flex lg:flex-col lg:items-center es:flex">
      <button onClick={handleTouch} onDoubleClick={handleDoubleClick}>
        <img
          className="relative lg:w-32 lg:h-32 lg:p-2 lg:object-contain max-w-full es:w-20 es:h-20 es:p-2 es:top-2 es:object-contain"
          src={iconPath}
          alt="Application Icon"
        />
        <p className="lg:max-w-32 text-center lg:mt-2 break-words es:max-w-18 es:mt-2">
          {appText}
        </p>
      </button>
    </div>
  );
};
export default Application;
