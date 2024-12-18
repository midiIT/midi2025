import React from 'react';

interface ApplicationProps {
  iconPath: string;
  appText: string;
  windowContent: React.FC;
  onClick: (windowContent: React.FC) => void;
}
const ApplicationMobile: React.FC<ApplicationProps> = ({
  iconPath,
  appText,
  windowContent,
  onClick,
}) => {
  const handleTouch = () => {
    onClick(windowContent);
  };

  return (
    <div className="flex">
      <button onClick={handleTouch} className="focus:outline-none">
        <img
          className="relative max-w-full w-20 h-20 p-2 top-2 object-contain"
          src={iconPath}
          alt="Application Icon"
        />
        <p className="text-center break-words max-w-18 mt-2">{appText}</p>
      </button>
    </div>
  );
};
export default ApplicationMobile;
