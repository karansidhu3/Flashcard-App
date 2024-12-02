// src/pages/ShareDeck.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/ShareDeck.css";


export function validateShareDeck(shareOption, username) {
  if (!shareOption) {
    return { success: false, error: "Please select a sharing option." };
  }
  if (shareOption === "user" && !username.trim()) {
    return { success: false, error: "Please enter a username to share with." };
  }
  return { success: true };
}



const ShareDeck = () => {
  const { deckId } = useParams(); // Get deckId from URL params
  const navigate = useNavigate();
  const [shareOption, setShareOption] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleOptionChange = (option) => {
    setShareOption(option);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (shareOption === "user") {
      if (!username.trim()) {
        setError("Please enter a username to share with.");
        return;
      }

      try {
        const response = await fetch("/api/share-deck-with-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deck_id: deckId, username }),
        });

        if (response.ok) {
          setSuccess(`Deck shared with user "${username}" successfully!`);
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to share deck with user.");
        }
      } catch (err) {
        setError("An error occurred while sharing the deck.");
      }
    } else if (shareOption === "public") {
      try {
        const response = await fetch("/api/make-deck-public", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deck_id: deckId }),
        });

        if (response.ok) {
          setSuccess("Deck is now public!");
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to make deck public.");
        }
      } catch (err) {
        setError("An error occurred while making the deck public.");
      }
    } else {
      setError("Please select a sharing option.");
    }
  };

  const handleCancel = () => {
    navigate(`/deck/${deckId}`);
  };

  return (
    <div className="share-deck-page">
      <h1>Share Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="share-options">
          <label>
            <input
              type="radio"
              value="user"
              checked={shareOption === "user"}
              onChange={() => handleOptionChange("user")}
            />
            Share with another user
          </label>
          {shareOption === "user" && (
            <div className="user-share">
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                />
              </label>
            </div>
          )}
          <label>
            <input
              type="radio"
              value="public"
              checked={shareOption === "public"}
              onChange={() => handleOptionChange("public")}
            />
            Make the deck public
          </label>
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <div className="form-buttons">
          <button type="submit" className="button submit-button">Submit</button>
          <button type="button" className="button cancel-button" onClick={handleCancel}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default ShareDeck;
