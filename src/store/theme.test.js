import { describe, it, expect, beforeEach } from 'vitest'
import { useThemeStore } from './theme.js'

describe('Theme Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useThemeStore.setState({ mode: 'light' })
  })

  describe('initial state', () => {
    it('should have light mode as default', () => {
      const state = useThemeStore.getState()
      expect(state.mode).toBe('light')
    })
  })

  describe('toggle function', () => {
    it('should toggle from light to dark mode', () => {
      const { toggle } = useThemeStore.getState()
      
      toggle()
      
      const state = useThemeStore.getState()
      expect(state.mode).toBe('dark')
    })

    it('should toggle from dark to light mode', () => {
      // Set to dark mode first
      useThemeStore.setState({ mode: 'dark' })
      const { toggle } = useThemeStore.getState()
      
      toggle()
      
      const state = useThemeStore.getState()
      expect(state.mode).toBe('light')
    })
  })

  describe('store subscription', () => {
    it('should allow unsubscribing from store', () => {
      const mockSubscriber = vi.fn()
      const unsubscribe = useThemeStore.subscribe(mockSubscriber)
      
      unsubscribe()
      
      const { toggle } = useThemeStore.getState()
      toggle()
      
      expect(mockSubscriber).not.toHaveBeenCalled()
    })
  })
})
