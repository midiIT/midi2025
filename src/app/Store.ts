import { configureStore } from '@reduxjs/toolkit';
import applicationsSliceReducer from '@/app/ApplicationsSlice.ts';

const store = configureStore({
  reducer: {
    applications: applicationsSliceReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
