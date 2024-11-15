import React from "react";
import { useNavigate } from "react-router-dom"; // Use navigate for routing

export default function HomePageHeader() {
  const navigate = useNavigate(); // For navigation to the login page

  const handleLogout = () => {
    // For now, just navigate back to the login page when the user logs out
    navigate("/login");
  };

  return (
    <div className="home-page-header">
      <h1 className="home-page-title">DeckDash</h1>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}