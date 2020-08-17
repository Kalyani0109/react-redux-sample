import { combineReducers } from "redux";
import courses from "./CourseReducer";
import authors from "./AuthorReducer";
import apiCallsInProgress from "./ApiStatuReducer";

// access the state with this variable names they initialize state with the given variable
const rootReducer = combineReducers({
  courses,
  authors,
  apiCallsInProgress,
});

export default rootReducer;
