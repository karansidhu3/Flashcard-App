import React, { useState, useEffect } from "react";

const EditFlashcard = ({ flashcardId, onSave, onCancel }) => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  // Fetch the flashcard details for editing when component mounts
  useEffect(() => {
    // Simulate fetching data (replace with actual API call)
    const fetchFlashcard = async () => {
      const response = await fetch(`/api/deck/${deck_id}/edit-flashcard`);
      const data = await response.json();
      setFront(data.front);
      setBack(data.back);
    };

    fetchFlashcard();
  }, [flashcardId]);

  const handleSave = () => {
    onSave({ id: flashcardId, front, back });
  };

  return (
    <div className="edit-flashcard">
      <h2>Edit Flashcard</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <div className="form-group">
          <label htmlFor="front">Front:</label>
          <textarea
            id="front"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back:</label>
          <textarea
            id="back"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-save">
            Save
          </button>
          <button
            type="button"
            className="btn btn-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFlashcard;
