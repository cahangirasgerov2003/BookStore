import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/about" element={<About />}></Route>
    </Routes>
  );
};

export default Routers;
