import { ApplicationData } from '@/components/GraphicalInterface/types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/Store.ts';

interface ApplicationsState {
  openApplications: ApplicationData[];
}

const initialState: ApplicationsState = {
  openApplications: [],
};

export const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    openApplication: (state, action: PayloadAction<ApplicationData>) => {
      const index = state.openApplications.findIndex(
        app => app.title === action.payload.title,
      );

      // Open the application from taskbar if it's already open and minimized
      if (index === -1) {
        state.openApplications = [...state.openApplications, action.payload];
      } else {
        state.openApplications[index].minimized = false;
      }
    },
    closeApplication: (state, action: PayloadAction<string>) => {
      state.openApplications = state.openApplications.filter(
        app => app.title !== action.payload,
      );
    },
    minimizeApplication: (state, action: PayloadAction<string>) => {
      const index = state.openApplications.findIndex(
        app => app.title === action.payload,
      );
      state.openApplications[index].minimized =
        !state.openApplications[index].minimized;
    },
    setFocusedApplication: (state, action: PayloadAction<string>) => {
      state.openApplications = state.openApplications.map(app => {
        return { ...app, zIndex: app.zIndex - 1 };
      });

      const index = state.openApplications.findIndex(
        app => app.title === action.payload,
      );

      state.openApplications[index].zIndex = 30;
    },
  },
});

export const {
  openApplication,
  closeApplication,
  minimizeApplication,
  setFocusedApplication,
} = applicationsSlice.actions;

export const selectOpenApplications = (state: RootState) =>
  state.applications.openApplications;
export const selectApplication = (title: string) => (state: RootState) =>
  state.applications.openApplications.find(app => app.title === title);

export default applicationsSlice.reducer;
