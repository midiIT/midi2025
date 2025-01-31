import { useAppSelector } from '@/app/hooks';
import { selectContextMenuData } from '@/app/ContextMenuSlice';
import {
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';

interface Props {
  content: ReactNode[];
}

const ContextMenu = ({ content }: Props) => {
  const contextMenuData = useAppSelector(selectContextMenuData);
  const [yPos, setYPos] = useState<number | undefined>(undefined);

  useEffect(() => {
    const ctrDisplayHeight = (
      document.querySelector('#ctr-display') as HTMLElement | undefined
    )?.offsetHeight;

    const displayHeight = (
      document.querySelector('#graphical-interface') as HTMLElement | undefined
    )?.offsetHeight;

    const offset = (
      document.querySelector('#context-menu') as HTMLDivElement | undefined
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
      id="context-menu"
      className="fixed bg-slate-700 rounded shadow-2xl divide-y divide-slate-600 overflow-hidden max-w-80 z-[500]"
      style={{
        visibility: `${yPos ? 'visible' : 'hidden'}`,
        top: yPos ?? 0,
        left: contextMenuData.x,
      }}
    >
      {content.map(child => {
        if (!isValidElement(child)) return child;

        return cloneElement(child as ReactElement, {
          className:
            'px-4 py-2 text-gray-300 hover:bg-slate-600 cursor-pointer text-sm',
          key: child.key,
        });
      })}
    </div>
  );
};

export default ContextMenu;
