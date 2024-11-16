const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://310testuser:310testpw@cluster0.6vjq3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const Flashcard = require('./models/flashcard');

// Create a new flashcard
app.post('/flashcards', async (req, res) => {
    try {
        const flashcard = new Flashcard(req.body);
        await flashcard.save();
        res.status(201).send(flashcard);
    } catch (err) {
        res.status(400).send(err);
    }
}); 

// Get all flashcards
app.get('/flashcards', async (req, res) => {
    try {
        const flashcards = await Flashcard.find();
        res.send(flashcards);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get a single flashcard by ID
app.get('/flashcards/:id', async (req, res) => {
    try {
        const flashcard = await Flashcard.findById(req.params.id);
        if (!flashcard) return res.status(404).send({ message: 'Flashcard not found' });
        res.send(flashcard);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update a flashcard
app.put('/flashcards/:id', async (req, res) => {
    try {
        const flashcard = await Flashcard.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!flashcard) return res.status(404).send({ message: 'Flashcard not found' });
        res.send(flashcard);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a flashcard
app.delete('/flashcards/:id', async (req, res) => {
    try {
        const flashcard = await Flashcard.findByIdAndDelete(req.params.id);
        if (!flashcard) return res.status(404).send({ message: 'Flashcard not found' });
        res.send({ message: 'Flashcard deleted successfully' });
    } catch (err) {
        res.status(500).send(err);
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));