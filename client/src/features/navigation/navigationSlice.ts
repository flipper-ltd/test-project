import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum NavigationName {
  FILES = "Files",
  SETTINGS = "Settings",
}

export interface NavigationState {
  name: NavigationName;
}

const initialState: NavigationState = {
  name: NavigationName.FILES,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setNavigation(state, action) {
      state.name = action.payload;
    },
    resetNavigation(state) {
      state.name = NavigationName.FILES;
    },
  },
});

export const { setNavigation, resetNavigation } = navigationSlice.actions;
export default navigationSlice.reducer;
