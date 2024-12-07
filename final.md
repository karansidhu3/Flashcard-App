# Final Report: DROP TABLE Students
### Team Members: Ian Downing, Milan Bertolutti, Karanveer Siduh, Liam Towes-Thessian

### [Video Walkthrough](https://youtu.be/PN8m_HE0cKs)
### Final Release Branch: `Release_3`


---
## General Development

#### What did your team build? Is it complete and running? Clearly address each feature and its state.

Our team built the Flashcard Study App. We managed to complete all the required features. In our app, DeckDash, we had these core features:

| Feature                        | Status     |
|--------------------------------|------------|
| User Authentication (Login)   | Completed  |
| User Sign up                   | Completed  |
| Create Flashcard               | Completed  |
| Create Deck                    | Completed  |
| Edit Flashcard/Deck            | Completed  |
| Review Flashcards (Play mode)  | Completed  |
| Study Mode (Randomized)        | Completed  |
| Progress Tracking              | Completed  |
| Select Deck Homepage              | Completed  |
| Sharing Flashcards (Publicly & Directly) | Completed |

#### How many of your initial requirements that your team set out to deliver did you actually deliver (a checklist/table would help to summarize)? Were you able to deliver everything or are there things missing? Did your initial requirements sufficiently capture the details needed for the project?

We were able to deliver every requirement outlined in the project description. Our initial requirements sufficiently captured the details needed for the project, and in some cases went above.

| User Requirements                              | Was it Delivered? |
|------------------------------------------------|--------------------|
| Create, edit, and delete flashcards           | ✅                 |
| Organize flashcards into customizable decks.  | ✅                 |
| Switch between study modes                    | ✅                 |
| Track study progress                          | ✅                 |
| Share flashcards and decks with others        | ✅                 |
| Import and export decks using standard file formats | We decided to share decks through the share feature that uses a weak entity table in the database. Therefore replacing the need for importing and exporting. This requirement was also not explicitly listed in the project description. |

| Functional Requirements                        | Status |
|------------------------------------------------|--------|
| Provide user authentication and account management | ✅ |
| Allow users to create and customize flashcards and decks | ✅ |
| Offer a study mode with options for ordered and random review | ✅ |
| Track user progress and provide feedback       | The App can track user progress by marking as known/unknown, but it does not provide feedback yet. |
| Facilitate the sharing of flashcards and decks | ✅     |

| Non-Functional Requirements                    | Status |
|------------------------------------------------|--------|
| User-friendly                                  | ✅     |
| Responsive across different devices            | ✅     |
| Secure, ensuring users pages are protected     | ✅     |
| Maintainable, allowing for future updates and feature enhancements | ✅ |
| Efficient in terms of performance, especially during flashcard retrieval and review | ✅ |
| All features should respond in under 2 seconds | ✅     |

#### What is the architecture of the system? What are the key components? What design patterns did you use in the implementation?

The Project uses a React frontend with a Node.js backend, with a dockerized Postgres SQL relational database.

- **/db:**
  Our relational database holds a user table that has 0..* Decks which have 0..* flashcards. Sharing decks is done through a weak entity table Share Decks.

- **/frontend:**
  In our React frontend, there are all of the respective pages with some testing files that implement the UI that request posts from the backend. There is some testing in the front which uses Jest with Supertest. Tests on the frontend have only been written when methods are applied to the frontend logic.

- **/backend:**
  The backend consists of many posts and deletes that are called during operation of the frontend. The file `index.js` holds all of the posts and deletes except for the flashcard factory design pattern which is in `services/FlashcardFactory.js`.

#### What degree and level of reuse was the team able to achieve and why?

During the software construction, we aimed for as much systematic reuse as possible, trying to reuse and modularize code when possible. 

- There were some struggles with this because each SQL query we were making to the database was quite specific.
- We chose to use React in order to get the benefits of external reuse. This saved significant development time by leveraging well-tested elements that we could use for our frontend.
- The use of Jest with Supertest was beneficial as it is a reusable library. This saved us significant development time by providing pre-built functionalities like test runners and mocking. Mocking was used extensively to test our SQL queries.

#### How many tasks are left in the backlog?

We managed to fully complete the project backlog in time for milestone 6. 
- Although Track user progress and provide feedback was missed when creating the backlog

---

## CI/CD:
#### What testing strategies did you implement? Comment on their degree of automation and the tools used. Would you (as a team) deal with testing differently in the future? Make sure to ensure that your testing report is updated to reflect what's actually been done.

We implemented manual testing and automated testing using Jest and Supertest.

**Strategies**
- **Test Driven Development**  
  Whenever implementing a new feature, ensure to write our test cases first to make sure that we understood the requirements of the feature/Query we were making before diving into coding. 
- **Black Box Testing**  
  Wrote tests for individual posts and deletes that are on the backend.  
  For this, we used Jest with Supertest.
  - Ensuring boundary value testing
  - When writing tests, we made sure to catch all the cases without ‘repeating’ ourselves by writing obsolete tests.  
  - The main testing format for the backend we used was:
    - Passing with valid parameters
    - Failing with invalid parameters
    - Ensuring that errors are handled properly  
  - For the frontend, making sure validation methods were robust.
- **White Box Testing**  
  This is something we chose not to add to our project due to scope. Since we were not deploying the project, things like coverage seemed a little extra.  

#### Insert Testing plan from Milestone 6 when converting to markdown.


### How did your branching workflow work for the team? Were you successful in properly reviewing the code before merging as a team?

Branching workflow worked very effectively for our team. By making sure that we committed and made pull requests often, people's branches were never too behind, causing minimal merge conflicts and ensuring everyone understood and was involved with the code. Another benefit of the branching workflow was how it incorporated perfectly with the Kanban board. Having the ability to know what everyone was working on, check in on their progress, and provide advice when not together in person was critical for early development.

As for code review, it was quite difficult to start off with due to the learning curve that came with using React and Node. After everyone caught on and understood the language, the code review was very useful. Errors that were overlooked by the developer of a feature were caught during reviews. These corrections were also critical in keeping development focused on functional, shippable features, which was one of our major goals during the development process.


### How would your project be deployed? Is it Docker ready and tested? Provide a brief description of the level of Dockerization you have implemented and what would be required to deploy.

Our project is designed with Docker readiness in mind and has been partially dockerized. The level of Dockerization we've implemented includes containerizing the backend, frontend, and database services to ensure consistent environments across development and production. Each component runs in its own Docker container, allowing for easier management and deployment. Docker Compose has been used to orchestrate these containers, simplifying the setup process.

**With the level of Dockerization that we have at the moment, the following steps would be required:**
1. **Build the Docker Images:**  
   Use the provided Dockerfiles to build images for the backend, frontend, and database.
2. **Run Docker Compose:**  
   Start all containers with a single `docker-compose up` command, which will initialize and link the services.
3. **Exposed Ports:**  
   Docker files ensure the appropriate ports are exposed to allow access to the frontend and backend services.
4. **Test the Deployment:**  
   Conduct a round of testing on the deployed containers to verify functionality, including the database connection and API integration.

While the project is dockerized, full deployment testing would need to be done to ensure the setup works seamlessly in production.

---

## Team Reflections:
#### How did your project management work for the team? What was the hardest thing and what would you do the same/differently the next time you plan to complete a project like this?

Management was a collaborative group effort. During the specification and analysis phase, Liam and Karanveer took the lead in understanding the problem, setting up the requirements, and defining the use cases.  
In the early stages of development, Karanveer stepped up to a directing role, ensuring that everyone found good resources to learn the required programming languages while he established the core of the frontend and handled dockerization. This phase proved to be the most challenging due to the steep learning curve, which caused us to fall behind on the first milestone. In hindsight, we would address this by selecting technologies that the team is more familiar with to streamline the process.  
As development progressed, everyone contributed equally to coding and feature implementation. This balance allowed Milan to leverage his comprehensive understanding of the project for effective task delegation, creating the Dashboard.md files, managing milestones, and handling a significant portion of communication with the TAs.  
Toward the end of development, Ian took the project under his wing, ensuring that all requirements were met before the final milestone. He also implemented the factory pattern for the flashcard system to meet the project specifications effectively.  
One aspect we would retain is the way everyone enthusiastically stepped up to do extra work to achieve 100% on the project. This level of commitment is rare in group university projects and was something we deeply appreciated.


#### Do you feel that your initial requirements were sufficiently detailed for this project? Which requirements did you miss or overlook?

We feel that the initial requirements were sufficiently detailed for the project, although we could have taken the time to understand design patterns. When first working on milestone 3, we had not yet learned about design patterns, which made some of the specifications confusing and caused us to miss the iterator and singleton patterns in our software construction.  
Another requirement that we overlooked was providing feedback to the user depending on what cards they had learned.


#### What did you miss in your initial planning for the project (beyond just the requirements)?

During the initial planning of the project, we overlooked two critical components: the project's required velocity and the testing plan.  
We underestimated the pace the project needed to maintain, especially after the reading break. This became evident by milestone 4, leaving us behind schedule and causing some panic. As a result, we had to put in extra effort later during an already busy period of the semester, which added unnecessary stress.  
Additionally, we failed to properly outline a testing plan. We didn’t specify the testing library we would use or plan the logic and test cases in advance. This oversight created significant challenges later, as it became a roadblock to effectively implementing our test-first development model and required extra work to resolve.


#### What process did you use (i.e., Scrum, Kanban), how was it managed, and what was observed?

We used a Kanban board as our primary workflow, where we focused on tackling one issue at a time. This approach helped us maintain a solid branching workflow, kept everyone aligned, and ensured active involvement across the team.  
Although we were primarily using Kanban, the milestones introduced elements of the Scrum workflow. The key practice we adopted from Scrum was the weekly cycles tied to these milestones, as they encouraged everyone to attend regular meetings. During these meetings, we discussed the velocity we wanted to maintain for the coming week and clearly outlined what needed to be accomplished.


#### As a team, did you encounter issues with different team members developing with different IDEs? In the future, would the team change anything in regard to the uniformity of development environments?

No, we did not encounter any issues with different team members using different IDEs because we all used VS Code. This consistency made peer programming much easier and ensured there were no strange code settings being committed to Git. It also simplified setup and learning, as no one faced compatibility issues or IDE-specific challenges.  
While one developer was working on a Mac, this did not pose any problems for the team, as VS Code maintained a uniform experience across operating systems. In the future, we wouldn’t change anything regarding the uniformity of our development environments, as this approach worked well for us.


#### If you were to estimate the efforts required for this project again, what would you consider? 

We initially thought testing would be straightforward, but it turned out to be much more complex. Setting up the testing environment, writing comprehensive test cases, and debugging took significantly more time than we expected, especially since we underestimated the effort needed to cover edge cases.  
Similarly, we thought the backend setup would be quick, but understanding the framework intricacies and properly configuring the environment took longer than anticipated. These challenges taught us the importance of factoring in extra time for unfamiliar tasks and building more detailed plans for future projects.


#### What did your team do that you feel is unique or something that the team is especially proud of? 

One aspect we are particularly proud of is how focused and isolated our pull requests (PRs) were throughout the project. Each PR and feature was accompanied by its own tests, and we were able to integrate them smoothly into the development branch. As the project progressed, this process became more streamlined, significantly improving our team’s efficiency. It was a great learning experience, as we gained a deeper understanding of maintaining a clean codebase and improving collaboration through disciplined version control practices.

#### How did AI impact the development of the project? 

AI played a significant role in the development of this project. It helped us quickly grasp new concepts we were encountering for the first time, providing clarity on topics that could have otherwise been challenging. Additionally, AI assisted in generating solid test cases for each feature, ensuring thorough coverage and minimizing the risk of overlooking important scenarios. Overall, AI greatly accelerated our learning process, allowing us to avoid getting stuck for extended periods and stay focused on moving the project forward.
