import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import { connect } from "react-redux";

const Routers = (props) => {
  return (
    <Routes>
      <Route
        path="/"
        element={props.logined ? <Dashboard /> : <Login />}
      ></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

const mapStateToProps = (state) => {
  return {
    logined: state.login.logined,
  };
};

export default connect(mapStateToProps)(Routers);
