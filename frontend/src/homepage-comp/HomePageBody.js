import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export function HomePageBody({ decks, onCreateDeck }) {
  const navigate = useNavigate(); // Initialize navigate

  const handleDeckClick = (deckId) => {
    navigate(`/deck/${deckId}`); // Navigate to the specific deck page
  };

  return (
    <div className="home-page-body">
      <div className="decks-container">
        {decks.length > 0 ? (
          decks.map((deck) => (
            <div
              key={deck.id}
              className="deck-card-hp"
              onClick={() => handleDeckClick(deck.id)} // Attach click handler
            >
              <h3 className="deck-title-hp">{deck.title}</h3>
              <p className="deck-description-hp">{deck.description}</p>
            </div>
          ))
        ) : (
          <p className="no-decks">No decks available. Create a new one!</p>
        )}
      </div>
      <button className="create-deck-button" onClick={onCreateDeck}>
        + Create Deck
      </button>
    </div>
  );
}
