import { configureStore } from '@reduxjs/toolkit';
import applicationsSliceReducer from '@/app/ApplicationsSlice.ts';
import contextMenuReducer from '@/app/ContextMenuSlice.ts';
import displayReducer from '@/app/DisplaySlice.ts';

const store = configureStore({
  reducer: {
    applications: applicationsSliceReducer,
    contextMenu: contextMenuReducer,
    display: displayReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
