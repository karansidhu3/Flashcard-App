// tests/services/FlashcardFactory.test.js

jest.mock('../../models/Flashcard', () => {
  return jest.fn().mockImplementation(({ question, answer, deckId, flashcardId }) => ({
      question,
      answer,
      deckId,
      flashcardId,
  }));
});

const Flashcard = require('../../models/Flashcard');
const FlashcardFactory = require('../../services/FlashcardFactory');

test('FlashcardFactory creates a Flashcard instance', () => {
  const flashcard = FlashcardFactory.createFlashcard({
      question: 'What is Node.js?',
      answer: 'A runtime environment for JavaScript',
      deckId: 1,
      flashcardId: 123,
  });

  expect(flashcard).toEqual({
      question: 'What is Node.js?',
      answer: 'A runtime environment for JavaScript',
      deckId: 1,
      flashcardId: 123,
  });
});
