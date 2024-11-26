const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');

// PostgreSQL Pool Configuration
const pool = new Pool({
    user: 'your_user',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432, // Default PostgreSQL port
});

class Flashcard {
    constructor({ flashcardId, deckId, question, answer }) {
        if (!question || !answer) {
            throw new Error("Flashcard requires 'question' and 'answer'");
        }

        this.flashcardId = flashcardId || uuidv4(); // Generate unique ID if not provided
        this.deckId = deckId || null;
        this.question = question;
        this.answer = answer;
    }

    /**
     * Save the flashcard to the database.
     * @returns {Promise<Object>} The saved flashcard object.
     */
    async save() {
        const query = `
            INSERT INTO flashcards (flashcardId, deckId, question, answer)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [this.flashcardId, this.deckId, this.question, this.answer];

        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error saving flashcard:', error.message);
            throw new Error('Database error: Failed to save flashcard');
        }
    }
}

// Ensure the pool is exportable for test mocks
Flashcard.pool = pool;

module.exports = Flashcard;
