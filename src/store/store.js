import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./slice/SignupSlice";
import authSlice from "./slice/AuthSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage
}

const reducer = combineReducers({
  signupSlice,
  authSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer
});
export default store;
