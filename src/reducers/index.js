import { combineReducers } from "redux";
import error from "./error_reducer";
import route from "./route_reducer";

export default combineReducers({
  error,
  route,
});
