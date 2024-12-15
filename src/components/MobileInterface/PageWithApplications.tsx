import React from 'react';
import Application from '../GraphicalInterface/Application';
import ApplicationWindow from '../GraphicalInterface/ApplicationWindow';

interface ApplicationType {
  iconPath: string;
  appText: string;
  windowContent: React.FC;
}

interface PageWithApplicationsProps {
  title: string;
  applications: ApplicationType[];
  showWindow: boolean;
  setShowWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageWithApplications: React.FC<PageWithApplicationsProps> = ({
  title,
  applications,
  showWindow,
  setShowWindow,
}) => {
  const [windowContent, setWindowContent] =
    React.useState<React.ReactNode>(null);

  return (
    <div className="text-center text-blue-300 text-base w-full h-full overflow-hidden translate-y-[3vh] landscape:translate-y-[3vw]">
      <p>{title}</p>
      <div className="grid grid-cols-4 gap-4">
        {applications.map((app, index) => (
          <Application
            key={index}
            iconPath={app.iconPath}
            appText={app.appText}
            windowContent={app.windowContent}
            onClick={() => {
              setShowWindow(true);
              setWindowContent(React.createElement(app.windowContent));
            }}
          />
        ))}
      </div>
      {showWindow && (
        <ApplicationWindow
          content={windowContent}
          onExit={() => {
            setShowWindow(false);
          }}
        />
      )}
    </div>
  );
};

export default PageWithApplications;
