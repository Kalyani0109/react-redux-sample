import * as types from "../actions/ActionTypes";
import initialState from "./InitialState";

export default function CourseReducer(state = initialState.courses, actions) {
  switch (actions.type) {
    case types.CREATE_COURSES_SUCCESS:
      return [...state, { ...actions.course }];
    case types.UPDATE_COURSES_SUCCESS:
      return state.map((course) =>
        course.id === actions.course.id ? actions.course : course
      );
    case types.LOAD_COURSES_SUCCESS:
      return actions.courses;
    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter((course) => course.id !== actions.course.id);
    default:
      return state;
  }
}
