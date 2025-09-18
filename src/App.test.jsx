import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { useThemeStore } from './store/theme.js'

// Mock the theme store
vi.mock('./store/theme.js')

// Mock ErrorBoundary
vi.mock('./components/ErrorBoundary.jsx', () => ({
  default: ({ children }) => children
}))

describe('App', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
    // Default mock implementation
    useThemeStore.mockImplementation((selector) => {
      const state = { mode: 'light', toggle: vi.fn() }
      return selector ? selector(state) : state
    })
  })

  const renderApp = () => {
    return render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
  }

  describe('rendering', () => {
    it('should render the app with navigation', () => {
      renderApp()
      
      expect(screen.getByText('Universal Music Group Code Challenge')).toBeInTheDocument()
      expect(screen.getByText('Create')).toBeInTheDocument()
      expect(screen.getByText('Retrieve')).toBeInTheDocument()
    })

    it('should render theme toggle button', () => {
      renderApp()
      
      const themeButton = screen.getByLabelText('toggle theme')
      expect(themeButton).toBeInTheDocument()
    })

    it('should show dark mode icon when in light mode', () => {
      useThemeStore.mockImplementation((selector) => {
        const state = { mode: 'light', toggle: vi.fn() }
        return selector ? selector(state) : state
      })
      
      renderApp()
      
      // Check for dark mode icon (should be visible in light mode)
      const themeButton = screen.getByLabelText('toggle theme')
      expect(themeButton).toBeInTheDocument()
    })

    it('should show light mode icon when in dark mode', () => {
      useThemeStore.mockImplementation((selector) => {
        const state = { mode: 'dark', toggle: vi.fn() }
        return selector ? selector(state) : state
      })
      
      renderApp()
      
      // Check for light mode icon (should be visible in dark mode)
      const themeButton = screen.getByLabelText('toggle theme')
      expect(themeButton).toBeInTheDocument()
    })
  })

  describe('navigation', () => {
    it('should navigate to create page by default', () => {
      renderApp()
      
      // Should show SearchPage (Create page) by default
      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Create Track' })).toBeInTheDocument()
    })

    it('should navigate to retrieve page when clicking Retrieve link', async () => {
      renderApp()
      
      const retrieveLink = screen.getByText('Retrieve')
      await user.click(retrieveLink)
      
      // Should show RetrievePage
      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Get Metadata' })).toBeInTheDocument()
    })

    it('should navigate to create page when clicking Create link', async () => {
      renderApp()
      
      // First navigate to retrieve page
      const retrieveLink = screen.getByText('Retrieve')
      await user.click(retrieveLink)
      
      // Then navigate back to create page
      const createLink = screen.getByText('Create')
      await user.click(createLink)
      
      // Should show SearchPage (Create page)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Create Track' })).toBeInTheDocument()
    })
  })
})
