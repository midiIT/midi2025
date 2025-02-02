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
    <div className="z-[500]">
      <div
        className="flex h-14 bg-[#27364a] w-[95%] mb-4 mx-auto rounded shadow-2xl"
        onContextMenu={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {openApplications.map(app => (
          <TaskbarIcon key={app.title} icon={app.iconPath} title={app.title} />
        ))}
      </div>
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
