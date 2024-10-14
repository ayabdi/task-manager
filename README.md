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

- **Clean Architecture**: Follows **Clean Architecture** principles, separating the codebase into distinct layers (Domain, Application, Infrastructure, and Interface Adapters) to enhance maintainability, testability, and scalability.

- **Testing**: Includes comprehensive unit tests for key backend services using **Jest** and end-to-end tests for the front end using **Cypress**, ensuring code reliability and functionality.

- **CI/CD & Docker**: Configures thoughtful CI/CD pipelines for automated testing and deployment, ensuring consistent quality and quick iteration cycles. Integrates **Docker** for easy deployment across different environments.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Programming Language**: TypeScript
- **Real-Time Communication**: [Socket.io](https://socket.io/)
- **Authentication**: [NextAuth](https://next-auth.js.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Database**: [Prisma ORM](https://www.prisma.io/) (connected to PostgreSQL)
- **Testing Frameworks**: [Jest](https://jestjs.io/) and [Cypress](https://www.cypress.io/)
- **CI/CD Pipeline**: Configured with GitHub Actions
- **Containerization**: [Docker](https://www.docker.com/)
- **AI Tooling**: [Cursor IDE](https://www.cursor.com), [OpenAI](https://openai.com)

## Project Structure

The project follows **Clean Architecture** principles, organized into the following layers:

1. ### **Domain Layer**

   - **Purpose**: Contains the business logic and domain entities that represent the core concepts of the application.
   - **Content**:
     - **Entities**: Core business objects like `User`, `Task`, `Team`.
     - **Repositories**: Interface definitions for data access, e.g., `IUserRepository`, `ITaskRepository`, `ITeamRepository`.


2. ### **Application Layer**

   - **Purpose**: Includes use cases that orchestrate the business logic, acting as the bridge between domain entities and external layers.
   - **Content**:
     - **Use Cases**: Classes or functions that execute specific actions like `CreateTaskUseCase`, `UpdateTaskUseCase`.
     - **Services**: Application-specific services that implement business rules.

3. ### **Infrastructure Layer**

   - **Purpose**: Implements data access, third-party services, and other infrastructure concerns.
   - **Content**:
     - **Repositories**: Implementations of data access layers using Prisma ORM, e.g., `PrismaTaskRepository`, `PrismaUserRepository`.
     - **Database Client**: Prisma client setup for interacting with the database.
     - **Third-Party Integrations**: Configuration for external services like authentication providers.

4. ### **Interface Adapters Layer**

   - **Purpose**: Contains controllers and presenters that handle communication between layers.
   - **Content**:
     - **Controllers**: Handle HTTP requests, invoke use cases, and return responses.
     - **Presenters**: Format and present data to the user or other systems.
     - **Socket Providers**: Manage WebSocket connections and event handling.

5. ### **Frameworks and Drivers Layer**

   - **Purpose**: External tools and frameworks like Next.js and Express that drive the application.
   - **Content**:
     - **Pages and Components**: Next.js pages and React components for the UI.
     - **API Routes**: Next.js API routes for handling server-side logic.
     - **Configuration Files**: Webpack, TypeScript configs, and environment variables.

## Folder Structure

```
├── src
│ ├── app
│ │ ├── api
│ │ │ └── auth
│ │ │ └── [...nextauth]
│ │ │ └── authOptions.ts // NextAuth configuration
│ │ ├── components // React components
│ │ ├── hooks // Custom React hooks
│ │ ├── pages // Next.js pages
│ │ ├── providers // Context providers
│ │ ├── store // Redux store setup
│ │ └── types // Custom TypeScript types
│ ├── application
│ │ ├── useCases // Application use cases
│ │ └── services // Business logic services
│ ├── domain
│ │ ├── entities // Domain entities (User, Task, Team)
│ │ ├── repositories // Repository interfaces
│ │ 
│ ├── infrastructure
│ │ ├── prisma
│ │ │ ├── client.ts // Prisma client setup
│ │ │ └── schema.prisma // Prisma schema
│ │ └── repositories // Data access implementations
│ ├── interfaces
│ │ └── controllers // Controllers for API endpoints
│ └── server.ts // Server entry point with Socket.io setup
├── cypress // Cypress end-to-end tests
├── prisma // Prisma migrations
├── public // Static assets
├── .github
│ └── workflows
│ └── ci.yml // GitHub Actions CI/CD pipeline
├── Dockerfile // Docker configuration
├── package.json // NPM scripts and dependencies
├── tsconfig.json // TypeScript configuration
└── README.md // Project documentation
```

## Live Collaboration Details

### **Overview**

The real-time collaboration feature allows users to work together on tasks simultaneously. This is achieved through the use of **Socket.io**, which enables real-time, bidirectional communication between clients and the server.

### **How It Works**

1. **User Registration and Team Assignment**

   - **Sign Up**: Users register and are authenticated using **NextAuth**.
   - **Team Creation**: Upon registration or through the application, users can create a new team or join an existing one.
   - **Team Assignment**: Each user is associated with a `teamId` that represents the team they belong to.

2. **Connecting to Socket.io Server**

   - **Socket Initialization**: When a user accesses the tasks page, a Socket.io client is initialized.
   - **Joining a Room**: The client emits a `join_room` event with their `teamId`.

     ```javascript
     // src/app/providers/socket-provider.tsx
     socket.emit("join_room", teamId);
     ```

   - **Server-Side Handling**: The server listens for `join_room` events and adds the socket to the corresponding room based on `teamId`.

     ```javascript
     // src/server.js
     socket.on("join_room", (room) => {
       socket.join(room);
     });
     ```

3. **Real-Time Events**

   - **Task Updates**: When a task is added, updated, or deleted, the client emits an event to the server with the task data and `teamId`.

     ```javascript
     socket.emit("update_task", { room: teamId, task: updatedTask });
     ```

   - **Server Broadcasting**: The server receives the event and broadcasts it to all other clients in the same room (i.e., team members).

     ```javascript
     socket.to(data.room).emit("receive_task_update", data);
     ```

   - **Client Handling**: Other clients in the room listen for these events and update their local state accordingly.

     ```javascript
     // src/app/providers/socket-provider.tsx
     socket.on("receive_task_update", handleTaskUpdate);
     ```

### **Joining Teams and Rooms**

- **Team Identifier**: The `teamId` serves as a unique identifier for a team and is used as the room name in Socket.io.
- **Room Mechanics**: Rooms allow grouping of sockets for event broadcasting.
- **Dynamic Rooms**: Users can switch teams, and the application updates the `teamId`, re-establishing the socket connection to the new room.

### **Socket Provider**

- **Purpose**: Manages the socket connection and provides context to the application.
- **Implementation**:

  - **Connection Management**: Establishes and maintains the socket connection.
  - **Event Listeners**: Registers handlers for incoming socket events.
  - **Cleanup**: Ensures sockets are properly disconnected to prevent memory leaks.

- **Code Snippet**:

  ```javascript
  // src/app/providers/socket-provider.tsx
  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("join_room", teamId);
      setIsConnected(true);
    });

    // Handle disconnection
    return () => {
      newSocket.disconnect();
    };
  }, [teamId]);
  ```

### **Custom Hooks and Event Emitters**

- **useSocketEvents Hook**: Encapsulates logic for emitting events to the server.

  ```javascript
  // src/app/hooks/useSocketEvents.tsx
  const emitTaskUpdate = async (task) => {
    const result = await dispatch(updateTaskAsync(task)).unwrap();
    if (result) {
      socket.emit("update_task", { room: teamId, task: result });
    }
  };
  ```

- **Event Flow**:

  1. **User Action**: User updates a task in the UI.
  2. **State Update**: Application dispatches Redux action to update state and database.
  3. **Event Emission**: After successful update, emits event through Socket.io.
  4. **Server Broadcast**: Server receives event and broadcasts to room members.
  5. **Clients Update**: Other clients receive event and update their local state.

### **Server-Side Event Handling**

- **Connection Event**: When a client connects, the server logs the connection and sets up listeners.

  ```javascript
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    // Event listeners for 'join_room', 'update_task', etc.
  });
  ```

- **Task Events**: The server handles task-related events and broadcasts them to the appropriate room.

  ```javascript
  socket.on("update_task", (data) => {
    socket.to(data.room).emit("receive_task_update", data);
  });
  ```

### **Client-Side Event Handling**

- **Receiving Updates**: Clients listen for events and dispatch actions to update the Redux store.

  ```javascript
  socket.on("receive_task_update", (data) => {
    dispatch(updateTask({ id: data.task.id, body: data.task }));
  });
  ```

### **Ensuring Consistency**

- **Optimistic Updates**: Local state is updated immediately for a responsive UI.
- **Conflict Resolution**: The application handles potential conflicts by ensuring the latest updates are applied based on timestamps or versioning (implement as needed).

## Setup Instructions

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** or **Yarn**
- **Docker** (optional, for containerization)
- A **PostgreSQL** database instance

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ayabdi/task-manager.git
   cd task-manager
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root directory and add your environment variables. Refer to `.env.example` for the required variables, such as database connection strings and authentication secrets.

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/tasks_db
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Set Up the Database**

   - Ensure your PostgreSQL database is running and accessible.
   - Update the database connection settings in `prisma/schema.prisma` if necessary.
   - Run Prisma migrations to set up the database schema:

     ```bash
     npx prisma migrate dev --name init
     ```

   - Generate the Prisma client:

     ```bash
     npx prisma generate
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

  This will execute the Cypress tests for end-to-end testing.

### Deployment

- **Docker Deployment**

  Build and run the Docker container:

  ```bash
  docker build -t task-manager .
  docker run -p 3000:3000 task-manager
  ```

- **CI/CD Pipeline**

  The project includes CI/CD configuration using GitHub Actions, which automates testing and deployment processes.

## Usage

### **User Registration and Authentication**

- **Sign Up/Login**: Users can register and log in securely. Authentication is managed through **NextAuth**, with protected routes and API endpoints.
- **Session Management**: User sessions are handled securely, with session data accessible throughout the application.

### **Team Collaboration**

- **Team Creation**: Users can create new teams or join existing ones.
- **Team Assignment**: Each user is associated with a `teamId`. This ID is used to group users in the same team for collaborative features.
- **Joining Teams**: Via the UI, users can accept invitations or request to join teams, depending on your implementation.

### **Task Management**

- **Create Tasks**: Users can create new tasks, providing a title, description, and status.
- **Update Tasks**: Tasks can be edited and moved between statuses (e.g., backlog, in progress, completed).
- **Delete Tasks**: Users can remove tasks as needed.
- **Real-Time Updates**: Changes to tasks are broadcasted to all team members in real-time using Socket.io.

### **Localization**

- **Language Support**: Switch between **Arabic** and **English** using the language selector in the UI.
- **Content Localization**: All UI elements and content are localized accordingly.

### **User Interface and Animations**

- **Intuitive Design**: The UI is designed with usability in mind, featuring intuitive navigation and controls.
- **Visual Enhancements**: Smooth animations enhance the user experience without compromising performance.

## Testing and Quality Assurance

### **Unit Testing**

- **Jest**: Used for unit testing backend services and use cases.
- **Coverage**: Tests cover key backend functionalities and edge cases to ensure reliability.

### **End-to-End Testing**

- **Cypress**: Used for E2E testing, simulating user interactions and verifying application flows.
- **Scenarios**: Tests common user scenarios, including task creation, updates, and real-time collaboration features.

### **Code Quality**

- **ESLint and Prettier**: Used to maintain code consistency and style.
- **TypeScript**: Enhances code quality with static typing and helps catch errors during development.

## Conclusion

This project demonstrates the ability to build a complex, full-stack application incorporating modern technologies and best practices. It showcases skills in:

- **Architecting Scalable Applications**: Using **Clean Architecture** to create maintainable and testable codebases.
- **Real-Time Features**: Developing real-time collaboration tools with **Socket.io**.
- **Secure Authentication**: Implementing authentication flows with **NextAuth**.
- **State Management**: Managing state efficiently with **Redux Toolkit**.
- **Multilingual Experiences**: Providing a multilingual user experience in Arabic and English.
- **Comprehensive Testing**: Writing tests with **Jest** and **Cypress** for quality assurance.
- **CI/CD Pipelines**: Configuring automated testing and deployment pipelines with GitHub Actions.
- **Code Quality**: Ensuring readability and adherence to best practices.

---

Thank you for reviewing this project. Looking forward to hearing back!