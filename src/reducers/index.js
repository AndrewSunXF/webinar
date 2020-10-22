import { combineReducers } from "redux";
import auth from "./auth";
import post from "./post";
import form from "./form";
import alert from "./alert";

export default combineReducers({ auth, post, form, alert });
