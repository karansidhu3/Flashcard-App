import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add useNavigate

export function LoginBody() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setError("");

    try {
      const response = await fetch('/api/login', {
        method: 'POST', // Matches the backend's POST route
        headers: {
          'Content-Type': 'application/json', // Ensure JSON data is sent
        },
        body: JSON.stringify({ username, password }), // Send email and password
      });

      if (response.ok) {
        const data = await response.json(); // Parse the response JSON
        alert('Login successful!');
        console.log('User ID:', data.userId); // Optional: log the user ID
        navigate('/homepage'); // Redirect to a protected route, e.g., '/dashboard'
      } else {
        const errorMessage = await response.text();
        alert(`Login failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
    
    
  };

  const goToSignup = (e) => {
    navigate("/signup")
  }

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
        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <button className="login-link" onClick={goToSignup}>
              Signup
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
