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
    <div className="flex flex-col items-center">
      <button
        onDoubleClick={() => {
          dispatch(
            openApplication({
              minimized: false,
              title: title,
              zIndex: 30,
            }),
          );
        }}
      >
        <img
          className="relative w-32 h-32 p-2 object-contain max-w-full"
          src={iconPath}
          alt="Icon"
        />
        <p className="max-w-32 text-center mt-2 break-words">{title}</p>
      </button>
    </div>
  );
};
export default ApplicationIcon;
