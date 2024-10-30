# Project Description

## Title: Flashcard Study App

### Description

The Flashcard Study App is a user-friendly platform designed to enhance the studying experience through the creation, organization, and review of flashcards. Users can create text-based flashcards, categorize them into decks, and engage in study sessions that either follow a specific order or present the cards randomly. The app enables progress tracking and sharing functionalities, fostering collaboration and community learning.

### Key Features

- **User Account Management**: Users can create accounts to save their flashcards and decks.
- **Flashcard Creation**: Users can create flashcards by adding questions and answers.
- **Deck Management**: Flashcards can be organized into decks based on subjects or topics.
- **Study Mode**: A dedicated mode to review flashcards in order or randomly.
- **Progress Tracking**: Users can mark flashcards as known or unknown to monitor their learning progress.
- **Sharing Options**: Users can share individual flashcards or entire decks with others or make them publicly available.
- **File Export/Import**: Ability to share decks via simple file formats (e.g., CSV, JSON).
- **Design Patterns**: Implementation of the Factory Pattern for creating different flashcard types, the Iterator Pattern for efficient navigation, and the Singleton Pattern for managing user settings.

---

# Requirements Analysis

## User Requirements

Users will be able to:

- Create, edit, and delete flashcards.
- Organize flashcards into customizable decks.
- Switch between study modes (ordered and randomized).
- Track study progress by marking flashcards as known or unknown.
- Share flashcards and decks with others.
- Import and export decks using standard file formats.

## Functional Requirements

The system will:

- Provide user authentication and account management.
- Allow users to create and customize flashcards and decks.
- Offer a study mode with options for ordered and random review.
- Track user progress and provide feedback.
- Facilitate sharing and importing/exporting of flashcards and decks.
- Implement design patterns for creating different types of flashcards and managing sessions.

## Non-Functional Requirements

The system should be:

- **User-friendly and intuitive**.
- **Responsive** across different devices (mobile and desktop).
- **Secure**, ensuring user data is protected.
- **Maintainable**, allowing for future updates and feature enhancements.
- **Efficient** in terms of performance, especially during flashcard retrieval and review.
- Should **respond in under 2 seconds**.

## Assumptions and Constraints

### Assumptions

- Users have access to the internet to use the online platform.
- Users are familiar with basic study techniques involving flashcards.
- The application will focus on text-based flashcards initially, with potential for multimedia in the future.

### Constraints

- The project scope will not include advanced features such as audio or video flashcards initially.
- The application will be built using a specific tech stack (e.g., React for frontend, Node.js for backend).

## Proto-Personas

### Student Alex

- **Age**: 20
- **Background**: University student.
- **Goals**: Wants to prepare for exams efficiently using flashcards, in a quick and simple fashion.
- **Challenges**: Needs to manage time effectively and track study progress.

### High School Teacher Jamie

- **Age**: 35
- **Background**: Teaches mathematics and wants to use flashcards in the classroom.
- **Goals**: Create decks for different topics and share them with students.
- **Challenges**: Needs a simple way to organize and distribute materials.

---

# Use Cases

## Use Case 1: Create Account

- **Primary Actor**: User
- **Secondary Actor**: Login System
- **Description**: New users can create an account to access personalized features such as saving decks and tracking progress.
- **Pre-condition**: User is on the sign-up page.
- **Post-condition**: User account is created, and the user is logged in.
- **Main Scenario**:
  1. User opens the app and selects "Create Account."
  2. System prompts for email, username, and password.
  3. User enters the required information and submits.
  4. Login System verifies the information.
  5. System creates the account and logs the user in.
  6. User is redirected to the main menu.
- **Extensions**:
  - **3a. Invalid Input**: System displays an error (e.g., weak password) and prompts the user to correct it.
  - **3b. Email Already Registered**: System alerts the user and suggests logging in.

---

## Use Case 2: Log In

- **Primary Actor**: User
- **Secondary Actor**: Login System
- **Description**: Users log into the app to access personalized study data, saved decks, and progress tracking.
- **Pre-condition**: User has a registered account.
- **Post-condition**: User is logged in and redirected to the main menu.
- **Main Scenario**:
  1. User opens the app and selects "Log In."
  2. System prompts for username and password.
  3. User enters credentials.
  4. Login System authenticates the credentials.
  5. System logs the user in.
  6. User is redirected to the main menu with personalized content.
- **Extensions**:
  - **3a. Incorrect Credentials**: System displays an error message and prompts the user to re-enter credentials.
  - **3b. Forgot Password**: User selects "Forgot Password" and follows the recovery process.

---

## Use Case 3: Log Out

- **Primary Actor**: User
- **Secondary Actor**: Login System
- **Description**: Logged-in users can log out, securing their account and data.
- **Pre-condition**: User is logged in.
- **Post-condition**: User is logged out and returned to the login screen.
- **Main Scenario**:
  1. User selects "Log Out" from the main menu.
  2. System prompts for confirmation.
  3. User confirms log out.
  4. Login System terminates the session.
  5. System logs the user out and redirects to the login screen.
- **Extensions**:
  - **2a. User Cancels Log Out**: User chooses to cancel; the system keeps them logged in.

---

## Use Case 4: Create Deck

- **Primary Actor**: User
- **Description**: Users can create a new deck to organize flashcards by subject or topic.
- **Pre-condition**: User must be logged in.
- **Post-condition**: A new deck is created and available for adding flashcards.
- **Main Scenario**:
  1. User selects "Create Deck" option.
  2. System prompts the user to input a deck name.
  3. User enters a name for the deck.
  4. System saves the new deck and navigates the user into the newly created deck.
  5. Confirmation message appears indicating successful creation.
- **Extensions**:
  - **2a. Invalid or Duplicate Deck Name**: System displays an error message and prompts the user to enter a unique and valid name.
  - **3a. User Cancels Operation**: User cancels deck creation; no deck is saved.

---

## Use Case 5: Select Deck

- **Primary Actor**: User
- **Description**: User selects a deck to view, edit, add flashcards, or use in study mode.
- **Pre-condition**: User is logged in and has created or has access to at least one deck.
- **Post-condition**: The selected deck is loaded, and the user can perform actions within it.
- **Main Scenario**:
  1. User navigates to the "Decks" page.
  2. System displays a list of available decks.
  3. User scrolls through the list and selects a deck.
  4. System loads the selected deck, displaying available flashcards and options (e.g., view, add, edit, or study).
- **Extensions**:
  - **2a. No Decks Available**: System displays a message indicating no decks are available and provides an option to create a new deck.
  - **3a. Deck Not Found**: If a deck was deleted or is unavailable, the system shows an error and updates the list accordingly.

---

## Use Case 6: Delete Deck

- **Primary Actor**: User
- **Description**: Users can delete a deck along with all its flashcards.
- **Pre-condition**: User must be logged in and have at least one deck created.
- **Post-condition**: Selected deck and all contained flashcards are deleted.
- **Main Scenario**:
  1. User navigates to a specific deck.
  2. User selects "Delete Deck."
  3. System prompts the user to confirm the deletion.
  4. User confirms deletion.
  5. System deletes the deck and its contents.
  6. Confirmation message appears indicating successful deletion.
- **Extensions**:
  - **3a. User Cancels Deletion**: User cancels deletion; the deck remains unchanged.

---

## Use Case 7: Create Flashcard

- **Primary Actor**: User
- **Description**: Users can create flashcards by inputting a question and answer, but only when they are within a specific deck.
- **Pre-condition**: User must be logged in and currently inside a selected deck.
- **Post-condition**: Flashcard is saved within the current deck.
- **Main Scenario**:
  1. User navigates to a specific deck.
  2. User selects "Create Flashcard."
  3. System prompts the user to input a question and answer.
  4. User enters the question and answer details.
  5. System saves the flashcard to the current deck.
  6. A confirmation message appears indicating successful creation.
- **Extensions**:
  - **3a. User Cancels Operation**: User cancels creation; no flashcard is created.
  - **4a. Error Saving Flashcard**: System shows an error message if saving fails and suggests trying again.
  - **5a. Missing Information**: If the user does not input a question or answer, the system prompts the user to complete all fields.

---

## Use Case 8: Edit Flashcard

- **Primary Actor**: User
- **Description**: Users can modify the question or answer of an existing flashcard within a deck.
- **Pre-condition**: User must be logged in, inside a deck, and have at least one flashcard in it.
- **Post-condition**: Flashcard is updated with the new information.
- **Main Scenario**:
  1. User navigates to a specific deck.
  2. User selects a flashcard and chooses "Edit Flashcard."
  3. System displays the current question and answer fields.
  4. User modifies the content and confirms changes.
  5. System updates the flashcard with the new information.
  6. Confirmation message appears indicating a successful edit.
- **Extensions**:
  - **4a. User Cancels Edit**: User cancels editing; the flashcard remains unchanged.
  - **5a. Error Saving Changes**: System shows an error message if saving fails.

---

## Use Case 9: Delete Flashcard

- **Primary Actor**: User
- **Description**: Users can delete individual flashcards from within a deck.
- **Pre-condition**: User must be logged in, inside a deck, and have at least one flashcard in it.
- **Post-condition**: Selected flashcard is deleted from the deck.
- **Main Scenario**:
  1. User navigates to a specific deck.
  2. User selects a flashcard and chooses "Delete Flashcard."
  3. System prompts the user to confirm deletion.
  4. User confirms deletion.
  5. System deletes the flashcard from the deck.
  6. Confirmation message appears indicating successful deletion.
- **Extensions**:
  - **3a. User Cancels Deletion**: User cancels deletion; the flashcard remains in the deck.

---

## Use Case 10: Study Mode

- **Primary Actor**: User
- **Description**: Users can review flashcards within a deck in either ordered or randomized mode.
- **Pre-condition**: User must be logged in, have selected a deck with flashcards, and be ready to study.
- **Post-condition**: Study mode is set, and the user begins reviewing flashcards in the selected mode.
- **Main Scenario**:
  1. User navigates to a specific deck.
  2. User selects "Study Mode."
  3. System displays mode options (ordered or randomized).
  4. User selects a preferred mode.
  5. System applies the selected mode and begins the flashcard review.
- **Extensions**:
  - **2a. No Flashcards in Deck**: System displays a message indicating the deck is empty and suggests adding flashcards.
  - **4a. User Cancels Action**: User cancels; the previous study mode is retained.

---

## Use Case 11: Mark Flashcard as Known/Unknown

- **Primary Actor**: User
- **Description**: Users can mark a flashcard as known or unknown to track progress during study sessions.
- **Pre-condition**: User must be logged in and in study mode within a deck.
- **Post-condition**: Flashcard is updated with the known/unknown status.
- **Main Scenario**:
  1. User reviews a flashcard in study mode.
  2. User chooses to mark it as "Known" or "Unknown."
  3. System records the user's choice.
  4. Confirmation message appears indicating the status update.
- **Extensions**:
  - **2a. User Cancels Marking**: User cancels the action; the flashcard's status remains unchanged.

---

## Use Case 12: Share Decks via File Format

- **Primary Actor**: User
- **Description**: Users can export decks as files to share with others.
- **Pre-condition**: User must be logged in and have at least one deck created.
- **Post-condition**: Deck is exported as a file in a supported format.
- **Main Scenario**:
  1. User selects a deck and chooses "Export Deck."
  2. System prompts the user to choose a file format (e.g., CSV, JSON).
  3. User selects a format and initiates the export.
  4. System generates and saves the file.
  5. Confirmation message appears indicating a successful export.
- **Extensions**:
  - **2a. Unsupported File Format**: System displays an error message and prompts the user to select a valid format.
  - **4a. File Generation Error**: System shows an error message if the export fails.

---

# Design Patterns

- **Factory Pattern**: Used for creating different types of flashcards (e.g., text-based, image-based in future expansions) within a deck.
- **Iterator Pattern**: Facilitates efficient navigation through flashcards within a deck, especially during study sessions.
- **Singleton Pattern**: Manages user settings or session data, ensuring consistent access throughout the application.

---

# Additional Notes

- **Tech Stack**: The application will be built using a specific tech stack, such as React for the frontend and Node.js for the backend.
- **Performance**: The system should respond in under 2 seconds for actions like loading decks and flashcards.
- **Security**: User data must be securely stored and transmitted, with proper authentication and authorization mechanisms in place.

---
