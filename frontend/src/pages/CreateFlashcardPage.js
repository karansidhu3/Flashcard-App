import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/CreateFlashcardPage.css"; // We'll create this CSS file next

export function CreateFlashcardPage() {
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const navigate = useNavigate();
  const { deckId } = useParams(); // Get the deck ID from the URL parameters

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (frontText.trim() === "" || backText.trim() === "") {
      alert("Both front and back text are required!");
      return;
    }

    // For now, we'll skip the logic of adding the flashcard
    // You can implement it later when integrating with your backend or state management

    // Redirect back to the Deck Page
    navigate(`/deck/${deckId}`);
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="deck-page">
      <button className="button back-button" onClick={handleBack}>
        &larr; Back
      </button>

      <div className="deck-header">
        <h1 className="deck-title">Create a New Flashcard</h1>
        <p className="deck-description">
          Add a new flashcard to your deck.
        </p>
      </div>

      <div className="deck-body">
        <form className="deck-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="front-text">Front Text:</label>
            <textarea
              id="front-text"
              value={frontText}
              onChange={(e) => setFrontText(e.target.value)}
              placeholder="Enter text for the front side"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="back-text">Back Text:</label>
            <textarea
              id="back-text"
              value={backText}
              onChange={(e) => setBackText(e.target.value)}
              placeholder="Enter text for the back side"
              required
            ></textarea>
          </div>
          <div className="form-buttons">
            <button type="submit" className="button create-button">
              Create Flashcard
            </button>
            <button type="button" className="button cancel-button" onClick={handleBack}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
