import React from 'react';
import CRTDisplay from '@/components/CTRDisplay/CTRDisplay';
import ApplicationIcon from '@/components/GraphicalInterface/ApplicationIcon.tsx';
import ApplicationWindow from '@/components/GraphicalInterface/ApplicationWindow';
import CountdownComponent from '../CountdownComponent/CountdownComponent';
import DatePicker from '../EventsPage/DatePicker';
// import EventDisplay from '../EventsPage/EventDisplay';

import { useAppSelector } from '@/app/hooks.ts';
import { selectOpenApplications } from '@/app/ApplicationsSlice.ts';
import applications from '@/components/GraphicalInterface/ApplicationList.tsx';
import TaskbarIcon from '@/components/GraphicalInterface/TaskbarIcon.tsx';

const GraphicalInterface: React.FC = () => {
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
            {applications.map(app => (
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
                  // setShowWindow(true);
                  // setWindowContent(
                  //   <EventDisplay eventDate={date.toISOString().split('T')[0]} />,
                  // );
                  console.log(date);
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
