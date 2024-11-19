const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, default: 'General' },
    
});

module.exports = mongoose.model('Flashcard', flashcardSchema);

