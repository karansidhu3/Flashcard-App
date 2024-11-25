const FlashcardFactory = {
    /**
     * Creates a new Flashcard instance.
     * @param {Object} params - Parameters for the flashcard.
     * @param {string} params.question - The question text.
     * @param {string} params.answer - The answer text.
     * @param {string} [params.deckId] - The ID of the deck this flashcard belongs to (optional).
     * @param {string} [params.flashcardId] - The unique ID of the flashcard (optional).
     * @returns {Flashcard} A new Flashcard instance.
     */
    createFlashcard({ question, answer, deckId = null, flashcardId = null }) {
      return new Flashcard({
        question,
        answer,
        deckId,
        flashcardId,
      });
    },
};

module.exports = FlashcardFactory;