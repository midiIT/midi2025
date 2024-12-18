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

  return (
    <div>
      <div className="flex h-14 bg-[#27364a] w-[95%%] m-8 rounded shadow-2xl">
        {openApplications.map(app => (
          <TaskbarIcon key={app.title} icon={app.iconPath} title={app.title} />
        ))}
      </div>
      {contextMenuOpen && contextMenuData.owner == 'taskbarIcon' && (
        <ContextMenu
          content={[
            <div
              onClick={() =>
                dispatch(minimizeApplication(contextMenuData.title))
              }
            >
              {contextMenuApplication?.minimized ? 'Open' : 'Minimize'}{' '}
              {contextMenuData.title}
            </div>,
            <div
              onClick={() => dispatch(closeApplication(contextMenuData.title))}
            >
              Close {contextMenuData.title}
            </div>,
          ]}
        />
      )}
    </div>
  );
};

export default Taskbar;
