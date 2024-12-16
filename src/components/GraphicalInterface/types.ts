import { ReactNode } from 'react';

export interface ApplicationData {
  minimized: boolean;
  title: string;
  zIndex: number;
  iconPath: string;
}

export interface Application {
  data: ApplicationData;
  windowContent: ReactNode;
}
