import React, { ReactNode, useEffect } from 'react';

interface ApplicationWindowProps {
  content: ReactNode;
  onExit: () => void;
}
const ApplicationWindow: React.FC<ApplicationWindowProps> = ({
  content,
  onExit,
}) => {
  function dragElement(el: HTMLElement | null) {
    if (!el) return;

    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    const topBar: HTMLElement | null = document.querySelector('#top-bar');
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
    dragElement(document.querySelector('#application'));
  }, []);

  return (
    <div
      id="application"
      className="absolute bg-gray-600 rounded z-10 w-[500px] h-[400px]"
    >
      <div
        id="top-bar"
        className="h-10 bg-gray-700 rounded-t flex justify-end items-center"
      >
        <button
          className="w-8 h-8 bg-red-500 text-white mr-1 rounded font-bold"
          onClick={onExit}
        >
          X
        </button>
      </div>
      {content}
    </div>
  );
};
export default ApplicationWindow;
