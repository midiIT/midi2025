import { ReactNode } from 'react';

/**
 * @minimized whether the application should be shown or minimized
 * @title application title
 * @zIndex application zIndex, used for correct stacking of applications
 * @iconPath application icon path
 */
export interface ApplicationData {
  minimized: boolean;
  title: string;
  zIndex: number;
  iconPath: string;
}

/**
 * @data data for the application
 * @windowContent what to show when application is open
 * @hidden whether the application icon should be on the desktop
 */
export interface Application {
  data: ApplicationData;
  windowContent: ReactNode;
  hidden: boolean;
}
