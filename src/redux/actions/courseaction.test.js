import * as courseAction from "./CourseActions";
import * as types from "./ActionTypes";
import { courses } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import ConfigureMockStore from "redux-mock-store";

//Test an async function
const middleware = [thunk];
const mockStore = ConfigureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore(); // to mock the fetch call aster thunks, restore initializes fetchMock for each test
  });

  describe("Load Courses thunk", () => {
    it("Test Loading Courses success", () => {
      fetchMock.mock("*", {
        body: courses,
        headers: { "content-type": "application/json" },
      });
      const expectedAction = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses },
      ];

      const store = mockStore({ courses: [] });
      return store.dispatch(courseAction.LoadCourses()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });
});

describe("createCourseAcrions", () => {
  it("should test create course success", () => {
    //arrange
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSES_SUCCESS,
      course,
    };

    // act
    const createCourse = courseAction.createCourseSuccess(course);

    //assert
    expect(createCourse).toEqual(expectedAction);
  });
});
