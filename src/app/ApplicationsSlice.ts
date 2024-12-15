import { ApplicationData } from '@/components/GraphicalInterface/types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/Store.ts';

interface ApplicationsState {
  openApplications: ApplicationData[];
  focusedApplicationTitle: string;
}

const initialState: ApplicationsState = {
  openApplications: [],
  focusedApplicationTitle: '',
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
  },
});

export const { openApplication, closeApplication } = applicationsSlice.actions;

export const selectOpenApplications = (state: RootState) =>
  state.applications.openApplications;

export default applicationsSlice.reducer;
