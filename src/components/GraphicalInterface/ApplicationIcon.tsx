import React, { ReactNode } from 'react';
import { openApplication } from '@/app/ApplicationsSlice.ts';
import { useAppDispatch } from '@/app/hooks.ts';

interface ApplicationProps {
  iconPath: string;
  title: string;
  application: ReactNode;
}
const ApplicationIcon: React.FC<ApplicationProps> = ({ iconPath, title }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-start h-32">
      <button
        onDoubleClick={() => {
          dispatch(
            openApplication({
              minimized: false,
              title: title,
              iconPath: iconPath,
              zIndex: 30,
            }),
          );
        }}
      >
        <img
          className="relative w-24 h-24 p-2 object-contain max-w-full"
          src={iconPath}
          alt="Icon"
        />
        <p className="max-w-24 text-center break-words">{title}</p>
      </button>
    </div>
  );
};
export default ApplicationIcon;
