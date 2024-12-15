import React, { ReactNode, useState } from 'react';
import CRTDisplay from '@/components/CTRDisplay/CTRDisplay';
import ApplicationIcon from '@/components/GraphicalInterface/ApplicationIcon.tsx';
import ApplicationWindow from '@/components/GraphicalInterface/ApplicationWindow';
import CountdownComponent from '../CountdownComponent/CountdownComponent';
import DatePicker from '../EventsPage/DatePicker';
// import EventDisplay from '../EventsPage/EventDisplay';

import RandomTerminalPng from '@/images/random_terminal.png';
import RandomSomethingElsePng from '@/images/random_cat.jpeg';

const TempTerminal: React.FC = () => {
  return <p>Insert terminal as import later!!!</p>;
};
const TempSomethingElse: React.FC = () => {
  return <p>Insert something else here!</p>;
};

interface ApplicationData {
  minimized: boolean;
  windowContent: ReactNode;
  title: string;
}

const GraphicalInterface: React.FC = () => {
  const [openApplications, setOpenApplications] = useState<ApplicationData[]>(
    [],
  );

  function openApplication(title: string, application: ReactNode) {
    setOpenApplications(prevApplications => {
      if (!prevApplications.some(app => app.title == title)) {
        return [
          ...prevApplications,
          {
            title,
            minimized: false,
            windowContent: application,
          },
        ];
      } else {
        return prevApplications;
      }
    });
  }

  return (
    <CRTDisplay
      initialPowerState={true}
      onPowerChange={isOn => console.log('Power state:', isOn)}
    >
      <div className="flex justify-between">
        {/* Applications */}
        <div className="inline-grid grid-cols-2 gap-4">
          <ApplicationIcon
            iconPath={RandomTerminalPng}
            appText="Terminal"
            onClick={() => {
              openApplication('Terminal', <TempTerminal />);
            }}
          />
          <ApplicationIcon
            iconPath={RandomSomethingElsePng}
            appText="Something Elseeeeeeeeeeeeeeeeeeeeeeeeeee"
            onClick={() => {
              openApplication('Sth1', <TempSomethingElse />);
            }}
          />
          <ApplicationIcon
            iconPath={RandomSomethingElsePng}
            appText="Something Elseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
            onClick={() => {
              openApplication('Sth2', <TempSomethingElse />);
            }}
          />

          {openApplications.map(app => {
            return (
              <ApplicationWindow
                key={app.title}
                content={app.windowContent}
                onExit={() => {
                  setOpenApplications(prevApplications => {
                    return prevApplications.filter(
                      currentApp => currentApp.title !== app.title,
                    );
                  });
                }}
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
