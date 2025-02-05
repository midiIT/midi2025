import React, { ReactNode, useEffect, useRef } from 'react';
import {
  closeApplication,
  minimizeApplication,
  selectEventDate,
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
  const isFocused = application?.focused;
  const eventDate = useAppSelector(selectEventDate);

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
      // Corner handlers
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
      n: (e: MouseEvent) => {
        if (!applicationWindow) return;
        if (!isResizing) return;
        const deltaY = e.clientY - startY;
        const newHeight = Math.max(200, startHeight - deltaY);
        if (startTop + startHeight - newHeight >= 0) {
          windowElement.style.height = `${newHeight}px`;
          windowElement.style.top = `${startTop + startHeight - newHeight}px`;
        }
      },
      s: (e: MouseEvent) => {
        if (!applicationWindow) return;
        if (!isResizing) return;
        const deltaY = e.clientY - startY;
        if (
          windowElement.offsetTop + startHeight + deltaY <=
          applicationWindow.clientHeight
        )
          windowElement.style.height = `${Math.max(200, startHeight + deltaY)}px`;
      },
      e: (e: MouseEvent) => {
        if (!applicationWindow) return;
        if (!isResizing) return;
        const deltaX = e.clientX - startX;
        if (
          windowElement.offsetLeft + startWidth + deltaX <=
          applicationWindow.clientWidth
        )
          windowElement.style.width = `${Math.max(200, startWidth + deltaX)}px`;
      },
      w: (e: MouseEvent) => {
        if (!applicationWindow) return;
        if (!isResizing) return;
        const deltaX = e.clientX - startX;
        const newWidth = Math.max(200, startWidth - deltaX);
        if (startLeft + startWidth - newWidth >= 0) {
          windowElement.style.width = `${newWidth}px`;
          windowElement.style.left = `${startLeft + startWidth - newWidth}px`;
        }
      },
    };

    const handleResizeStart = (direction: string) => (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = windowElement.offsetWidth;
      startHeight = windowElement.offsetHeight;
      startLeft = windowElement.offsetLeft;
      startTop = windowElement.offsetTop;

      const handleResizeMove = resizeHandlers[direction];

      const handleResizeEnd = () => {
        isResizing = false;
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
      };

      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
    };

    const resizeDirections = ['n', 's', 'e', 'w', 'se', 'sw', 'ne', 'nw'];
    const resizeListeners = new Map();

    resizeDirections.forEach(direction => {
      const element = windowElement.querySelector(
        `.resizer-${direction}`,
      ) as HTMLElement;
      if (element) {
        const listener = handleResizeStart(direction);
        resizeListeners.set(direction, listener);
        element.addEventListener('mousedown', listener);
      }
    });

    return () => {
      resizeDirections.forEach(direction => {
        const element = windowElement.querySelector(
          `.resizer-${direction}`,
        ) as HTMLElement;
        const listener = resizeListeners.get(direction);
        if (element && listener) {
          element.removeEventListener('mousedown', listener);
        }
      });
    };
  }, [noWhiteSpaceTitle, applicationWindow]);

  useEffect(() => {
    if (isFocused) {
      const terminalElement = document.querySelector(
        `#terminal-input-${noWhiteSpaceTitle}`,
      );
      if (terminalElement instanceof HTMLElement) {
        terminalElement.focus();
      }
    }
  }, [isFocused, noWhiteSpaceTitle]);

  return (
    <div
      id={`application-${noWhiteSpaceTitle}`}
      ref={windowRef}
      className={`absolute ${
        application?.minimized ? 'hidden' : 'flex flex-col'
      } bg-gray-700 rounded border border-gray-400 pointer-events-auto max-w-full max-h-full overflow-hidden`}
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
      onContextMenu={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div
        id={`top-bar-${noWhiteSpaceTitle}`}
        className="h-6 bg-gray-800 rounded-t flex justify-between items-center cursor-move select-none flex-shrink-0"
      >
        <div className="w-8"></div>
        <p>{title === 'EventDisplay' ? eventDate : title}</p>
        <div className="flex hover:cursor-auto">
          <div
            className="w-5 h-5 bg-blue-500 text-white mr-1 rounded font-bold text-center"
            onClick={() => dispatch(minimizeApplication(title))}
          >
            <span className="relative -top-0.5 left-0">—</span>
          </div>
          <div
            className="w-5 h-5 bg-red-500 text-white mr-1 rounded font-bold text-center"
            onClick={() => dispatch(closeApplication(title))}
          >
            <span className="relative -top-0.5 left-0">X</span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {React.cloneElement(content as React.ReactElement, {
          windowTitle: noWhiteSpaceTitle,
          isFocused: isFocused,
        })}
      </div>
      <div className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize resizer resizer-nw z-51"></div>
      <div className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize resizer resizer-ne z-51"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize resizer resizer-sw z-51"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize resizer resizer-se z-51"></div>

      <div className="absolute top-0 left-4 right-4 h-2 cursor-n-resize resizer resizer-n z-50"></div>
      <div className="absolute bottom-0 left-4 right-4 h-2 cursor-s-resize resizer resizer-s z-50"></div>
      <div className="absolute left-0 top-4 bottom-4 w-2 cursor-w-resize resizer resizer-w z-50"></div>
      <div className="absolute right-0 top-4 bottom-4 w-2 cursor-e-resize resizer resizer-e z-50"></div>
    </div>
  );
};

export default ApplicationWindow;
