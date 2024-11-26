import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import "@testing-library/jest-dom";


// Mock components for testing
function MockLoginPage() {
  return <div>Login Page</div>;
}

function MockHomePage() {
  return <div>Home Page</div>;
}

describe("ProtectedRoute", () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  it("redirects to login if userId is not in localStorage", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Routes>
          <Route path="/homepage" element={<ProtectedRoute><MockHomePage /></ProtectedRoute>} />
          <Route path="/" element={<MockLoginPage />} />
        </Routes>
      </BrowserRouter>
    );

    // Simulate visiting /homepage
    window.history.pushState({}, "Homepage", "/homepage");

    expect(getByText("Login Page")).toBeInTheDocument();
  });

  it("renders the protected component if userId exists in localStorage", () => {
    localStorage.setItem("userId", "12345"); // Simulate login

    const { getByText } = render(
      <BrowserRouter>
        <Routes>
          <Route path="/homepage" element={<ProtectedRoute><MockHomePage /></ProtectedRoute>} />
          <Route path="/" element={<MockLoginPage />} />
        </Routes>
      </BrowserRouter>
    );

    // Simulate visiting /homepage
    window.history.pushState({}, "Homepage", "/homepage");

    expect(getByText("Home Page")).toBeInTheDocument();
  });
});
