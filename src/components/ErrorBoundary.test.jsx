import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ErrorBoundary from './ErrorBoundary.jsx'

// Mock window.location.reload
const mockReload = vi.fn()
Object.defineProperty(window, 'location', {
  value: {
    reload: mockReload
  },
  writable: true
})

// Component that throws an error
const ThrowError = ({ shouldThrow = false, errorMessage = 'Test error' }) => {
  if (shouldThrow) {
    throw new Error(errorMessage)
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  let consoleErrorSpy
  let consoleWarnSpy

  beforeEach(() => {
    // Mock console methods
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    
    // Clear mocks
    vi.clearAllMocks()
    mockReload.mockClear()
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
    consoleWarnSpy.mockRestore()
  })

  describe('normal rendering', () => {
    it('should render children when there is no error', () => {
      render(
        <ErrorBoundary>
          <div>Test content</div>
        </ErrorBoundary>
      )

      expect(screen.getByText('Test content')).toBeInTheDocument()
    })

    it('should render multiple children when there is no error', () => {
      render(
        <ErrorBoundary>
          <div>First child</div>
          <div>Second child</div>
        </ErrorBoundary>
      )

      expect(screen.getByText('First child')).toBeInTheDocument()
      expect(screen.getByText('Second child')).toBeInTheDocument()
    })
  })

  describe('error handling', () => {
    it('should catch errors and display error UI', () => {
      // Suppress React error boundary warnings in tests
      const originalError = console.error
      console.error = vi.fn()

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      // Restore console.error
      console.error = originalError

      expect(screen.getByText('¡Ups! Something went wrong.')).toBeInTheDocument()
      expect(screen.getByText('An unexpected error has occurred. Please try to reload the page again.')).toBeInTheDocument()
    })

    it('should display error icon', () => {
      const originalError = console.error
      console.error = vi.fn()

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      console.error = originalError

      // Check for Material-UI error icon
      const errorIcon = document.querySelector('[data-testid="ErrorOutlineIcon"]') || 
                       document.querySelector('.MuiSvgIcon-root')
      expect(errorIcon).toBeInTheDocument()
    })

    it('should display error ID', () => {
      const originalError = console.error
      console.error = vi.fn()

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      console.error = originalError

      expect(screen.getByText(/Error ID:/)).toBeInTheDocument()
    })
  })

  describe('other cases', () => {
    it('should handle null children', () => {
      render(
        <ErrorBoundary>
          {null}
        </ErrorBoundary>
      )

      // Should not throw and should render nothing
      expect(screen.queryByText('¡Ups! Something went wrong.')).not.toBeInTheDocument()
    })

    it('should handle undefined children', () => {
      render(
        <ErrorBoundary>
          {undefined}
        </ErrorBoundary>
      )

      // Should not throw and should render nothing
      expect(screen.queryByText('¡Ups! Something went wrong.')).not.toBeInTheDocument()
    })

    it('should handle empty children', () => {
      render(
        <ErrorBoundary>
          {[]}
        </ErrorBoundary>
      )

      // Should not throw and should render nothing
      expect(screen.queryByText('¡Ups! Something went wrong.')).not.toBeInTheDocument()
    })
  })
})
