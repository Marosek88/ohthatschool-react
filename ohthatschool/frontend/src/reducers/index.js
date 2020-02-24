import { combineReducers } from "redux";
import website from "./website";
import course from "./course";
import messages from "./messages";

export default combineReducers({
  website,
  course,
  messages,
});