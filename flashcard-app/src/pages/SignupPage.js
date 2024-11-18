import React, { useState } from "react";
import { LoginHeader } from "../loginpage-comp/LoginHeader.js";
import "./styles/LoginPage.css";

export function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    // Show Chrome popup message
    alert("Account created successfully! (TODO: Implement backend)");

    console.log("Signing up with:", { username, email, password });
  };

  return (
    <div className="login-page">
      <LoginHeader />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSignup}>
          <h2>Sign Up</h2>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
