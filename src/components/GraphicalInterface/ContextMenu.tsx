import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectContextMenuData } from '@/app/ContextMenuSlice';
import {
  closeApplication,
  minimizeApplication,
  selectApplication,
} from '@/app/ApplicationsSlice';
import { useEffect, useState } from 'react';

const ContextMenu = () => {
  const dispatch = useAppDispatch();
  const contextMenuData = useAppSelector(selectContextMenuData);
  const application = useAppSelector(selectApplication(contextMenuData.title));
  const [yPos, setYPos] = useState<number | undefined>(undefined);

  useEffect(() => {
    const ctrDisplayHeight = (
      document.querySelector('#ctr-display') as HTMLElement | undefined
    )?.offsetHeight;

    const displayHeight = (
      document.querySelector('#graphical-interface') as HTMLElement | undefined
    )?.offsetHeight;

    const offset = (
      document.querySelector('#taskbar-context-menu') as
        | HTMLDivElement
        | undefined
    )?.offsetHeight;

    if (!displayHeight || !offset || !ctrDisplayHeight) return;

    const displayDifference = (ctrDisplayHeight - displayHeight) / 2;

    if (contextMenuData.y - displayDifference + offset > displayHeight) {
      setYPos(contextMenuData.y - offset);
    } else {
      setYPos(contextMenuData.y);
    }
  }, [contextMenuData.y]);

  return (
    <div
      id="taskbar-context-menu"
      className="fixed bg-slate-700 rounded shadow-2xl divide-y divide-slate-600 overflow-hidden max-w-64"
      style={{
        visibility: `${yPos ? 'visible' : 'hidden'}`,
        top: yPos ?? 0,
        left: contextMenuData.x,
      }}
    >
      <div
        className="px-4 py-2 text-gray-300 hover:bg-slate-600 cursor-pointer text-sm"
        onClick={() => dispatch(minimizeApplication(contextMenuData.title))}
      >
        {application?.minimized ? 'Open' : 'Minimize'} {contextMenuData.title}
      </div>
      <div
        className="px-4 py-2 text-gray-300 hover:bg-slate-600 cursor-pointer text-sm"
        onClick={() => dispatch(closeApplication(contextMenuData.title))}
      >
        Close {contextMenuData.title}
      </div>
    </div>
  );
};

export default ContextMenu;
