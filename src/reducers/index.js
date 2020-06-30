import { combineReducers } from "redux";

// reducers
import emailReducer from "./emailReducer";

export default combineReducers({
  email: emailReducer,
});
