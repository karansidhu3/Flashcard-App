import React, { useState } from "react";
import { LoginHeader } from "../loginpage-comp/LoginHeader.js";
import { useNavigate } from "react-router-dom"; // For navigation
import "./styles/SignupPage.css";

export function validateSignup(username, email, password) {
  if (!username || !email || !password) {
    return { success: false, error: "Please fill in all fields." };
  } else if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters long." };
  }

  return { success: true };
}

export function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For navigation

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate signup input
    const result = validateSignup(username, email, password);

    // If validation fails, display error and stop further processing
    if (!result.success) {
      setError(result.error);
      return;
    }

    // Clear error message if validation passes
    setError("");

    // Proceed with sending the data to the backend only if validation passes
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        alert('Signup successful!');
        navigate('/'); // Redirect to login page after successful signup
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  const handleLoginRedirect = () => {
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="signup-page">
      <LoginHeader />
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSignup}>
          <h2>Sign Up</h2>
          {error && <p className="signup-error-message">{error}</p>}
          <div className="signup-input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="signup-input-field"
              required
            />
          </div>
          <div className="signup-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup-input-field"
              required
            />
          </div>
          <div className="signup-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-input-field"
              minLength="6"
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Create Account
          </button>
        </form>
        <div className="signup-footer">
          <p>
            Have an account?{" "}
            <button className="signup-login-link" onClick={handleLoginRedirect}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}