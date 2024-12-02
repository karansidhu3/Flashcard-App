-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Decks Table
CREATE TABLE decks (
    deck_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    description TEXT NOT NULL,
    deck_name VARCHAR(255) NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Flashcards Table
CREATE TABLE flashcards (
    flashcard_id SERIAL PRIMARY KEY,
    deck_id INT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    is_known BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (deck_id) REFERENCES decks(deck_id) ON DELETE CASCADE
);

CREATE TABLE shared_decks (
    id SERIAL PRIMARY KEY,
    deck_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (deck_id) REFERENCES decks(deck_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Insert Users
INSERT INTO users (username, email, password_hash) 
VALUES 
('Milan', 'milan@mail.com', 'testing1'),
('Ian', 'ian@mail.com', 'testing2'),
('Liam', 'liam@mail.com', 'testing3');

-- Insert Decks for Each User with Descriptions
INSERT INTO decks (user_id, deck_name, description)
VALUES 
-- User 1's Decks
(1, 'Math Deck 1', 'A collection of math problems and solutions for review.'),
(1, 'Science Deck 2', 'Flashcards about basic science concepts and facts.'),
(1, 'History Deck 3', 'Historical events and key figures, organized by topic.'),

-- User 2's Decks
(2, 'Geography Deck 1', 'Geographical locations, features, and world capitals.'),
(2, 'Literature Deck 2', 'Flashcards covering famous works of literature and authors.'),
(2, 'Physics Deck 3', 'Important physics concepts, laws, and key definitions.'),

-- User 3's Decks
(3, 'Art Deck 1', 'Art movements, famous artists, and their works.'),
(3, 'Programming Deck 2', 'Programming concepts, syntax, and coding techniques.'),
(3, 'Sports Deck 3', 'Sports trivia, rules, and major tournaments.');

-- Insert Flashcards for Each Deck
-- User 1's Decks
INSERT INTO flashcards (deck_id, question, answer)
VALUES 
-- Math Deck 1
(1, 'What is 2+2?', '4'),
(1, 'What is 3x3?', '9'),
(1, 'What is 10-5?', '5'),
(1, 'What is 25/5?', '5'),
(1, 'What is the square root of 16?', '4'),
(1, 'What is 7+8?', '15'),
(1, 'What is 15-3?', '12'),
(1, 'What is 12x12?', '144'),
(1, 'What is 8/2?', '4'),
(1, 'What is 5^2?', '25'),

-- Science Deck 2
(2, 'What planet is closest to the Sun?', 'Mercury'),
(2, 'What is H2O?', 'Water'),
(2, 'What gas do plants breathe in?', 'Carbon Dioxide'),
(2, 'What is the chemical symbol for gold?', 'Au'),
(2, 'What is the speed of light?', '299,792 km/s'),
(2, 'What is the main gas in Earth’s atmosphere?', 'Nitrogen'),
(2, 'What force keeps us on Earth?', 'Gravity'),
(2, 'What is the boiling point of water?', '100°C'),
(2, 'What is the freezing point of water?', '0°C'),
(2, 'What organ pumps blood?', 'Heart'),

-- History Deck 3
(3, 'Who was the first president of the USA?', 'George Washington'),
(3, 'When did WW2 end?', '1945'),
(3, 'Who discovered America?', 'Christopher Columbus'),
(3, 'What year did the Berlin Wall fall?', '1989'),
(3, 'Who was known as the Iron Lady?', 'Margaret Thatcher'),
(3, 'When was the Declaration of Independence signed?', '1776'),
(3, 'Who was Julius Caesar?', 'Roman General'),
(3, 'What was the Renaissance?', 'Cultural Movement'),
(3, 'What year did man land on the moon?', '1969'),
(3, 'Who was the King of England during the American Revolution?', 'King George III');

-- User 2's Decks Flashcards
INSERT INTO flashcards (deck_id, question, answer)
VALUES 
-- Geography Deck 1
(4, 'What is the capital of France?', 'Paris'),
(4, 'Which continent is Australia in?', 'Australia'),
(4, 'What is the largest ocean?', 'Pacific Ocean'),
(4, 'What country has the Great Wall?', 'China'),
(4, 'What is the tallest mountain?', 'Mount Everest'),

-- Literature Deck 2
(5, 'Who wrote "Romeo and Juliet"?', 'William Shakespeare'),
(5, 'What is the main character in "1984"?', 'Winston Smith'),
(5, 'What is the theme of "Pride and Prejudice"?', 'Love and Social Status'),
(5, 'Who wrote "Moby Dick"?', 'Herman Melville'),
(5, 'What is the setting of "To Kill a Mockingbird"?', 'Alabama'),

-- Physics Deck 3
(6, 'What is Newton’s First Law of Motion?', 'An object stays at rest or in motion unless acted upon.'),
(6, 'What is the speed of sound?', '343 m/s in air'),
(6, 'What is the formula for force?', 'F = ma'),
(6, 'What is the unit of energy?', 'Joule'),
(6, 'Who discovered gravity?', 'Isaac Newton');

-- User 3's Decks Flashcards
INSERT INTO flashcards (deck_id, question, answer)
VALUES 
-- Art Deck 1
(7, 'Who painted the Mona Lisa?', 'Leonardo da Vinci'),
(7, 'What is Cubism?', 'An abstract art movement'),
(7, 'Who painted the Sistine Chapel?', 'Michelangelo'),
(7, 'What is the main medium of sculpture?', 'Clay or Stone'),
(7, 'What is Impressionism?', 'An art movement focusing on light and color'),

-- Programming Deck 2
(8, 'What is a variable in programming?', 'A named storage for data'),
(8, 'What does HTML stand for?', 'HyperText Markup Language'),
(8, 'What is the purpose of CSS?', 'Styling web pages'),
(8, 'What is Python?', 'A programming language'),
(8, 'What is recursion?', 'A function calling itself'),

-- Sports Deck 3
(9, 'What is the length of a football field?', '100 yards'),
(9, 'Who won the first FIFA World Cup?', 'Uruguay'),
(9, 'What is the national sport of Japan?', 'Sumo'),
(9, 'What is the height of a basketball hoop?', '10 feet'),
(9, 'How many players are on a soccer team?', '11');
