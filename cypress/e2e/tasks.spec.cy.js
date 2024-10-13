// cypress/integration/tasks.spec.js
describe('Task Management', () => {
  beforeEach(() => {
    // Visit the task management page
    cy.visit('http://localhost:3000/tasks')

    cy.login()
  })

  it('Creating and Updating Tasks', () => {
    // Add a new task in the first window
    const randomTaskName = `Task ${Math.floor(Math.random() * 1000)}`;
    cy.get('button').contains('add task').click()
    cy.get('input[name="title"]').type(randomTaskName)
    cy.get('button').contains('Save').click()

    // Update the task in the first window
    cy.contains(randomTaskName).dblclick()
    const updatedTaskName = `Updated Task ${Math.floor(Math.random() * 1000)}`;
    cy.get('input[name="title"]').clear().type(updatedTaskName)
    cy.get('button').contains('Save').click()
  })
})


describe('WebSocket Real-Time Updates', () => {
  beforeEach(() => {
    // Log in and visit the tasks page
    cy.login(); // Assume you have a custom command for logging in
  });

  it('should update the UI when a task is updated via WebSocket', () => {
    // Simulate a WebSocket message from another client
    cy.task('sendWebSocketMessage', {
      roomId: 'test-room',
      message: { id: 'task-1', title: 'Updated Task', status: 'IN PROGRESS' },
    });

    // Verify that the UI updates to reflect the new task state
    cy.contains('Updated Task').should('exist');
    cy.contains('IN PROGRESS').should('exist');
  });
});
