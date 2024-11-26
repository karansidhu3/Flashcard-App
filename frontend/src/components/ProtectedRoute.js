import React from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const userId = localStorage.getItem('userId'); // Check if userId is stored

  if (!userId) {
    return <Navigate to="/" />; // Redirect to login if not logged in
  }

  return children;
}
