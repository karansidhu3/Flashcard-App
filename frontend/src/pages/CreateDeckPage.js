import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/CreateDeckPage.css"; // Create a CSS file for styling

export function CreateDeckPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (title.trim() === "") {
      alert("Title is required!");
      return;
    }

    // Retrieve existing decks from local storage or initialize an empty array
    const existingDecks = JSON.parse(localStorage.getItem("decks")) || [];

    // Create a new deck object
    const newDeck = {
      id: existingDecks.length + 1, // Simple ID assignment
      title,
      description,
    };

    // Update the decks array
    const updatedDecks = [...existingDecks, newDeck];

    // Save the updated decks array to local storage
    localStorage.setItem("decks", JSON.stringify(updatedDecks));

    // Redirect to Home Page
    navigate("/homepage");
  };

  const handleCancel = () => {
    navigate("/homepage");
  };

  return (
    <div className="create-deck-page">
      <header className="create-deck-header">
        <h1 className="create-deck-title">Create a New Deck</h1>
      </header>
      <div className="create-deck-body">
        <form className="create-deck-form" onSubmit={handleSubmit}>
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
            <button type="button" className="button cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
