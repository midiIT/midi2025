import ApplicationIcon from '@/components/GraphicalInterface/ApplicationIcon.tsx';
import ApplicationWindow from '@/components/GraphicalInterface/ApplicationWindow.tsx';

import { useAppSelector } from '@/app/hooks.ts';
import { selectOpenApplications } from '@/app/ApplicationsSlice.ts';
import applications from '@/components/GraphicalInterface/ApplicationList.tsx';

const ApplicationsGrid = () => {
  const openApplications = useAppSelector(selectOpenApplications);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 h-64">
      {applications
        .filter(app => !app.hidden)
        .map(app => (
          <ApplicationIcon
            key={app.data.title}
            iconPath={app.data.iconPath}
            title={app.data.title}
            application={app.windowContent}
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
    </div>
  );
};

export default ApplicationsGrid;
