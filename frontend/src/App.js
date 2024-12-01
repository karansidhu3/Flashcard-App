// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage.js";
import "./pages/styles/general.css";
import { HomePage } from "./pages/HomePage.js";
import { DeckPage } from "./pages/DeckPage.js";
import { SignupPage } from "./pages/SignupPage.js";
import { CreateDeckPage } from "./pages/CreateDeckPage.js";
import CreateFlashcardPage from "./pages/CreateFlashcardPage.js"; // Import the new component
import { ProtectedRoute } from "./components/ProtectedRoute.js";
import PlayPage from "./pages/PlayPage.js";
import ShareDeck from "./pages/ShareDeck.js"; // Import the new ShareDeck component

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homepage" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/deck/:deckId" element={<ProtectedRoute><DeckPage /></ProtectedRoute>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-deck" element={<ProtectedRoute><CreateDeckPage /></ProtectedRoute>} />
        <Route path="/deck/:deck_id/create-flashcard" element={<ProtectedRoute><CreateFlashcardPage /></ProtectedRoute>} /> {/* New Route */}
        <Route path="/playgame/:deckId" element={<ProtectedRoute><PlayPage /></ProtectedRoute>} />
        <Route path="/deck/:deckId/share" element={<ProtectedRoute><ShareDeck /></ProtectedRoute>} /> {/* New ShareDeck Route */}
      </Routes>
    </BrowserRouter>
  );
}
