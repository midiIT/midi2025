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

const GraphicalInterface: React.FC = () => {
  const openApplications = useAppSelector(selectOpenApplications);

  return (
    <CRTDisplay
      initialPowerState={true}
      onPowerChange={isOn => console.log('Power state:', isOn)}
    >
      <div className="flex justify-between">
        {/* Applications */}
        <div className="inline-grid grid-cols-2 gap-4">
          {applications.map(app => (
            <ApplicationIcon
              key={app.data.title}
              iconPath={app.iconPath}
              title={app.data.title}
              application={app.windowContent}
            />
          ))}

          {openApplications.map(app => {
            return (
              <ApplicationWindow
                key={app.title}
                content={
                  applications.filter(curr => curr.data.title === app.title)[0]
                    .windowContent
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
    </CRTDisplay>
  );
};

export default GraphicalInterface;
