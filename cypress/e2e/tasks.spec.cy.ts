// cypress/integration/tasks.spec.js
describe('Task Management', () => {
  beforeEach(() => {
    // Visit the tasks
    cy.visit(`${process.env.CYPRESS_BASE_URL}/tasks`)
    cy.login()
  })

  it('Creating and Updating Tasks', () => {
    // Add a new task in the first window
    const randomTaskName = `Task ${Math.floor(Math.random() * 1000)}`
    cy.get('button').contains('add task').click()
    cy.get('input[name="title"]').type(randomTaskName)
    cy.get('button').contains('Save').click()

    // Update the task in the first window
    cy.contains(randomTaskName).dblclick()
    const updatedTaskName = `Updated Task ${Math.floor(Math.random() * 1000)}`
    cy.get('input[name="title"]').clear().type(updatedTaskName)
    cy.get('button').contains('Save').click()
  })
})

describe('WebSocket Real-Time Updates', () => {
  let updatedTaskName = `Updated Task ${Math.floor(Math.random() * 1000)}`

  beforeEach(() => {
    // Log in and visit the tasks page
    cy.visit(`${process.env.CYPRESS_BASE_URL}/tasks`)
    cy.login()
  })

  it('should update the UI when a task is updated via WebSocket',() => {
    // Add a new task in the first window
    cy.request('/api/user').then(response => {
      const user = response
      // // Simulate a WebSocket message from another client
      cy.sendSocketMessage(user?.body?.teamId, {
        id: 'task-1',
        title: updatedTaskName,
        status: 'IN PROGRESS'
      })

      // Verify that the UI updates to reflect the new task state
      cy.contains(updatedTaskName).should('exist')
    })
  })
})
