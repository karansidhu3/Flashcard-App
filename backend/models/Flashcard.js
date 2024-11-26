
import { application } from 'express';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

class Flashcard{
  /**
   * Constructs a new TextFlashcard instance.
   * @param {Object} params - Parameters for the flashcard.
   * @param {string} params.question - The question text.
   * @param {string} params.answer - The answer text.
   * @param {string} [params.deckId] - The ID of the deck this flashcard belongs to.
   * @param {string} [params.flashcardId] - The unique ID of the flashcard.
   */
  constructor({ question, answer, deckId, flashcardId }) {
    if (!question || !answer) {
      throw new Error("Flashcard requires 'question' and 'answer'");
    }

    this.flashcardId = flashcardId || uuidv4(); // Generate ID if not provided
    this.deckId = deckId || null; // Will be set later
    this.question = question;
    this.answer = answer;
  }

  // Optional: Getters and Setters
  getId() {
    return this.flashcardId;
  }

  getDeckId() {
    return this.deckId;
  }

  setDeckId(deckId) {
    this.deckId = deckId;
  }
}

module.exports = application;
