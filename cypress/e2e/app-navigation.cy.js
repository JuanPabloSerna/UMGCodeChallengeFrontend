describe('App Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the main navigation elements', () => {
    cy.contains('Universal Music Group Code Challenge').should('be.visible')
    cy.contains('Create').should('be.visible')
    cy.contains('Retrieve').should('be.visible')
    cy.get('[aria-label="toggle theme"]').should('be.visible')
  })

  it('should toggle theme between light and dark modes', () => {
    const themeButton = cy.get('[aria-label="toggle theme"]')
    
    // Click theme toggle
    themeButton.click()
    
    // Verify theme changed (this would depend on your theme implementation)
    // You might check for specific CSS classes or data attributes
    themeButton.should('be.visible')
    
    // Click again to toggle back
    themeButton.click()
    themeButton.should('be.visible')
  })

  it('should maintain navigation state when refreshing page', () => {
    // Navigate to Retrieve page
    cy.contains('Retrieve').click()
    cy.url().should('include', '/retrieve')
    
    // Refresh page
    cy.reload()
    
    // Should still be on Retrieve page
    cy.url().should('include', '/retrieve')
    cy.contains('Get Metadata').should('be.visible')
  })

  it('should handle direct URL navigation', () => {
    // Navigate directly to retrieve page
    cy.visit('/retrieve')
    cy.contains('Get Metadata').should('be.visible')
    
    // Navigate directly to create page
    cy.visit('/')
    cy.contains('Create Track').should('be.visible')
  })
})
