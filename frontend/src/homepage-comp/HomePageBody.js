import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate


export function HomePageBody({ onCreateDeck }) {
  const navigate = useNavigate(); // Initialize navigate
  const userId = localStorage.getItem("userId");
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    fetch("/api/get-decks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId }),
    })
      .then((res) => res.json())
      .then((data) => setDecks(data))
      .catch((err) => console.error("Failed to load decks", err));
  }, [userId]);
  // change jsx to loop through all the decks and print them on the screen in the format provided.
  // if no decks, show a message that says 'you have no decks'


  const handleDeckClick = (deckId) => {
    navigate(`/deck/${deckId}`); // Navigate to the specific deck page
  };

  return (
    <div className="home-page-body">
      <div className="decks-container">
        {decks.length > 0 ? (
          decks.map((deck) => (
            <div
              key={deck.deck_id}
              className="deck-card-hp"
              onClick={() => handleDeckClick(deck.deck_id)} // Attach click handler
            >
              <h3 className="deck-title-hp">{deck.deck_name}</h3>
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
