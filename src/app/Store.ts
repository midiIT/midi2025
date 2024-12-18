import { configureStore } from '@reduxjs/toolkit';
import applicationsSliceReducer from '@/app/ApplicationsSlice.ts';
import contextMenuReducer from '@/app/ContextMenuSlice.ts';

const store = configureStore({
  reducer: {
    applications: applicationsSliceReducer,
    contextMenu: contextMenuReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
