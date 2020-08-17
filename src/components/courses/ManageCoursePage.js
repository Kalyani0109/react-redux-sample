import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { LoadCourses, SaveCourse } from "../../redux/actions/CourseActions";
import { LoadAuthors } from "../../redux/actions/AuthorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageCoursePage({
  courses,
  authors,
  LoadCourses,
  LoadAuthors,
  SaveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      LoadCourses().catch((err) => {
        console.log("Courses load failed", err);
      });
    } else {
      setCourse({ ...props.course });
    }
    if (authors.length === 0) {
      LoadAuthors().catch((err) => {
        console.log("Loading authors failed", err);
      });
    }
  }, [props.course]);

  function formValidation() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formValidation()) return;
    setSaving(true);
    SaveCourse(course)
      .then(() => {
        toast.success("Course Saved.");
        history.push("/courses");
      })
      .catch((err) => {
        setSaving(false);
        setErrors({ onSave: err.message });
      });
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      authors={authors}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

export function getCourseBySlug(courses, slug) {
  // this type of functions are generally called selectors because they select data from redux store
  return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  //ownProps are automatically popullated by react router
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors,
  };
}

const mapDispatchToProps = {
  LoadCourses,
  LoadAuthors,
  SaveCourse,
};

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  LoadCourses: PropTypes.func.isRequired,
  LoadAuthors: PropTypes.func.isRequired,
  SaveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // this history object is passed out as props automatically when a component is load via <Route> from react router
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
