import courseReducer from "./CourseReducer";
import * as courseActions from "../actions/CourseActions";

it(" should add course", () => {
  //arrange
  const initialCourse = [
    {
      title: "A",
    },
    {
      title: "B",
    },
  ];

  const newCourse = {
    title: "C",
  };

  //act
  const action = courseActions.createCourseSuccess(newCourse);
  const reducer = courseReducer(initialCourse, action);

  //assert
  expect(reducer.length).toEqual(3);
  expect(reducer[0].title).toEqual("A");
  expect(reducer[1].title).toEqual("B");
  expect(reducer[2].title).toEqual("C");
});
