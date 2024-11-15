// HeaderPageBody.js
import React from "react";

export function HomePageBody({ decks, onCreateDeck }) {
  return (
    <div className="home-page-body">
      <div className="decks-container">
        {decks.length > 0 ? (
          decks.map((deck) => (
            <div key={deck.id} className="deck-card">
              <h3 className="deck-title">{deck.title}</h3>
              <p className="deck-description">{deck.description}</p>
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
