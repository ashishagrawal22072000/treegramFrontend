// import { configureStore } from "@reduxjs/toolkit";
// import signupSlice from "./slice/SignupSlice";
// import authSlice from "./slice/AuthSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import RootReducer from "./RootReducer"
// import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage
}

// const reducer = combineReducers({
//   signupSlice,
//   authSlice,
// })

const persistedReducer = persistReducer(persistConfig, RootReducer)

// const store = configureStore({
//   reducer: persistedReducer
// });
// export default store;




const middleware = [thunk]

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store