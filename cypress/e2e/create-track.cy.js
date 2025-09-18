describe('Create Track (SearchPage)', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the create track form', () => {
    cy.get('input[type="text"]').should('be.visible')
    cy.contains('Create Track').should('be.visible')
    cy.contains('Clear').should('be.visible')
    cy.get('input[type="text"]').should('have.attr', 'required')
  })
})
