import { ApplicationData } from '@/components/GraphicalInterface/types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/Store.ts';
import { DEFAULT_Z_INDEX } from '@/components/GraphicalInterface/consts.ts';

interface ApplicationsState {
  openApplications: ApplicationData[];
  eventDate: string;
  focused: boolean;
}

const initialState: ApplicationsState = {
  openApplications: [],
  eventDate: '',
  focused: false,
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

      state.openApplications = state.openApplications.map(app => {
        return { ...app, zIndex: app.zIndex - 1 };
      });

      state.openApplications[index].zIndex = DEFAULT_Z_INDEX;
    },
    setFocusedApplication: (state, action: PayloadAction<string>) => {
      state.openApplications = state.openApplications.map(app => {
        return { ...app, zIndex: app.zIndex - 1 };
      });

      const index = state.openApplications.findIndex(
        app => app.title === action.payload,
      );

      state.openApplications[index].zIndex = DEFAULT_Z_INDEX;
    },
    setEventDate: (state, action: PayloadAction<string>) => {
      state.eventDate = action.payload;
    },
  },
});

export const {
  openApplication,
  closeApplication,
  minimizeApplication,
  setFocusedApplication,
  setEventDate,
} = applicationsSlice.actions;

export const selectOpenApplications = (state: RootState) =>
  state.applications.openApplications;
export const selectApplication = (title: string) => (state: RootState) =>
  state.applications.openApplications.find(app => app.title === title);
export const selectEventDate = (state: RootState) =>
  state.applications.eventDate;

export default applicationsSlice.reducer;
