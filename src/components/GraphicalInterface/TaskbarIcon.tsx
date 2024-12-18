import React from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';
import {
  minimizeApplication,
  selectApplication,
} from '@/app/ApplicationsSlice.ts';
import { openContextMenu } from '@/app/ContextMenuSlice.ts';

interface TaskbarIconProps {
  icon: string;
  title: string;
}

const TaskbarIcon: React.FC<TaskbarIconProps> = ({ icon, title }) => {
  const dispatch = useAppDispatch();
  const application = useAppSelector(selectApplication(title));

  return (
    <div
      className={`w-12 h-12 m-1 flex items-center justify-center hover:cursor-pointer ${application?.minimized ? 'bg-white/10' : ''}`}
      onClick={() => dispatch(minimizeApplication(title))}
      onContextMenu={e => {
        e.preventDefault();
        dispatch(openContextMenu({ x: e.pageX, y: e.pageY, title }));
      }}
    >
      <img src={icon} alt="Icon" className="w-10 h-10 object-contain" />
    </div>
  );
};

export default TaskbarIcon;
