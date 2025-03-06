import { ReactNode } from 'react';

/**
 * @minimized whether the application should be shown or minimized
 * @title application title
 * @zIndex application zIndex, used for correct stacking of applications
 * @iconPath application icon path
 * @focused whether cursor should be focused on the application or no
 */
export interface ApplicationData {
  minimized?: boolean;
  title: string;
  zIndex?: number;
  iconPath: string;
  focused?: boolean;
}

/**
 * @data data for the application
 * @windowContent what to show when application is open
 * @hidden whether the application icon should be on the desktop
 * @href link to where the application takes you, only used if window content is undefined
 */
export interface Application {
  data: ApplicationData;
  windowContent?: ReactNode;
  hidden: boolean;
  href?: string;
}
