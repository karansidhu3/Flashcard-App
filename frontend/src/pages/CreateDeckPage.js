import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/CreateDeckPage.css";

export function CreateDeckPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Retrieve user ID from local storage
  const user_id = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user_id is available
    if (!user_id) {
      alert("User not logged in.");
      return;
    }

    // Create a deck object with necessary fields
    const deckData = {
      user_id: user_id, // Use the user ID from local storage
      deck_name: title,
      description: description,
    };

    try {
      const response = await fetch("/api/create-deck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deckData),
      });

      if (response.ok) {
        const result = await response.json(); // Parse JSON response
        console.log(result.message); // Log the success message
        navigate(`/deck/${result.deck_id}/create-flashcard`); // Navigate to the new deck
      } else {
        const errorMessage = await response.text(); // Parse error message
        console.error("Failed to create deck:", errorMessage);
        alert("Failed to create deck: " + errorMessage);
      }
    } catch (error) {
      console.error("Error while creating deck:", error);
      alert("An error occurred while creating the deck. Please try again.");
    }
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
