import React from 'react';
import ApplicationWindowMobile from './ApplicationWindowMobile';
import ApplicationMobile from './ApplicationMobile';

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
          <ApplicationMobile
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
        <ApplicationWindowMobile
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
