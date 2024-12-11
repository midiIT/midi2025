import React, { ReactNode, useState } from 'react';
import CRTDisplay from '@/components/CTRDisplay/CTRDisplay';
import Application from '@/components/GraphicalInterface/Application';
import ApplicationWindow from '@/components/GraphicalInterface/ApplicationWindow';
import CountdownComponent from '../CountdownComponent/CountdownComponent';
import DatePicker from '../EventsPage/DatePicker';
import EventDisplay from '../EventsPage/EventDisplay';
import TeamPage from '../TeamPage/TeamPage';

import RandomTerminalPng from '@/images/random_terminal.png';
import RandomSomethingElsePng from '@/images/random_cat.jpeg';
import TeamPageIcon from '@/images/TeamPageIcon.jpg';

const TempTerminal: React.FC = () => {
  return <p>Insert terminal as import later!!!</p>;
};
const TempSomethingElse: React.FC = () => {
  return <p>Insert something else here!</p>;
};

const GraphicalInterface: React.FC = () => {
  const [showWindow, setShowWindow] = useState<boolean>(false);
  const [windowContent, setWindowContent] = useState<ReactNode>(null);

  return (
    <CRTDisplay
      initialPowerState={true}
      onPowerChange={isOn => console.log('Power state:', isOn)}
    >
      <div className="absolute w-1/2 left-1/4">
        <CountdownComponent />
      </div>
      <div className="absolute w-1/2 left-1/2 top-1/2">
        <DatePicker
          onDatePicked={date => {
            setShowWindow(true);
            setWindowContent(
              <EventDisplay eventDate={date.toISOString().split('T')[0]} />,
            );
          }}
        />
      </div>
      <div className="inline-grid grid-cols-2 gap-4">
        <Application
          iconPath={RandomTerminalPng}
          appText="Terminal"
          windowContent={TempTerminal}
          onClick={() => {
            setShowWindow(true);
            setWindowContent(<TempTerminal />);
          }}
        />
        <div>
          <Application
            iconPath={TeamPageIcon}
            appText="Team Page"
            windowContent={TempSomethingElse}
            onClick={() => {
              setShowWindow(true);
              setWindowContent(<TeamPage />);
            }}
          />
        </div>
        <Application
          iconPath={RandomSomethingElsePng}
          appText="Something Elseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
          windowContent={TempSomethingElse}
          onClick={() => {
            setShowWindow(true);
            setWindowContent(<TempSomethingElse />);
          }}
        />
        {showWindow ? (
          <ApplicationWindow
            content={windowContent}
            onExit={() => {
              setShowWindow(false);
            }}
          />
        ) : null}
      </div>
    </CRTDisplay>
  );
};

export default GraphicalInterface;
