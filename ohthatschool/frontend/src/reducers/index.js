import { combineReducers } from "redux";
import auth from "./auth";
import common from "./common";
import course from "./course";
import educator from "./educator";
import messages from "./messages";
import website from "./website";

export default combineReducers({
  auth,
  common,
  course,
  educator,
  messages,
  website,
});