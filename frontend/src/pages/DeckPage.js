import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/DeckPage.css";

export function DeckPage() {
  const { deckId } = useParams(); // Get deckId from URL params
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null); // State for deck data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch the selected deck's data from the backend
    const fetchDeck = async () => {
      try {
        const response = await fetch("/api/get-deck", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deck_id: parseInt(deckId) }),
        });

        if (response.ok) {
          const data = await response.json();
          setDeck(data); // Set the deck data
        } else {
          const errorData = await response.json();
          setError(errorData.error || "An error occurred");
        }
      } catch (err) {
        setError("Failed to fetch deck data");
      } finally {
        setLoading(false);
      }
    };

    fetchDeck();
  }, [deckId]);

  // If loading, show a loading message
  if (loading) {
    return <p>Loading deck data...</p>;
  }

  // If error, show the error message
  if (error) {
    return <p>{error}</p>;
  }

  // Handler for the Back button
  const handleBack = () => {
    navigate('/homepage');
  };

  // Handler for the Create Flashcard button
  const handleCreateFlashcard = () => {
    navigate(`/deck/${deckId}/create-flashcard`);
  };

  return (
    <div className={`deck-page`}>
      {/* Back Button */}
      <button className="button back-button" onClick={handleBack}>
        &larr; Back
      </button>

      <div className="deck-header">
        <h1 className="deck-title">{deck.deck_name}</h1>
        <p className="deck-description">{deck.description}</p>
      </div>
      <div className="deck-buttons">
        <button className="button play-button">Play Deck</button>
        <div className="secondary-buttons">
          <button className="button edit-button">Edit Flashcards</button>
          <button className="button create-button" onClick={handleCreateFlashcard}>
            Create Flashcard
          </button>
          <button className="button export-button">Export Deck</button>
        </div>
        <button className="button delete-button">Delete Deck</button>
      </div>
    </div>
  );
}
