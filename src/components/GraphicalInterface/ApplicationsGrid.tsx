import ApplicationIcon from '@/components/GraphicalInterface/ApplicationIcon.tsx';
import ApplicationWindow from '@/components/GraphicalInterface/ApplicationWindow.tsx';

import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';
import {
  openApplication,
  selectOpenApplications,
} from '@/app/ApplicationsSlice.ts';
import applications from '@/components/GraphicalInterface/ApplicationList.tsx';
import ContextMenu from '@/components/GraphicalInterface/ContextMenu.tsx';
import {
  selectContextMenuData,
  selectContextMenuOpen,
} from '@/app/ContextMenuSlice.ts';

const ApplicationsGrid = () => {
  const dispatch = useAppDispatch();

  const openApplications = useAppSelector(selectOpenApplications);
  const contextMenuOpen = useAppSelector(selectContextMenuOpen);
  const contextMenuData = useAppSelector(selectContextMenuData);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 h-64">
      {applications
        .filter(app => !app.hidden)
        .map(app => (
          <ApplicationIcon
            key={app.data.title}
            iconPath={app.data.iconPath}
            title={app.data.title}
            focused={app.data.focused}
          />
        ))}

      {openApplications.map(app => {
        return (
          <ApplicationWindow
            key={app.title}
            content={
              applications.find(curr => curr.data.title === app.title)
                ?.windowContent
            }
            title={app.title}
          />
        );
      })}
      {contextMenuOpen && contextMenuData.owner === 'applicationIcon' && (
        <ContextMenu
          content={[
            <div
              key="open"
              onClick={() => {
                const app = applications.find(
                  app => app.data.title === contextMenuData.title,
                );

                if (!app) return;
                dispatch(openApplication(app.data));
              }}
            >
              Open {contextMenuData.title}
            </div>,
          ]}
        />
      )}
    </div>
  );
};

export default ApplicationsGrid;
