import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/PlayPage.css";

export default function PlayPage() {
  const { deckId } = useParams();
  const navigate = useNavigate();

  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState([]);

  useEffect(() => {
    async function fetchFlashcards() {
      try {
        const response = await fetch(`/api/get-flashcards`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deck_id: deckId }),
        });
        const data = await response.json();
        setFlashcards(data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    }
    fetchFlashcards();
  }, [deckId]);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleTagAsKnown = () => {
    setKnownCards((prev) => [...prev, flashcards[currentIndex].id]);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else {
      navigate(`/deck/${deckId}`);
    }
  };

  if (flashcards.length === 0) {
    return <div className="play-page-container">Loading flashcards...</div>;
  }

  const currentFlashcard = flashcards[currentIndex];

  return (
    <div className="play-page-container">
      <h1 className="play-page-header">Deck: {deckId}</h1>
      <div className="flashcard-container">
        <div className={isFlipped ? "flashcard-answer" : "flashcard-question"}>
          {isFlipped ? currentFlashcard.answer : currentFlashcard.question}
        </div>
      </div>
      <div className="buttons-container">
        <button className="button button-secondary" onClick={handleFlip}>
          {isFlipped ? "Show Question" : "Show Answer"}
        </button>
        <button className="button button-success" onClick={handleTagAsKnown}>
          Tag as Known
        </button>
        <button className="button button-primary" onClick={handleNext}>
          {currentIndex < flashcards.length - 1 ? "Next" : "Finish"}
        </button>
      </div>
      <p className="progress-indicator">
        Flashcard {currentIndex + 1} of {flashcards.length}
      </p>
    </div>
  );
}
