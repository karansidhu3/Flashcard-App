import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/SignupPage.css";

export function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
  
    if (!username || !email || !password) {
      setError("All fields are required.");
      console.log("Validation failed: Missing fields");
      return;
    }
  
    setError("");
  
    try {
      console.log("Sending request to backend...");
      const response = await fetch('http://localhost:6000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      console.log("Response status:", response.status);
  
      if (response.ok) {
        const data = await response.json();
        console.log("Signup successful:", data);
        alert('Signup successful!');
        navigate('/login');
      } else {
        const errorMessage = await response.text();
        console.error("Signup failed with message:", errorMessage);
        setError(`Signup failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      setError('An error occurred. Please try again later.');
    }
  };
  

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
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
        <button type="submit" className="signup-button">
          Create Account
        </button>
      </form>
      <div className="signup-footer">
        <p>
          Have an account?{" "}
          <button className="signup-login-link" onClick={() => navigate("/login")}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
