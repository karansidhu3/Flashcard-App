import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add useNavigate

export function LoginBody() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    // Reset error and proceed with login logic
    setError("");
    console.log("Logging in with:", username, password);
    window.location.href = "/homepage";
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <p
          className="create-account-link"
          onClick={() => navigate("/signup")} // Navigate to signup page
        >
          Create Account
        </p>
      </form>
    </div>
  );
}
