# Real-Time Collaborative Task Management Tool

## Overview

This project is a **real-time, collaborative task management tool** developed using **Next.js**. It showcases full-stack development capabilities, including scalable architecture design, front-end and back-end development, secure authentication, effective state management, localization, testing, and smooth, visually engaging UI with complex animations.

## Project Demonstration

- **Live Demo**: [Deployed Application Link](https://task-manager-production-7107.up.railway.app/) 
- **Video Walkthrough**: [Loom Video](https://www.loom.com/share/33c8ad3d774a489687d4830d4699a171?sid=e25f3bd2-3cd0-4bfe-8886-e09a58341418)


## Features

- **Real-Time Collaboration**: Utilizes **Socket.io** to provide real-time updates and communication between clients, ensuring that all users see changes instantaneously without needing to refresh.

- **Authentication**: Implements secure authentication using **NextAuth**, complete with middleware for both front-end and back-end API calls to verify requests and protect routes.

- **Localization**: Supports both **Arabic** and **English** languages, allowing users to switch between languages seamlessly, enhancing accessibility and usability for a broader audience.

- **Complex Animations**: Incorporates eye-catching, complex animations without causing memory leaks, enhancing the user experience with smooth transitions and interactions.

- **State Management**: Uses **Redux Toolkit** for efficient and scalable state management, ensuring consistent state across components and improving the application's performance.

- **Clean Architecture**: Follows **Clean Architecture** principles, separating the codebase into distinct layers (Domain, Application, Infrastructure, and Interfaces) to enhance maintainability, testability, and scalability.

- **Testing**: Includes comprehensive unit tests for key backend services using **Jest** and end-to-end tests for the front end using **Cypress**, ensuring code reliability and functionality.

- **CI/CD & Docker**: Configures thoughtful CI/CD pipelines for automated testing and deployment, ensuring consistent quality and quick iteration cycles. Integrates **Docker** for easy deployment across different environments.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Programming Language**: TypeScript
- **Real-Time Communication**: [Socket.io](https://socket.io/)
- **Authentication**: [NextAuth](https://next-auth.js.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Database**: [Prisma ORM](https://www.prisma.io/) (connected to your choice of database, e.g., PostgreSQL)
- **Testing Frameworks**: [Jest](https://jestjs.io/) and [Cypress](https://www.cypress.io/)
- **CI/CD Pipeline**: Configured with Github Actions
- **Containerization**: [Docker](https://www.docker.com/)
- **AI Tooling**: [Cursor IDE](https://www.cursor.com)  [OpenAI](https://openai.com) o1, o1-mini, gpt-4o

## Project Structure

The project follows **Clean Architecture** principles, organized into the following layers:

1. **Domain Layer**: Contains the business logic and domain entities.
2. **Application Layer**: Includes use cases that orchestrate the business logic.
3. **Infrastructure Layer**: Implements data access, third-party services, and other infrastructure concerns.
4. **Interface Adapters Layer**: Contains controllers and presenters that handle communication between layers.

## Setup Instructions

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** or **Yarn**
- **Docker** (optional, for containerization)
- A **database** instance (e.g., PostgreSQL)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ayabdi/task-manager.git
   cd your-repository
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root directory and add your environment variables. Refer to `.env.example` for the required variables, such as database connection strings and authentication secrets.

4. **Set Up the Database**

   - Ensure your database is running and accessible.
   - Update the database connection settings in `prisma/schema.prisma`.
   - Run Prisma migrations to set up the database schema:

     ```bash
     npx prisma migrate dev --name init
     ```

5. **Start the Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application should now be running at `http://localhost:3000`.

### Testing

- **Run Unit Tests**

  ```bash
  npm run test
  # or
  yarn test
  ```

- **Run End-to-End Tests**

  ```bash
  npx cypress run
  ```

  This will open the Cypress test runner where you can execute the E2E tests.

### Deployment

- **Docker Deployment**

  Build and run the Docker container:

  ```bash
  docker build -t task-manager .
  docker run -p 3000:3000 task-manager
  ```

- **CI/CD Pipeline**

  The project includes CI/CD configuration using (e.g., GitHub Actions), which automates testing and deployment processes.

## Usage

- **User Registration and Authentication**

  Users can sign up and log in securely. Authentication is managed through **NextAuth**, with protected routes and API endpoints.

- **Task Management**

  - **Create Tasks**: Users can create new tasks, providing a title, description, and status.
  - **Update Tasks**: Tasks can be edited and moved between statuses (e.g., backlog, in progress, completed).
  - **Real-Time Updates**: Any changes to tasks are broadcasted to all team members in real-time.

- **Team Collaboration**

  - Users can be assigned to teams.
  - Tasks are shared within teams, facilitating collaborative project management.

- **Localization**

  - Switch between **Arabic** and **English** using the language selector.
  - All UI elements and content are localized accordingly.

- **User Interface and Animations**

  - The UI is designed with usability in mind, featuring intuitive navigation and controls.
  - Smooth animations enhance the user experience without compromising performance.

## Testing and Quality Assurance

- **Unit Testing**

  - Backend services and use cases are tested using **Jest**.
  - Tests cover key backend functionalities and edge cases.

- **End-to-End Testing**

  - **Cypress** is used for E2E testing, simulating user interactions and verifying application flows.
  - Tests ensure that the application works correctly from the user's perspective.

- **Code Quality**

  - The codebase follows best practices and is thoroughly commented for readability.
  - **ESLint** and **Prettier** are used to maintain code consistency and style.


## Conclusion

This project demonstrates the ability to build a complex, full-stack application incorporating modern technologies and best practices. It showcases skills in:

- Architecting scalable and maintainable applications using **Clean Architecture**.
- Developing real-time features with **Socket.io**.
- Implementing secure authentication flows with **NextAuth**.
- Managing state efficiently with **Redux Toolkit**.
- Providing a multilingual user experience in arabic and englis.
- Writing comprehensive tests with **Jest** and **Cypress**.
- Configuring CI/CD pipelines for automated testing and deployment.
- Ensuring code quality and readability with clear comments and adherence to best practices.


Thank you, and looking forward to your feedback!