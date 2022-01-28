import { combineReducers } from "redux";
import post from "./post";
import authReducer from "./auth";

export default combineReducers({
    post,
    authReducer,
})