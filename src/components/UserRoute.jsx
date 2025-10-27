// src/components/UserRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import NotAuthorizedUser from "../pages/NotAuthorizedUser";

const UserRoute = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // not logged in → redirect to login
  if (!user) return <Navigate to="/Loginpage" replace />;

  // admin trying to access user-only pages → show not authorized
  if (user.role === "admin") return <NotAuthorizedUser />;

  // normal user → allow
  return children;
};

export default UserRoute;
