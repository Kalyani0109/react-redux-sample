import * as types from "./ActionTypes";
import * as courseApi from "../../api/courseApi";
import { BeginApiCall, apiCallError } from "../actions/ApiActionStatus";

//this function is called sction creator because it creates a action

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSES_SUCCESS, course };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSES_SUCCESS, course };
}

export function LoadCourses() {
  return function (dispatch) {
    dispatch(BeginApiCall());
    return courseApi
      .getCourses()
      .then((response) => {
        dispatch(loadCoursesSuccess(response));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function SaveCourse(course) {
  return function (dispatch) {
    dispatch(BeginApiCall());
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function deleteCourseOptimistic(course) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}

export function DeleteCourse(course) {
  return function (dispatch) {
    // Doing optimistic delete, so no dispatching begin/end api call
    //actions, or apiCallError since we are not showing the loading states for this
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
}
