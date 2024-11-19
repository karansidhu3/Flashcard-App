import React from "react";
import { LoginBody } from "../loginpage-comp/LoginBody.js";
import { LoginHeader } from "../loginpage-comp/LoginHeader.js";
import "./styles/LoginPage.css"

export function LoginPage() {
  return (
    <div className="login-page">
      <LoginHeader />
      <LoginBody />
    </div>
  );
}