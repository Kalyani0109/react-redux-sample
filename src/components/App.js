import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/Homepage.js";
import AboutPage from "./about/AboutPage.js";
import Header from "./common/Header.js";
import PageNotFound from "./PageNotFound.js";
import CoursesPage from "./courses/CoursesPage.js";
// eslint-disable-next-line import/no-named-as-default
import ManageCoursePage from "./courses/ManageCoursePage.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/course/:slug" component={ManageCoursePage} />{" "}
        {/* wrapped up insde switch /:slug URL will preceed the short URL as to match first otherwise course would match and return the jsx */}
        <Route path="/course" component={ManageCoursePage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
