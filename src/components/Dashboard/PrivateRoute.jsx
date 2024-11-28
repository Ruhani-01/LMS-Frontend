import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// PrivateRoute checks if the user is authorized to access the admin dashboard
function PrivateRoute() {
  const isTeacher = JSON.parse(localStorage.getItem("isTeacher"));

  if (isTeacher === false) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />; // If authorized, render child routes
}

export default PrivateRoute;
