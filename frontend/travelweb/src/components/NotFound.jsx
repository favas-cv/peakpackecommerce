import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">404 — Page Not Found</h1>
        <p className="mb-6">The page you are looking for does not exist.</p>
        <Link to="/" className="underline text-blue-600">
          Go back Home
        </Link>
      </div>
    </div>
  );
}
