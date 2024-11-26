jest.mock('../../models/Flashcard');

const FlashcardFactory = require('../../services/FlashcardFactory');
const Flashcard = require('../../models/Flashcard');

describe('FlashcardFactory', () => {
    beforeEach(() => {
        Flashcard.mockClear(); // Clear previous mock calls
    });

    describe('createAndSaveFlashcard', () => {
        it('should create a new Flashcard instance and save it', async () => {
            const flashcardData = {
                question: 'What is Node.js?',
                answer: 'A JavaScript runtime environment.',
                deckId: 'deck1',
                flashcardId: 'flashcard1',
            };

            const mockSavedFlashcard = {
                flashcardId: 'flashcard1',
                deckId: 'deck1',
                question: 'What is Node.js?',
                answer: 'A JavaScript runtime environment.',
            };

            const saveMock = jest.fn().mockResolvedValue(mockSavedFlashcard);

            // Mock the Flashcard class to return an instance with the save method mocked
            Flashcard.mockImplementation(() => ({
                save: saveMock,
            }));

            const result = await FlashcardFactory.createAndSaveFlashcard(flashcardData);

            expect(Flashcard).toHaveBeenCalledWith(flashcardData); // Ensure Flashcard was called with the correct arguments
            expect(saveMock).toHaveBeenCalled(); // Ensure save() was called
            expect(result).toEqual(mockSavedFlashcard); // Ensure the saved flashcard is returned
        });
    });
});
