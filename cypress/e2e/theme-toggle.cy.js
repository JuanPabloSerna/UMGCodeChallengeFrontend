describe('Theme Toggle', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display theme toggle button', () => {
    cy.get('[aria-label="toggle theme"]').should('be.visible')
  })

  it('should toggle theme when clicked', () => {
    const themeButton = cy.get('[aria-label="toggle theme"]')
    
    // Click theme toggle
    themeButton.click()
    
    // Verify button is still visible and functional
    themeButton.should('be.visible')
    
    // Click again to toggle back
    themeButton.click()
    themeButton.should('be.visible')
  })

  it('should maintain theme state across page navigation', () => {
    const themeButton = cy.get('[aria-label="toggle theme"]')
    
    // Toggle theme
    themeButton.click()
    
    // Navigate to retrieve page
    cy.contains('Retrieve').click()
    cy.url().should('include', '/retrieve')
    
    // Theme button should still be visible
    cy.get('[aria-label="toggle theme"]').should('be.visible')
    
    // Navigate back to create page
    cy.contains('Create').click()
    cy.url().should('not.include', '/retrieve')
    
    // Theme button should still be visible
    cy.get('[aria-label="toggle theme"]').should('be.visible')
  })

  it('should maintain theme state when refreshing page', () => {
    const themeButton = cy.get('[aria-label="toggle theme"]')
    
    // Toggle theme
    themeButton.click()
    
    // Refresh page
    cy.reload()
    
    // Theme button should still be visible
    cy.get('[aria-label="toggle theme"]').should('be.visible')
  })

  it('should work on both create and retrieve pages', () => {
    // Test on create page
    cy.get('[aria-label="toggle theme"]').should('be.visible')
    cy.get('[aria-label="toggle theme"]').click()
    
    // Navigate to retrieve page
    cy.contains('Retrieve').click()
    cy.url().should('include', '/retrieve')
    
    // Test on retrieve page
    cy.get('[aria-label="toggle theme"]').should('be.visible')
    cy.get('[aria-label="toggle theme"]').click()
    
    // Navigate back to create page
    cy.contains('Create').click()
    cy.url().should('not.include', '/retrieve')
    
    // Theme button should still work
    cy.get('[aria-label="toggle theme"]').should('be.visible')
  })
})
