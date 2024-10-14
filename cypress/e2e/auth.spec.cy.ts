describe('User Signup', () => {
  beforeEach(() => {
    // Visit the signup page
    cy.visit('http://localhost:3000/signup')
  })

  it('should allow a user to sign up', () => {
    const randomEmail = `user${Math.floor(Math.random() * 1000)}@example.com`
    const password = 'Password123!'

    // Fill out the signup form
    cy.get('input[name="email"]').type(randomEmail)
    cy.get('input[name="password"]').type(password)
    cy.get('input[name="name"]').type('John Doe')
    
    // Submit the signup form
    cy.get('button').contains('Sign Up').click()

    cy.wait(5000) // Wait for 5 seconds
    cy.url().should('include', '/team')
  })

  it('should display an error for a password that is too short', () => {
    const randomEmail = `user${Math.floor(Math.random() * 1000)}@example.com`;
    const shortPassword = 'Pass1';

    // Fill out the signup form with a short password
    cy.get('input[name="email"]').type(randomEmail);
    cy.get('input[name="password"]').type(shortPassword);
    cy.get('input[name="name"]').type('John Doe')
    
    // Submit the signup form
    cy.get('button').contains('Sign Up').click();

    // Verify that an error message is displayed
    cy.contains('Password must be at least 8 characters long').should('exist');
  });
})
