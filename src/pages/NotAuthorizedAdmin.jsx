import React from "react";
import { Link } from "react-router-dom";

export default function NotAuthorizedAdmin() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">403 — Not Authorized</h1>
        <p className="mb-6">You do not have permission to view this page.</p>
        <Link to="/" className="underline text-blue-600">
          Go back Home
        </Link>
      </div>
    </div>
  );
}
