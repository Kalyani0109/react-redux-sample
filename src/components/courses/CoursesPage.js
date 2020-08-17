import React from "react";
import { connect } from "react-redux";
import * as courseAction from "../../redux/actions/CourseActions";
import * as authorAction from "../../redux/actions/AuthorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirecToAddCourse: false,
  };
  componentDidMount() {
    if (this.props.courses.length === 0) {
      this.props.actions.loadCourses().catch((err) => {
        console.log("Courses load failed", err);
      });
    }
    if (this.props.authors.length === 0) {
      this.props.actions.loadAuthors().catch((err) => {
        console.log("Loading authors failed", err);
      });
    }
  }

  handleDeleteCourse = async (course) => {
    toast.success("Course Deleted");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (err) {
      toast.error("Delete Failed. " + err.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirecToAddCourse && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirecToAddCourse: true })}
            >
              Add Course
            </button>
            <CourseList
              courses={this.props.courses}
              onDeleteClick={this.handleDeleteCourse}
            />
          </>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  console.log("Api Calls", state["apiCallsInProgress"]);
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0 ? true : false,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseAction.LoadCourses, dispatch),
      loadAuthors: bindActionCreators(authorAction.LoadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseAction.DeleteCourse, dispatch),
    },
  };
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
