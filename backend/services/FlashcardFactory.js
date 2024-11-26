const Flashcard = require('../models/Flashcard'); 

const FlashcardFactory = {

    async createAndSaveFlashcard({ question, answer, deckId = null, flashcardId = null }) {
        const flashcard = new Flashcard({ question, answer, deckId, flashcardId });
        return flashcard.save();
    }
  }
  module.exports = FlashcardFactory;