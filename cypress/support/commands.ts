/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', () => {
    cy.url().then((url) => {
      if (url.includes('/login')) {
        cy.get('input[name="email"]').clear().type('abdulrahmanabdi98@gmail.com');
        cy.get('input[name="password"]').clear().type('THEgame005###');
  
        // Submit the login form
        cy.get('button[type="submit"]').click();
  
        // Verify that the user is redirected to the tasks page
        cy.url().should('include', '/tasks');
  
        // Optionally, check for a specific element on the tasks page to confirm login
        cy.contains('Tasks').should('be.visible');
      } else {
        cy.log('User is already logged in, proceeding to tasks page.');
      }
    });
  });