import React from 'react';
import ApplicationWindowMobile from './ApplicationWindowMobile';
import ApplicationMobile from './ApplicationMobile';
import CountdownComponent from '@/components/CountdownComponent/CountdownComponent.tsx';

interface ApplicationType {
  iconPath: string;
  appText: string;
  windowContent: React.FC;
}

interface PageWithApplicationsProps {
  applications: ApplicationType[];
  showWindow: boolean;
  setShowWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageWithApplications: React.FC<PageWithApplicationsProps> = ({
  applications,
  showWindow,
  setShowWindow,
}) => {
  const [windowContent, setWindowContent] =
    React.useState<React.ReactNode>(null);

  return (
    <div className="text-center text-black text-base w-full h-full overflow-hidden landscape:translate-y-[6vh]">
      <div className="flex flex-col justify-between h-full">
        <div className="grid grid-cols-4 gap-4 translate-y-[3vh]">
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
        <div className="mb-2 flex justify-center">
          <CountdownComponent />
        </div>
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
