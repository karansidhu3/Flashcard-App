import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/DeckPage.css";

export function DeckPage() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [isStudyMode, setIsStudyMode] = useState(false);

  // Mock deck data (replace this with actual logic to fetch deck info)
  const mockDecks = [
    { id: 1, title: "Java Basics", description: "Flashcards for Java concepts" },
    { id: 2, title: "React Essentials", description: "React components and hooks" },
  ];
  const deck = mockDecks.find((d) => d.id === parseInt(deckId));

  if (!deck) {
    return <p>Deck not found!</p>;
  }

  const toggleMode = () => {
    setIsStudyMode(!isStudyMode);
  };

  // Handler for the Back button
  const handleBack = () => {
    navigate('/homepage');
  };

  // Handler for the Create Flashcard button
  const handleCreateFlashcard = () => {
    navigate(`/deck/${deckId}/create-flashcard`);
  };

  // Handler for the Delete Deck button
  const handleDeleteDeck = async () => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      try {
        const response = await fetch("/api/delete-deck", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deck_id: deckId }),
        });

        if (response.ok) {
          alert("Deck deleted successfully!");
          navigate("/homepage"); // Navigate back to homepage
        } else {
          const errorMessage = await response.text();
          alert(`Failed to delete deck: ${errorMessage}`);
        }
      } catch (error) {
        console.error("Error deleting deck:", error);
        alert("An error occurred while deleting the deck. Please try again.");
      }
    }
  };

  return (
    <div className={`deck-page ${isStudyMode ? "study-mode" : "casual-mode"}`}>
      {/* Back Button positioned at the top-left corner */}
      <button className="button back-button" onClick={handleBack}>
        &larr; Back
      </button>

      <div className="deck-header">
        <h1 className="deck-title">{deck.title}</h1>
        <p className="deck-description">{deck.description}</p>
      </div>
      <div className="deck-buttons">
        {/* Primary Action */}
        <button className="button play-button">Play Deck</button>

        {/* Grouped Actions */}
        <div className="secondary-buttons">
          <button className="button edit-button">Edit Flashcards</button>
          <button className="button create-button" onClick={handleCreateFlashcard}>
            Create Flashcard
          </button>
          <button className="button export-button">Export Deck</button>
        </div>

        {/* Destructive Action */}
        <button className="button delete-button" onClick={handleDeleteDeck}>
          Delete Deck
        </button>

        {/* Toggle Mode */}
        <button className="button toggle-button" onClick={toggleMode}>
          {isStudyMode ? "Switch to Casual Mode" : "Switch to Study Mode"}
        </button>
      </div>
    </div>
  );
}
