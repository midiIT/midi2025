import React, { useEffect } from 'react';
import CRTDisplay from '@/components/CTRDisplay/CTRDisplay';
import Taskbar from '@/components/GraphicalInterface/Taskbar.tsx';
import ApplicationsGrid from '@/components/GraphicalInterface/ApplicationsGrid.tsx';
import Widgets from '@/components/GraphicalInterface/Widgets.tsx';

import { useAppDispatch } from '@/app/hooks.ts';
import { closeContextMenu } from '@/app/ContextMenuSlice.ts';

const GraphicalInterface: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClick = () => dispatch(closeContextMenu());
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  });

  return (
    <CRTDisplay
      initialPowerState={true}
      onPowerChange={isOn => console.log('Power state:', isOn)}
    >
      <div
        id="graphical-interface"
        className="flex flex-col justify-between content-center h-full"
      >
        <div className="flex justify-between m-4">
          <ApplicationsGrid />
          <Widgets />
        </div>
        <Taskbar />
      </div>
    </CRTDisplay>
  );
};

export default GraphicalInterface;
