import { useParams } from "react-router-dom";

export default function PlayPage() {
  const { deckId } = useParams();

  // Use the deckId to fetch or display flashcards for the specific deck
  return (
    <div>
      <h1>Deck ID: {deckId}</h1>
      {/* Flashcard rendering logic here */}
    </div>
  );
}

// <Link to={`/playpage/${selectedDeckId}`}>Start Studying</Link>
