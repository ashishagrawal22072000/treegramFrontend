import { combineReducers } from "redux";
import AuthReducer from "./auth/AuthReducer";
import ListReducer from "./list/ListReducer";
export default combineReducers({
    AuthReducer,
    ListReducer
})