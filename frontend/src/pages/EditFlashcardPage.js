import React, { useState, useEffect } from "react";
import "./styles/EditFlashcardPage.css";
import { useParams, useNavigate} from "react-router-dom";

const EditFlashcard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const { deck_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch(`/api/get-flashcards`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deck_id }),
        });
        const data = await response.json();
        setFlashcards(data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    fetchFlashcards();
  }, [deck_id]);

  const handleInputChange = (id, field, value) => {
    setFlashcards((prevFlashcards) =>
      prevFlashcards.map((flashcard) =>
        flashcard.flashcard_id === id ? { ...flashcard, [field]: value } : flashcard
      )
    );
  };

  const handleSave = async (flashcard) => {
    try {
      const response = await fetch(`/api/flashcards/${flashcard.flashcard_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: flashcard.question,
          answer: flashcard.answer,
          is_known: flashcard.is_known,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save flashcard");
      }

      alert("Flashcard saved successfully!");
    } catch (error) {
      console.error("Error saving flashcard:", error);
      alert("Failed to save flashcard. Please try again.");
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="edit-page">
    <button className="back-button" onClick={handleBack}>
        Back
      </button>
      <h2 className="edit-header">Edit Flashcards</h2>
      <div className="flashcard-list">
        {flashcards.map((flashcard) => (
          <div key={flashcard.flashcard_id} className="flashcard-container">
            <h3>Flashcard {flashcard.flashcard_id}</h3>
            <div className="form-group">
              <label htmlFor={`question-${flashcard.flashcard_id}`}>Question:</label>
              <textarea
                id={`question-${flashcard.flashcard_id}`}
                value={flashcard.question}
                onChange={(e) =>
                  handleInputChange(flashcard.flashcard_id, "question", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor={`answer-${flashcard.flashcard_id}`}>Answer:</label>
              <textarea
                id={`answer-${flashcard.flashcard_id}`}
                value={flashcard.answer}
                onChange={(e) =>
                  handleInputChange(flashcard.flashcard_id, "answer", e.target.value)
                }
              />
            </div>
            <button
              className="save-button"
              onClick={() => handleSave(flashcard)}
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditFlashcard;
