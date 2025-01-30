import React, { ReactNode, useEffect, useRef } from 'react';
import {
  closeApplication,
  minimizeApplication,
  selectOpenApplications,
  setFocusedApplication,
} from '@/app/ApplicationsSlice.ts';
import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';

interface ApplicationWindowProps {
  content: ReactNode;
  title: string;
}

const ApplicationWindow: React.FC<ApplicationWindowProps> = ({
  content,
  title,
}) => {
  const dispatch = useAppDispatch();
  const application = useAppSelector(selectOpenApplications).find(
    app => app.title === title,
  );
  const zIndex = application?.zIndex;

  const noWhiteSpaceTitle = title.replace(/\s+/g, '_');
  const windowRef = useRef<HTMLDivElement>(null);
  const applicationWindow = document.querySelector('#graphical-interface');

  useEffect(() => {
    const windowElement = windowRef.current;
    if (!windowElement) return;

    let isDragging = false;
    let isResizing = false;
    let startX = 0;
    let startY = 0;
    let startTop = 0;
    let startLeft = 0;
    let startWidth = 0;
    let startHeight = 0;

    const topBar = windowElement.querySelector(
      `#top-bar-${noWhiteSpaceTitle}`,
    ) as HTMLElement;
    if (topBar) {
      topBar.addEventListener('mousedown', (e: MouseEvent) => {
        if ((e.target as HTMLElement).tagName === 'BUTTON') return;

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        startLeft = windowElement.offsetLeft;
        startTop = windowElement.offsetTop;

        const handleDragMove = (e: MouseEvent) => {
          if (!isDragging) return;
          if (!applicationWindow) return;

          const deltaX = e.clientX - startX;
          const deltaY = e.clientY - startY;

          const newLeft = Math.max(
            0,
            Math.min(
              applicationWindow.clientWidth - windowElement.offsetWidth,
              startLeft + deltaX,
            ),
          );

          const newTop = Math.max(
            0,
            Math.min(
              applicationWindow.clientHeight - windowElement.offsetHeight,
              startTop + deltaY,
            ),
          );

          windowElement.style.left = `${newLeft}px`;
          windowElement.style.top = `${newTop}px`;
        };

        const handleDragEnd = () => {
          isDragging = false;
          document.removeEventListener('mousemove', handleDragMove);
          document.removeEventListener('mouseup', handleDragEnd);
        };

        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
      });
    }

    const resizeHandlers: { [key: string]: (e: MouseEvent) => void } = {
      se: (e: MouseEvent) => {
        if (!applicationWindow) return;
        if (!isResizing) return;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        if (
          windowElement.offsetLeft + startWidth + deltaX <=
          applicationWindow.clientWidth
        )
          windowElement.style.width = `${Math.max(200, startWidth + deltaX)}px`;
        if (
          windowElement.offsetTop + startHeight + deltaY <=
          applicationWindow.clientHeight
        )
          windowElement.style.height = `${Math.max(200, startHeight + deltaY)}px`;
      },
      sw: (e: MouseEvent) => {
        if (!applicationWindow) return;
        if (!isResizing) return;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        const newWidth = Math.max(200, startWidth - deltaX);
        if (startLeft + startWidth - newWidth >= 0) {
          windowElement.style.width = `${newWidth}px`;
          windowElement.style.left = `${startLeft + startWidth - newWidth}px`;
        }
        if (
          windowElement.offsetTop + startHeight + deltaY <=
          applicationWindow.clientHeight
        )
          windowElement.style.height = `${Math.max(200, startHeight + deltaY)}px`;
      },
      ne: (e: MouseEvent) => {
        if (!applicationWindow) return;
        if (!isResizing) return;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        const newHeight = Math.max(200, startHeight - deltaY);

        if (
          windowElement.offsetLeft + startWidth + deltaX <=
          applicationWindow.clientWidth
        )
          windowElement.style.width = `${Math.max(200, startWidth + deltaX)}px`;
        if (startTop + startHeight - newHeight >= 0) {
          windowElement.style.height = `${newHeight}px`;
          windowElement.style.top = `${startTop + startHeight - newHeight}px`;
        }
      },
      nw: (e: MouseEvent) => {
        if (!applicationWindow) return;
        if (!isResizing) return;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        const newWidth = Math.max(200, startWidth - deltaX);
        const newHeight = Math.max(200, startHeight - deltaY);
        if (startLeft + startWidth - newWidth >= 0) {
          windowElement.style.width = `${newWidth}px`;
          windowElement.style.left = `${startLeft + startWidth - newWidth}px`;
        }
        if (startTop + startHeight - newHeight >= 0) {
          windowElement.style.height = `${newHeight}px`;
          windowElement.style.top = `${startTop + startHeight - newHeight}px`;
        }
      },
    };

    const handleResizeStart = (corner: string) => (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = windowElement.offsetWidth;
      startHeight = windowElement.offsetHeight;
      startLeft = windowElement.offsetLeft;
      startTop = windowElement.offsetTop;

      const handleResizeMove = resizeHandlers[corner];

      const handleResizeEnd = () => {
        isResizing = false;
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
      };

      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
    };

    const corners = ['se', 'sw', 'ne', 'nw'];
    const resizeListeners = new Map();

    corners.forEach(corner => {
      const element = windowElement.querySelector(
        `.resizer-${corner}`,
      ) as HTMLElement;
      if (element) {
        const listener = handleResizeStart(corner);
        resizeListeners.set(corner, listener);
        element.addEventListener('mousedown', listener);
      }
    });

    return () => {
      corners.forEach(corner => {
        const element = windowElement.querySelector(
          `.resizer-${corner}`,
        ) as HTMLElement;
        const listener = resizeListeners.get(corner);
        if (element && listener) {
          element.removeEventListener('mousedown', listener);
        }
      });
    };
  }, [noWhiteSpaceTitle]);

  return (
    <div
      id={`application-${noWhiteSpaceTitle}`}
      ref={windowRef}
      className={`absolute ${
        application?.minimized ? 'hidden' : 'block'
      } bg-gray-600 rounded border border-gray-400 pointer-events-auto`}
      style={{
        zIndex: zIndex,
        width: '80%',
        height: '80%',
        top: '10%',
        left: '10%',
      }}
      onMouseDown={e => {
        e.stopPropagation();
        dispatch(setFocusedApplication(title));
      }}
    >
      <div
        id={`top-bar-${noWhiteSpaceTitle}`}
        className="h-10 bg-gray-700 rounded-t flex justify-between items-center cursor-move select-none"
      >
        <p className="flex-grow text-center">{title}</p>
        <div className="flex">
          <button
            className="w-8 h-8 bg-blue-500 text-white mr-1 rounded font-bold"
            onClick={() => dispatch(minimizeApplication(title))}
          >
            —
          </button>
          <button
            className="w-8 h-8 bg-red-500 text-white mr-1 rounded font-bold"
            onClick={() => dispatch(closeApplication(title))}
          >
            X
          </button>
        </div>
      </div>
      <div className="w-full h-[calc(100%-2.5rem)] overflow-auto">
        {content}
      </div>
      <div className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize resizer resizer-nw z-50"></div>
      <div className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize resizer resizer-ne z-50"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize resizer resizer-sw z-50"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize resizer resizer-se z-50"></div>
    </div>
  );
};

export default ApplicationWindow;
