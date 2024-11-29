import React, { useState } from 'react';
import './styles/CreateFlashcardPage.css'; // Ensure the path is correct based on your project structure
import { useParams, useNavigate } from 'react-router-dom'; // React Router v6

const CreateFlashcardPage = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { deck_id } = useParams(); // Extract deck_id from URL
  const navigate = useNavigate(); // Access navigate for programmatic navigation

  // Handle back button click
  const handleBack = () => {
    navigate(`/deck/${deck_id}`); // Navigate back to the deck's page
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate deck_id
    if (!deck_id) {
      setError('Deck ID is missing.');
      setLoading(false);
      return;
    }

    try {
      // Define the request payload
      const payload = {
        deck_id: parseInt(deck_id, 10), // Ensure deck_id is an integer
        question,
        answer,
      };

      // **Corrected the API endpoint by replacing ':deck_id' with the actual deck_id**
      const response = await fetch(`/api/deck/${deck_id}/create-flashcard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Parse the JSON response
      const data = await response.json();

      if (response.status === 201) {
        setSuccess('Flashcard created successfully!');
        setQuestion('');
        setAnswer('');
        // Optionally navigate to the deck's page or another route
        // navigate(`/decks/${deck_id}`);
      } else if (response.status === 400) {
        // Handle validation errors
        if (data.errors) {
          const errorMessages = data.errors.map((err) => err.msg).join(' ');
          setError(errorMessages);
        } else if (data.message) {
          setError(data.message);
        } else {
          setError('Validation failed. Please check your input.');
        }
      } else {
        // Handle other server errors
        setError(data.message || 'An unexpected error occurred. Please try again.');
      }
    } catch (err) {
      console.error('Error creating flashcard:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-flashcard-container">
      <button className="button back-button" onClick={handleBack}>
        &larr; Back
      </button>

      <div className="create-flashcard-header">
        <h1 className="create-flashcard-title">Create a New Flashcard</h1>
        <p className="create-flashcard-description">
          Add a new flashcard to your deck.
        </p>
      </div>

      <div className="create-flashcard-body">
        <form className="create-flashcard-form" onSubmit={handleSubmit}>
          {/* Display error message if any */}
          {error && <p className="error-message">{error}</p>}
          {/* Display success message if any */}
          {success && <p className="success-message">{success}</p>}

          <div className="form-group">
            <label htmlFor="question">Question:</label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter the question"
              required
              className="textarea-field"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="answer">Answer:</label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the answer"
              required
              className="textarea-field"
            ></textarea>
          </div>

          <div className="form-buttons">
            <button type="submit" className="button create-button" disabled={loading}>
              {loading ? 'Creating...' : 'Create Flashcard'}
            </button>
            <button
              type="button"
              className="button cancel-button"
              onClick={handleBack}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFlashcardPage;
