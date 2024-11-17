import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage.js";
import "./pages/styles/general.css"
import { HomePage } from "./pages/HomePage.js";
import { DeckPage } from "./pages/DeckPage.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/deck/:deckId" element={<DeckPage />} />
      </Routes>
    </BrowserRouter>
  );
}