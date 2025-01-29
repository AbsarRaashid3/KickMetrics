//not using it for now

import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState:
   {
    darkMode: false, // UI state for theme toggle
  },
  reducers: {
    ToggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { ToggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
