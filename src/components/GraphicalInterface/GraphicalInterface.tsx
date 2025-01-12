import React, { useEffect } from 'react';
import CRTDisplay from '@/components/CTRDisplay/CTRDisplay';
import Taskbar from '@/components/GraphicalInterface/Taskbar.tsx';
import ApplicationsGrid from '@/components/GraphicalInterface/ApplicationsGrid.tsx';
import Widgets from '@/components/GraphicalInterface/Widgets.tsx';

import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';
import {
  closeContextMenu,
  openContextMenu,
  selectContextMenuData,
  selectContextMenuOpen,
} from '@/app/ContextMenuSlice.ts';
import ContextMenu from '@/components/GraphicalInterface/ContextMenu.tsx';

const GraphicalInterface: React.FC = () => {
  const dispatch = useAppDispatch();
  const contextMenuOpen = useAppSelector(selectContextMenuOpen);
  const contextMenuData = useAppSelector(selectContextMenuData);

  // Disables right click everywhere except where it's setup
  // Disables context menu when clicking anywhere
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
    <CRTDisplay initialPowerState={true}>
      <div
        id="graphical-interface"
        className="flex flex-col justify-between content-center h-full"
        onContextMenu={e => {
          e.preventDefault();
          dispatch(
            openContextMenu({
              x: e.pageX,
              y: e.pageY,
              title: '',
              owner: 'desktop',
            }),
          );
        }}
      >
        <div className="flex justify-between m-4">
          <ApplicationsGrid />
          <Widgets />
        </div>
        <Taskbar />
        {contextMenuOpen && contextMenuData.owner === 'desktop' && (
          <ContextMenu
            content={[
              <div key="fb">
                <a
                  href="https://www.facebook.com/midi.lt/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Check out MIDI on Facebook!
                </a>
              </div>,
              <div key="ig">
                <a
                  href="https://www.instagram.com/midi.lt/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Check out MIDI on Instagram!
                </a>
              </div>,
            ]}
          />
        )}
      </div>
    </CRTDisplay>
  );
};

export default GraphicalInterface;
