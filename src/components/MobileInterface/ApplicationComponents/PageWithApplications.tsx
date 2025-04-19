import React, { ReactNode } from 'react';
import ApplicationWindowMobile from './ApplicationWindowMobile';
import ApplicationMobile from './ApplicationMobile';
import CountdownComponent from '@/components/CountdownComponent/CountdownComponent.tsx';

interface ApplicationType {
  iconPath: string;
  appText: string;
  windowContent?: ReactNode;
  href?: string;
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
    <div className="text-center text-black text-base w-full h-full overflow-hidden translate-y-[3vh] landscape:translate-y-[6vh]">
      <div className="flex flex-col justify-between h-full">
        <div className="grid grid-cols-4">
          {applications.map((app, index) => (
            <div key={index}>
              <ApplicationMobile
                iconPath={app.iconPath}
                windowContent={app.windowContent}
                href={app.href}
                onClick={() => {
                  if (app.windowContent) {
                    setShowWindow(true);
                    setWindowContent(app.windowContent);
                  }
                }}
              />
              <p className="text-center break-words max-w-18 mt-2">
                {app.appText}
              </p>
            </div>
          ))}
        </div>
        <div className="mb-2 flex justify-center -translate-y-[3vh]">
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
