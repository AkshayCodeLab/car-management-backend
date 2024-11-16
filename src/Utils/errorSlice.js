import { createSlice } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
  name: "error",
  initialState: {
    loginErr: "",
  },
  reducers: {
    setLoginErr: (state, action) => {
      state.loginErr = action.payload;
    },
  },
});

export const { setLoginErr } = errorSlice.actions;

export default errorSlice.reducer;
