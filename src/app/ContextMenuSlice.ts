import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/Store.ts';

interface ContextMenuSlice {
  open: boolean;
  x: number;
  y: number;
  title: string;
  owner: string;
}

const initialState: ContextMenuSlice = {
  open: false,
  x: 0,
  y: 0,
  title: '',
  owner: '',
};

export const contextMenuSlice = createSlice({
  name: 'contextMenu',
  initialState,
  reducers: {
    openContextMenu: (
      state,
      action: PayloadAction<{
        x: number;
        y: number;
        title: string;
        owner: string;
      }>,
    ) => {
      state.open = true;
      state.x = action.payload.x;
      state.y = action.payload.y;
      state.title = action.payload.title;
      state.owner = action.payload.owner;
    },
    closeContextMenu: state => {
      state.open = false;
    },
  },
});

export const { openContextMenu, closeContextMenu } = contextMenuSlice.actions;

export const selectContextMenuOpen = (state: RootState) =>
  state.contextMenu.open;

const selectX = (state: RootState) => state.contextMenu.x;
const selectY = (state: RootState) => state.contextMenu.y;
const selectTitle = (state: RootState) => state.contextMenu.title;
const selectOwner = (state: RootState) => state.contextMenu.owner;

export const selectContextMenuData = createSelector(
  [selectX, selectY, selectTitle, selectOwner],
  (x, y, title, owner) => ({
    x,
    y,
    title,
    owner,
  }),
);

export default contextMenuSlice.reducer;
