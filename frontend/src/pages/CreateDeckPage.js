import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/CreateDeckPage.css";

export function CreateDeckPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // For now, skip logic and focus on styling

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/homepage");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="deck-page">
      <button className="button back-button" onClick={handleBack}>
        &larr; Back
      </button>

      <div className="deck-header">
        <h1 className="deck-title">Create a New Deck</h1>
        <p className="deck-description">
          Fill out the form below to create a new deck.
        </p>
      </div>

      <div className="deck-body">
        <form className="deck-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="deck-title">Deck Title:</label>
            <input
              type="text"
              id="deck-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter deck title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="deck-description">Description:</label>
            <textarea
              id="deck-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter deck description"
            ></textarea>
          </div>
          <div className="form-buttons">
            <button type="submit" className="button create-button">
              Create Deck
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
