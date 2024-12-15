import React from 'react';

interface ApplicationProps {
  iconPath: string;
  appText: string;
  onClick: () => void;
}
const ApplicationIcon: React.FC<ApplicationProps> = ({
  iconPath,
  appText,
  onClick,
}) => {
  return (
    <div className="flex flex-col items-center">
      <button
        onDoubleClick={() => {
          onClick();
        }}
      >
        <img
          className="relative w-32 h-32 p-2 object-contain max-w-full"
          src={iconPath}
          alt="ApplicationIcon Icon"
        />
        <p className="max-w-32 text-center mt-2 break-words">{appText}</p>
      </button>
    </div>
  );
};
export default ApplicationIcon;
