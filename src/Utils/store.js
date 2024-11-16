import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./errorSlice";
import contentReducer from "./contentSlice";
export default configureStore({
  reducer: {
    error: errorReducer,
    content: contentReducer,
  },
});
