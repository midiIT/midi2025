import { ReactNode } from 'react';

export interface ApplicationData {
  minimized: boolean;
  title: string;
}

export interface Application {
  data: ApplicationData;
  iconPath: string;
  windowContent: ReactNode;
}
