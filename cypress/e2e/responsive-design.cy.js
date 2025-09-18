describe('Responsive Design', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display correctly on mobile viewport', () => {
    cy.viewport(375, 667) // iPhone SE
    
    // Check that main elements are visible
    cy.contains('Universal Music Group Code Challenge').should('be.visible')
    cy.contains('Create').should('be.visible')
    cy.contains('Retrieve').should('be.visible')
    cy.get('[aria-label="toggle theme"]').should('be.visible')
    
    // Check form elements
    cy.get('input[type="text"]').should('be.visible')
    cy.contains('Create Track').should('be.visible')
  })

  it('should display correctly on tablet viewport', () => {
    cy.viewport(768, 1024) // iPad
    
    // Check that main elements are visible
    cy.contains('Universal Music Group Code Challenge').should('be.visible')
    cy.contains('Create').should('be.visible')
    cy.contains('Retrieve').should('be.visible')
    cy.get('[aria-label="toggle theme"]').should('be.visible')
    
    // Check form elements
    cy.get('input[type="text"]').should('be.visible')
    cy.contains('Create Track').should('be.visible')
  })

  it('should display correctly on desktop viewport', () => {
    cy.viewport(1280, 720) // Desktop
    
    // Check that main elements are visible
    cy.contains('Universal Music Group Code Challenge').should('be.visible')
    cy.contains('Create').should('be.visible')
    cy.contains('Retrieve').should('be.visible')
    cy.get('[aria-label="toggle theme"]').should('be.visible')
    
    // Check form elements
    cy.get('input[type="text"]').should('be.visible')
    cy.contains('Create Track').should('be.visible')
  })

  it('should display correctly on large desktop viewport', () => {
    cy.viewport(1920, 1080) // Large Desktop
    
    // Check that main elements are visible
    cy.contains('Universal Music Group Code Challenge').should('be.visible')
    cy.contains('Create').should('be.visible')
    cy.contains('Retrieve').should('be.visible')
    cy.get('[aria-label="toggle theme"]').should('be.visible')
    
    // Check form elements
    cy.get('input[type="text"]').should('be.visible')
    cy.contains('Create Track').should('be.visible')
  })

  it('should handle navigation on mobile', () => {
    cy.viewport(375, 667) // iPhone SE
    
    // Navigate to retrieve page
    cy.contains('Retrieve').click()
    cy.url().should('include', '/retrieve')
    
    // Check that form is visible and responsive
    cy.get('input[type="text"]').should('be.visible')
    cy.contains('Get Metadata').should('be.visible')
    
    // Navigate back to create page
    cy.contains('Create').click()
    cy.url().should('not.include', '/retrieve')
    
    // Check that form is visible and responsive
    cy.get('input[type="text"]').should('be.visible')
    cy.contains('Create Track').should('be.visible')
  })

  it('should handle theme toggle on different viewports', () => {
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1280, height: 720, name: 'desktop' },
      { width: 1920, height: 1080, name: 'large desktop' }
    ]
    
    viewports.forEach(viewport => {
      cy.viewport(viewport.width, viewport.height)
      
      // Theme toggle should be visible and functional
      cy.get('[aria-label="toggle theme"]').should('be.visible')
      cy.get('[aria-label="toggle theme"]').click()
      cy.get('[aria-label="toggle theme"]').should('be.visible')
    })
  })
})
