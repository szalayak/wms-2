import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface DemoState {
  value?: string;
}

const initialState: DemoState = {};

export const loadDemoData = createAsyncThunk("demo/loadData", async () => {
  const response = await fetch("/api");
  return await response.text();
});

export const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadDemoData.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const selectDemovalue = (state: RootState) => state.demo.value;

export default demoSlice.reducer;
