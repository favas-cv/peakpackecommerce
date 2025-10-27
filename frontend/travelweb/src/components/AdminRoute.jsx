// src/components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import NotAuthorizedAdmin from "../pages/NotAuthorizedAdmin";

const AdminRoute = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // not logged in → go to login
  if (!user) return <Navigate to="/Loginpage" replace />;

  // logged in but not admin → show NotAuthorized component
  if (user.role !== "admin") return <NotAuthorizedAdmin />;

  // admin → show the children
  return children;
};

export default AdminRoute;
