import React from 'react';
import { openApplication } from '@/app/ApplicationsSlice.ts';
import { useAppDispatch } from '@/app/hooks.ts';
import { openContextMenu } from '@/app/ContextMenuSlice.ts';

interface ApplicationProps {
  iconPath: string;
  title: string;
  focused: boolean;
}
const ApplicationIcon: React.FC<ApplicationProps> = ({
  iconPath,
  title,
  focused,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-start h-32">
      <button
        onClick={() => {
          dispatch(
            openApplication({
              minimized: false,
              title: title,
              iconPath: iconPath,
              zIndex: 300,
              focused,
            }),
          );
        }}
        onContextMenu={e => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(
            openContextMenu({
              x: e.pageX,
              y: e.pageY,
              title,
              owner: 'applicationIcon',
            }),
          );
        }}
      >
        <img
          className="relative w-[6.5rem] h-[6.5rem] p-2 object-contain max-w-full"
          src={iconPath}
          alt="Icon"
        />
        <p className="max-w-[6.5rem] text-center break-words">{title}</p>
      </button>
    </div>
  );
};
export default ApplicationIcon;
