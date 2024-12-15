import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeApplication } from '@/app/ApplicationsSlice.ts';

interface ApplicationWindowProps {
  content: ReactNode;
  title: string;
}
const ApplicationWindow: React.FC<ApplicationWindowProps> = ({
  content,
  title,
}) => {
  const dispatch = useDispatch();

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

        console.log('down');

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

  return (
    <div
      id={`application-${noWhiteSpaceTitle}`}
      className="absolute bg-gray-600 rounded z-10 w-[500px] h-[400px]"
    >
      <div
        id={`top-bar-${noWhiteSpaceTitle}`}
        className="h-10 bg-gray-700 rounded-t flex justify-between items-center"
      >
        <div className="w-8"></div>
        <p>{title}</p>
        <button
          className="w-8 h-8 bg-red-500 text-white mr-1 rounded font-bold"
          onClick={() => dispatch(closeApplication(title))}
        >
          X
        </button>
      </div>
      {content}
    </div>
  );
};
export default ApplicationWindow;
