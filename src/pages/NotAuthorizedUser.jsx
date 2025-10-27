import React from "react";
import { Link } from "react-router-dom";

export default function NotAuthorizedUser() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">403 — Not Authorized</h1>
        <p className="mb-6">Admins cannot access user pages.</p>
        <Link to="/admin/dashboard" className="underline text-blue-600">
          Go to Admin Dashboard
        </Link>
      </div>
    </div>
  );
}
