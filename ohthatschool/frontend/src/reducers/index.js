import { combineReducers } from "redux";
import auth from "./auth";
import course from "./course";
import educator from "./educator";
import messages from "./messages";
import website from "./website";

export default combineReducers({
  auth,
  course,
  educator,
  messages,
  website,
});