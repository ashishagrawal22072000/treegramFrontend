import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./slice/SignupSlice";
import authSlice from "./slice/AuthSlice";
const store = configureStore({
  reducer: {
    signupSlice,
    authSlice,
  },
});
export default store;
