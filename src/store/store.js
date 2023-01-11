import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./slice/SignupSlice";

const store = configureStore({
  reducer: {
    signup: signupSlice,
  },
});
export default store;
