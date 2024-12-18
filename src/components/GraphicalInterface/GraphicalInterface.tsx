import React, { useEffect } from 'react';
import CRTDisplay from '@/components/CTRDisplay/CTRDisplay';
import ApplicationIcon from '@/components/GraphicalInterface/ApplicationIcon.tsx';
import ApplicationWindow from '@/components/GraphicalInterface/ApplicationWindow';
import CountdownComponent from '../CountdownComponent/CountdownComponent';
import DatePicker from '../EventsPage/DatePicker';

import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';
import {
  openApplication,
  selectOpenApplications,
  setEventDate,
} from '@/app/ApplicationsSlice.ts';
import applications from '@/components/GraphicalInterface/ApplicationList.tsx';

import calendarIcon from '@/images/calendar.png';
import { DEFAULT_Z_INDEX } from '@/components/GraphicalInterface/consts.ts';
import { closeContextMenu } from '@/app/ContextMenuSlice.ts';
import Taskbar from '@/components/GraphicalInterface/Taskbar.tsx';

const GraphicalInterface: React.FC = () => {
  const dispatch = useAppDispatch();
  const openApplications = useAppSelector(selectOpenApplications);

  useEffect(() => {
    const handleClick = () => dispatch(closeContextMenu());
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  });

  return (
    <CRTDisplay
      initialPowerState={true}
      onPowerChange={isOn => console.log('Power state:', isOn)}
    >
      <div
        id="graphical-interface"
        className="flex flex-col justify-between content-center h-full"
      >
        {/* Desktop*/}
        <div className="flex justify-between m-4">
          {/* Applications */}
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
          {/* Widgets */}
          <div className="flex flex-col space-y-4 items-end">
            <div>
              <CountdownComponent />
            </div>
            <div>
              <DatePicker
                onDatePicked={date => {
                  dispatch(setEventDate(date.toISOString().split('T')[0]));

                  dispatch(
                    openApplication({
                      minimized: false,
                      title: 'Calendar',
                      iconPath: calendarIcon,
                      zIndex: DEFAULT_Z_INDEX,
                    }),
                  );
                }}
              />
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <Taskbar />
      </div>
    </CRTDisplay>
  );
};

export default GraphicalInterface;
