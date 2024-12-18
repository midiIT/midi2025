import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/Store.ts';

interface ContextMenuSlice {
  open: boolean;
  x: number;
  y: number;
  title: string;
}

const initialState: ContextMenuSlice = {
  open: false,
  x: 0,
  y: 0,
  title: '',
};

export const contextMenuSlice = createSlice({
  name: 'contextMenu',
  initialState,
  reducers: {
    openContextMenu: (
      state,
      action: PayloadAction<{ x: number; y: number; title: string }>,
    ) => {
      state.open = true;
      state.x = action.payload.x;
      state.y = action.payload.y;
      state.title = action.payload.title;
    },
    closeContextMenu: state => {
      state.open = false;
    },
  },
});

export const { openContextMenu, closeContextMenu } = contextMenuSlice.actions;

export const selectContextMenuOpen = (state: RootState) =>
  state.contextMenu.open;
export const selectContextMenuData = (state: RootState) => {
  return {
    x: state.contextMenu.x,
    y: state.contextMenu.y,
    title: state.contextMenu.title,
  };
};

export default contextMenuSlice.reducer;
