import React from "react";
import { mount } from "enzyme";
import { courses, authors, newCourse } from "../../../tools/mockData";
import { ManageCoursePage } from "./ManageCoursePage"; //adding the {} means not importing default export but the named export provided by the file

function renderComponent(args) {
  const defaultProps = {
    courses,
    authors,
    LoadCourses: jest.fn(),
    LoadAuthors: jest.fn(),
    SaveCourse: jest.fn(),
    history: {},
    course: newCourse,
    match: {},
  };

  const props = { ...defaultProps, ...args };
  return mount(<ManageCoursePage {...props} />);
}

it("Validation Error", () => {
  const wrapper = renderComponent();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("Title is required.");
});
