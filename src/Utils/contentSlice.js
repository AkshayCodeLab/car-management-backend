import { createSlice } from "@reduxjs/toolkit";

const contentSlice = createSlice({
  name: "content",
  initialState: {
    homeContent: "",
  },
  reducers: {
    setHomeContent: (state, action) => {
      state.homeContent = action.payload;
    },
  },
});

export const { setHomeContent } = contentSlice.actions;

export default contentSlice.reducer;
