import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
        state.mode = state.mode === 'light' ? "dark" : 'light'; 
    } // this function will help us change the mode from dark to light
  }
})

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;