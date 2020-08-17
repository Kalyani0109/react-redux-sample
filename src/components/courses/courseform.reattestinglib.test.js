import React from "react";
import { cleanup, render } from "react-testing-library";
import CourseForm from "./CourseForm";

afterEach(cleanup);

function renderCourseForm(args) {
  let defaultProps = {
    authors: [],
    course: {},
    saving: false,
    erros: {},
    onSave: () => {},
    onChange: () => {},
  };
  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

it("should render Add Course button", () => {
  const { getByText } = renderCourseForm();
  getByText("Add Course");
});

it("should have Save Button", () => {
  const { getByText } = renderCourseForm();
  getByText("Save");
});

it("should have Saving... Button", () => {
  const { getByText } = renderCourseForm({ saving: true });
  getByText("Saving...");
});
