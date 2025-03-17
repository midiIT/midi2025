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
    <CRTDisplay>
      <div className="flex flex-col">
        <div
          id="graphical-interface"
          className="flex flex-col content-center justify-between min-h-[91vh]"
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
                    Sekti MIDI Facebook!
                  </a>
                </div>,
                <div key="ig">
                  <a
                    href="https://www.instagram.com/midi.lt/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sekti MIDI Instagram!
                  </a>
                </div>,
              ]}
            />
          )}
        </div>
        <div className="flex justify-center mb-4">
          <div>
            <div className="text-3xl text-white text-center mb-4">
              Organizatoriai
            </div>
            <div className="flex items-center">
              <div className="w-[12rem]">
                <a href="https://midi.lt">
                  <img src="images/MIDI_logo.webp" alt="MIDI logo" />
                </a>
              </div>
              <div className="w-[10rem]">
                <a href="https://mif.vusa.lt/lt">
                  <img src="images/VUSAMIF_logo.webp" alt="VUSA MIF logo" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CRTDisplay>
  );
};

export default GraphicalInterface;
