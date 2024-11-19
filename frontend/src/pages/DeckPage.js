import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import "./styles/DeckPage.css"

export function DeckPage() {
  const { deckId } = useParams(); // Extract deckId from the URL
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

  return (
    <div className={`deck-page ${isStudyMode ? "study-mode" : "casual-mode"}`}>
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
          <button className="button create-button">Create Flashcard</button>
          <button className="button export-button">Export Deck</button>
        </div>

        {/* Destructive Action */}
        <button className="button delete-button">Delete Deck</button>

        {/* Toggle Mode */}
        <button className="button toggle-button" onClick={toggleMode}>
          {isStudyMode ? "Switch to Casual Mode" : "Switch to Study Mode"}
        </button>
      </div>
    </div>
  );
}
