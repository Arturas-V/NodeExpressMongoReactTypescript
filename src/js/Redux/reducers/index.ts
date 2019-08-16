import { combineReducers } from "redux";
import userStateReducers from "./userStateReducers";

export default combineReducers({
	userState: userStateReducers
});