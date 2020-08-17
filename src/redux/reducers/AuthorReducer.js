import * as types from "../actions/ActionTypes";
import initialState from "./InitialState";

export default function CourseReducer(state = initialState.authors, actions) {
  switch (actions.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return actions.authors;
    default:
      return state;
  }
}
