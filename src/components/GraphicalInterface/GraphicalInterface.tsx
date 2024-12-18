import React from 'react';
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
import TaskbarIcon from '@/components/GraphicalInterface/TaskbarIcon.tsx';

import calendarIcon from '@/images/calendar.png';

const GraphicalInterface: React.FC = () => {
  const dispatch = useAppDispatch();
  const openApplications = useAppSelector(selectOpenApplications);

  return (
    <CRTDisplay
      initialPowerState={true}
      onPowerChange={isOn => console.log('Power state:', isOn)}
    >
      <div className="flex flex-col justify-between content-center h-full">
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

            {/* TODO: add ability to use right click on the desktop */}
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
                      zIndex: 300,
                    }),
                  );
                }}
              />
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="flex h-14 bg-[#27364a] w-[95%%] m-8 rounded shadow-2xl">
          {openApplications.map(app => (
            <TaskbarIcon
              key={app.title}
              icon={app.iconPath}
              title={app.title}
            />
          ))}
        </div>
      </div>
    </CRTDisplay>
  );
};

export default GraphicalInterface;
