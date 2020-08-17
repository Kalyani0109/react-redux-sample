import { createStore } from "redux";
import rootReducer from "./reducers/index";
import initialState from "./reducers/InitialState";
import * as courseAction from "./actions/CourseActions";

it("should handle create course", () => {
  //arrange
  const store = createStore(rootReducer, initialState);
  const course = {
    title: "Clean Code",
  };

  //act
  const action = courseAction.createCourseSuccess(course);
  store.dispatch(action);

  //assert
  const createdCourse = store.getState().courses[0];
  expect(createdCourse).toEqual(course);
});
