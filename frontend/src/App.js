import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage.js";
import "./pages/styles/general.css";
import { HomePage } from "./pages/HomePage.js";
import { DeckPage } from "./pages/DeckPage.js";
import { SignupPage } from "./pages/SignupPage.js";
import { CreateDeckPage } from "./pages/CreateDeckPage.js";
import { CreateFlashcardPage } from "./pages/CreateFlashcardPage.js"; // Import the new component

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/deck/:deckId" element={<DeckPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-deck" element={<CreateDeckPage />} />
        <Route path="/deck/:deckId/create-flashcard" element={<CreateFlashcardPage />} /> {/* New Route */}
      </Routes>
    </BrowserRouter>
  );
}
