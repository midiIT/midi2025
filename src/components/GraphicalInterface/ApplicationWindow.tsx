import React, { ReactNode, useEffect } from 'react';
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
  const isFocused = application?.focused;

  const noWhiteSpaceTitle = title.replace(' ', '_');

  function dragElement(el: HTMLElement | null) {
    if (!el) return;

    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    const topBar: HTMLElement | null = document.querySelector(
      `#top-bar-${noWhiteSpaceTitle}`,
    );
    if (topBar) {
      topBar.onmousedown = dragMouseDown(el);
    }

    function dragMouseDown(el: HTMLElement) {
      return (e: MouseEvent) => {
        e.preventDefault();

        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;

        document.onmousemove = elementDrag(el);
      };
    }

    function elementDrag(el: HTMLElement) {
      return (e: MouseEvent) => {
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        el.style.top = el.offsetTop - pos2 + 'px';
        el.style.left = el.offsetLeft - pos1 + 'px';
      };
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  useEffect(() => {
    dragElement(document.querySelector(`#application-${noWhiteSpaceTitle}`));
  }, [noWhiteSpaceTitle]);

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
      className={`absolute ${application?.minimized ? 'hidden' : 'flex flex-col'}
        bg-gray-700 rounded w-[80%] h-[80%] max-w-full max-h-full overflow-hidden`}
      style={{ zIndex: zIndex }}
      onMouseDown={() => dispatch(setFocusedApplication(title))}
      onContextMenu={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div
        id={`top-bar-${noWhiteSpaceTitle}`}
        className="h-10 bg-gray-800 rounded-t flex justify-between items-center flex-shrink-0"
      >
        <div className="w-8"></div>
        <p>{title}</p>
        {/* Buttons */}
        <div>
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
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {React.cloneElement(content as React.ReactElement, {
          windowTitle: noWhiteSpaceTitle,
          isFocused: isFocused,
        })}
      </div>
    </div>
  );
};
export default ApplicationWindow;
