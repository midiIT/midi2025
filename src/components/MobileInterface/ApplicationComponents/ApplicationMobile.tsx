import React, { ReactNode } from 'react';

interface ApplicationProps {
  iconPath: string;
  windowContent?: ReactNode;
  href?: string;
  onClick: () => void;
}
const ApplicationMobile: React.FC<ApplicationProps> = ({
  iconPath,
  windowContent,
  href,
  onClick,
}) => {
  const handleTouch = () => {
    if (href) window.open(href, '_blank');
    else if (windowContent) onClick();
  };

  return (
    <div className="flex">
      <button onClick={handleTouch} className="focus:outline-none">
        <img
          className="relative max-w-full w-20 h-20 p-2 top-2 object-contain"
          src={iconPath}
          alt="Application Icon"
        />
      </button>
    </div>
  );
};
export default ApplicationMobile;
