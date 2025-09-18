import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import axios from 'axios'

// Mock axios
vi.mock('axios')
const mockedAxios = vi.mocked(axios)

describe('API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset environment variables
    vi.stubEnv('VITE_API_BASE_URL', 'http://localhost:8080')
    vi.stubEnv('VITE_BASIC_USER', 'admin')
    vi.stubEnv('VITE_BASIC_PASS', 'admin123')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  describe('createTrack', () => {
    it('should make POST request to create track', async () => {
      const mockResponse = { data: { id: 1, name: 'Test Track' } }
      const mockApiInstance = {
        post: vi.fn().mockResolvedValue(mockResponse)
      }
      mockedAxios.create.mockReturnValue(mockApiInstance)

      // Mock console.log to avoid noise in tests
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      // Re-import to get fresh instance
      vi.resetModules()
      const { createTrack } = await import('./client.js')

      const result = await createTrack('USRC17607839')

      expect(mockApiInstance.post).toHaveBeenCalledWith(
        '/api/v1/tracks',
        null,
        { params: { isrc: 'USRC17607839' } }
      )
      expect(result).toEqual(mockResponse.data)
      
      // Verify logging was called
      expect(consoleSpy).toHaveBeenCalledWith('API Request: POST /api/v1/tracks', { isrc: 'USRC17607839' })
      expect(consoleSpy).toHaveBeenCalledWith('API Response: POST /api/v1/tracks', mockResponse.data)
      
      consoleSpy.mockRestore()
    })

    it('should handle errors in createTrack', async () => {
      const mockError = new Error('Network error')
      const mockApiInstance = {
        post: vi.fn().mockRejectedValue(mockError)
      }
      mockedAxios.create.mockReturnValue(mockApiInstance)

      // Mock console methods
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      vi.resetModules()
      const { createTrack } = await import('./client.js')

      await expect(createTrack('USRC17607839')).rejects.toThrow('Network error')
      
      // Verify error logging was called
      expect(consoleErrorSpy).toHaveBeenCalledWith('API Error: POST /api/v1/tracks', {
        message: 'Network error',
        status: undefined,
        data: undefined
      })
      
      consoleSpy.mockRestore()
      consoleErrorSpy.mockRestore()
    })
  })
})
