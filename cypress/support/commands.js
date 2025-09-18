// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to mock API responses
Cypress.Commands.add('mockApiResponse', (method, url, response, statusCode = 200) => {
  cy.intercept(method, url, {
    statusCode,
    body: response
  }).as(`${method.toLowerCase()}${url.replace(/[^a-zA-Z0-9]/g, '')}`)
})

// Custom command to wait for API calls
Cypress.Commands.add('waitForApiCall', (alias) => {
  cy.wait(alias)
})
