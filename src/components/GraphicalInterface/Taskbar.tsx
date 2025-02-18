import { useState, useEffect } from 'react';
import TaskbarIcon from '@/components/GraphicalInterface/TaskbarIcon.tsx';
import ContextMenu from '@/components/GraphicalInterface/ContextMenu.tsx';
import {
  closeApplication,
  minimizeApplication,
  selectApplication,
  selectOpenApplications,
} from '@/app/ApplicationsSlice.ts';
import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';
import {
  selectContextMenuData,
  selectContextMenuOpen,
} from '@/app/ContextMenuSlice.ts';

const Taskbar = () => {
  const dispatch = useAppDispatch();
  const openApplications = useAppSelector(selectOpenApplications);
  const contextMenuOpen = useAppSelector(selectContextMenuOpen);
  const contextMenuData = useAppSelector(selectContextMenuData);
  const contextMenuApplication = useAppSelector(
    selectApplication(contextMenuData.title),
  );

  const [currentTime, setCurrentTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [isStartMenuOpen, setStartMenuOpen] = useState(false);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('lt-LT', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const formattedDate = currentTime.toLocaleDateString('lt-LT', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Close Start Menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('#start-menu')) {
        setStartMenuOpen(false);
      }
    };

    if (isStartMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isStartMenuOpen]);

  return (
    <div className="z-[500] relative">
      <div
        className="flex h-14 bg-[#27364a] w-[95%] mb-4 mx-auto rounded shadow-2xl items-center px-4"
        onContextMenu={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {/* Windows Start Button */}
        <button
          className="w-12 h-12 flex items-center justify-center rounded hover:bg-white/10"
          onClick={e => {
            e.stopPropagation();
            setStartMenuOpen(prev => !prev);
          }}
        >
          <img src="images/window.svg" className="w-8 h-8" />
        </button>

        {/* Application Icons */}
        {openApplications.map(app => (
          <TaskbarIcon key={app.title} icon={app.iconPath} title={app.title} />
        ))}

        {/* Clock - Shows Date on Hover */}
        <div
          className="ml-auto relative text-white text-3xl px-4 cursor-pointer"
          onMouseEnter={() => setShowDate(true)}
          onMouseLeave={() => setShowDate(false)}
        >
          {showDate && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#1e293b] text-white text-base px-4 py-2 min-w-[180px] rounded shadow-lg text-center">
              {formattedDate}
            </div>
          )}
          {formattedTime}
        </div>
      </div>

      {/* Start Menu */}
      {isStartMenuOpen && (
        <div
          id="start-menu"
          className="absolute bottom-16 left-2 bg-[#1e293b] text-white w-64 p-4 rounded-lg shadow-lg"
        >
          <h3 className="text-lg font-bold">Start Menu</h3>
          <ul className="mt-2 space-y-2">
            <li className="hover:bg-white/10 p-2 rounded cursor-pointer">
              🗂 File Explorer
            </li>
            <li className="hover:bg-white/10 p-2 rounded cursor-pointer">
              ⚙ Settings
            </li>
            <li className="hover:bg-white/10 p-2 rounded cursor-pointer">
              🔄 Restart
            </li>
            <li className="hover:bg-red-600 p-2 rounded cursor-pointer">
              ⏻ Shut Down
            </li>
          </ul>
        </div>
      )}

      {/* Context Menu for Taskbar Icons */}
      {contextMenuOpen && contextMenuData.owner == 'taskbarIcon' && (
        <ContextMenu
          content={[
            <div
              key="minimize"
              onClick={() =>
                dispatch(minimizeApplication(contextMenuData.title))
              }
            >
              {contextMenuApplication?.minimized ? 'Atidaryti' : 'Sumažinti'}{' '}
              {contextMenuData.title}
            </div>,
            <div
              key="close"
              onClick={() => dispatch(closeApplication(contextMenuData.title))}
            >
              Uždaryti {contextMenuData.title}
            </div>,
          ]}
        />
      )}
    </div>
  );
};

export default Taskbar;
