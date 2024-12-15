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
      state.openApplications = [...state.openApplications, action.payload];
    },
    closeApplication: (state, action: PayloadAction<string>) => {
      state.openApplications = state.openApplications.filter(
        app => app.title !== action.payload,
      );
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

export const { openApplication, closeApplication, setFocusedApplication } =
  applicationsSlice.actions;

export const selectOpenApplications = (state: RootState) =>
  state.applications.openApplications;

export default applicationsSlice.reducer;
