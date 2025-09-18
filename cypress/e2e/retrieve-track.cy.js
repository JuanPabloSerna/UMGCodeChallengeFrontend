describe('Retrieve Track (RetrievePage)', () => {
  beforeEach(() => {
    cy.visit('/retrieve')
  })

  it('should display the retrieve track form', () => {
    cy.get('input[type="text"]').should('be.visible')
    cy.contains('Get Metadata').should('be.visible')
    cy.contains('Clear').should('be.visible')
    cy.get('input[type="text"]').should('have.attr', 'required')
  })

  it('should clear form when Clear button is clicked', () => {
    // Fill form first
    cy.get('input[type="text"]').type('USRC17607839')
    cy.get('input[type="text"]').should('have.value', 'USRC17607839')
    
    // Click Clear button
    cy.contains('Clear').click()
    
    // Verify input is cleared
    cy.get('input[type="text"]').should('have.value', '')
  })
})
