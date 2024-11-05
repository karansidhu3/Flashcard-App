# Test Report for DROP TABLE Students

### Project Name: Flashcard Study App   
### Date Created: 2024-11-04
### Contributors: IAN (ID), MIAN(MB), KARAN(KS), LIAM(LTT)

---

## 1. Summary

This test report summarizes the testing results for the Flashcard Study App, including functional, usability, performance, security, and compatibility testing. The goal is to validate that the app meets the specified requirements and provides a smooth, user-friendly experience.

---

## 2. Test Execution Results

### Legend:
- **Type of Test**:
  - **F**: Functional Testing
  - **U**: Usability Testing
  - **P**: Performance Testing
  - **S**: Security Testing
  - **C**: Compatibility Testing
- **Status**:  
  - **P**: Pass  
  - **F**: Fail  

| Test Case ID | Type of Test | Description                                                    | Status | Contributor(s) |
|--------------|--------------|----------------------------------------------------------------|--------|----------------|
| TC01         | F            | A user should be able to create an account with valid details  | P      | [Initials]     |
| TC02         | F            | Error message should appear when creating an account with an existing email | P      | [Initials]     |
| TC03         | F            | User should be able to log in with correct credentials         | P      | [Initials]     |
| TC04         | F            | Error message should appear for incorrect login credentials    | P      | [Initials]     |
| TC05         | F            | A logged-in user should be able to log out successfully        | P      | [Initials]     |
| TC06         | F            | User should be able to create a deck with a unique name        | P      | [Initials]     |
| TC07         | F            | Error message should appear for a duplicate deck name          | P      | [Initials]     |
| TC08         | F            | User should be able to delete a deck and its contents          | P      | [Initials]     |
| TC09         | F            | User should be able to create a flashcard within a deck        | P      | [Initials]     |
| TC10         | F            | User should be able to edit an existing flashcard              | P      | [Initials]     |
| TC11         | F            | User should be able to delete a flashcard from a deck          | P      | [Initials]     |
| TC12         | F            | Ordered study mode should display flashcards sequentially      | P      | [Initials]     |
| TC13         | F            | Randomized study mode should display flashcards in random order | P      | [Initials]     |
| TC14         | F            | User can mark a flashcard as known during study                | P      | [Initials]     |
| TC15         | F            | User can mark a flashcard as unknown during study              | P      | [Initials]     |
| TC16         | F            | User can export a deck to a TXT format                         | P      | [Initials]     |
| TC17         | F            | User can import a deck from a TXT format                       | P      | [Initials]     |
| TC18         | U            | Users can easily navigate through app sections                 | P      | [Initials]     |
| TC19         | U            | Error messages are clear and helpful                           | P      | [Initials]     |
| TC20         | P            | Decks with 20 flashcards load in under 2 seconds               | P      | [Initials]     |
| TC21         | P            | Next flashcard loads in under 2 seconds during study mode      | P      | [Initials]     |
| TC22         | S            | User passwords are securely encrypted in the database file     | P      | [Initials]     |
| TC23         | S            | Shared decks are only accessible to intended users             | P      | [Initials]     |
| TC24         | U            | New users can navigate the app without confusion               | P      | [Initials]     |

---

## 3. Summary of Results

- **Total Test Cases Executed**: 24
- **Total Passed**: 24
- **Total Failed**: 0
- **Overall Pass Rate**: 100%

---

## 4. Defects and Issues

| Defect ID | Description                                      | Severity | Status        | Contributor |
|-----------|--------------------------------------------------|----------|---------------|-------------|
| N/A       | No defects found                                 |          |               |             |

---

This test report provides a comprehensive overview of the testing results for the Flashcard Study App. All critical functionalities have passed testing, and the app is deemed ready for deployment based on current requirements.

--- 
