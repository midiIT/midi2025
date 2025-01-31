import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/Store.ts';

interface DisplaySlice {
  powerIsOn: boolean;
}

const initialState: DisplaySlice = {
  powerIsOn: true,
};

export const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    changePowerState: state => {
      state.powerIsOn = !state.powerIsOn;
    },
  },
});

export const { changePowerState } = displaySlice.actions;

export const selectPowerState = (state: RootState) => state.display.powerIsOn;

export default displaySlice.reducer;
