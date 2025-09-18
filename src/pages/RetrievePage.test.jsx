import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import RetrievePage from './RetrievePage.jsx'
import * as apiClient from '../api/client.js'

// Mock the API client
vi.mock('../api/client.js')

describe('RetrievePage', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const renderRetrievePage = () => {
    return render(
      <BrowserRouter>
        <RetrievePage />
      </BrowserRouter>
    )
  }

  describe('initial render', () => {
    it('should render the retrieve form', () => {
      renderRetrievePage()
      
      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Get Metadata' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
    })

    it('should have empty ISRC input initially', () => {
      renderRetrievePage()
      
      const isrcInput = screen.getByRole('textbox')
      expect(isrcInput).toHaveValue('')
    })

    it('should not show error or track initially', () => {
      renderRetrievePage()
      
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      expect(screen.queryByText('Test Song')).not.toBeInTheDocument()
    })
  })

  describe('form interaction', () => {
    it('should update ISRC input when user types', async () => {
      renderRetrievePage()
      
      const isrcInput = screen.getByRole('textbox')
      await user.type(isrcInput, 'USRC17607839')
      
      expect(isrcInput).toHaveValue('USRC17607839')
    })

    it('should clear ISRC input when user clears it', async () => {
      renderRetrievePage()
      
      const isrcInput = screen.getByRole('textbox')
      await user.type(isrcInput, 'USRC17607839')
      await user.clear(isrcInput)
      
      expect(isrcInput).toHaveValue('')
    })

    it('should clear form when Clear button is clicked', async () => {
      renderRetrievePage()
      
      const isrcInput = screen.getByRole('textbox')
      const clearButton = screen.getByRole('button', { name: 'Clear' })
      
      await user.type(isrcInput, 'USRC17607839')
      await user.click(clearButton)
      
      expect(isrcInput).toHaveValue('')
    })
  })

  describe('form submission', () => {
    it('should submit form with valid ISRC', async () => {
      const mockTrack = {
        name: 'Test Song',
        artistName: 'Test Artist',
        albumName: 'Test Album',
        playbackSeconds: 180,
        isExplicit: false
      }
      
      vi.spyOn(apiClient, 'getTrackMetadata').mockResolvedValue(mockTrack)
      vi.spyOn(apiClient, 'getCoverUrl').mockReturnValue('https://example.com/cover.jpg')
      
      renderRetrievePage()
      
      const isrcInput = screen.getByRole('textbox')
      const submitButton = screen.getByRole('button', { name: 'Get Metadata' })
      
      await user.type(isrcInput, 'USRC17607839')
      await user.click(submitButton)
      
      expect(apiClient.getTrackMetadata).toHaveBeenCalledWith('USRC17607839')
      expect(apiClient.getCoverUrl).toHaveBeenCalledWith('USRC17607839')
    })

    it('should show loading state during submission', async () => {
      const mockTrack = {
        name: 'Test Song',
        artistName: 'Test Artist',
        albumName: 'Test Album',
        playbackSeconds: 180,
        isExplicit: false
      }
      
      // Create a promise that we can control
      let resolvePromise
      const promise = new Promise(resolve => {
        resolvePromise = resolve
      })
      
      vi.spyOn(apiClient, 'getTrackMetadata').mockReturnValue(promise)
      
      renderRetrievePage()
      
      const isrcInput = screen.getByRole('textbox')
      const submitButton = screen.getByRole('button', { name: 'Get Metadata' })
      
      await user.type(isrcInput, 'USRC17607839')
      await user.click(submitButton)
      
      // Check loading state
      expect(submitButton).toBeDisabled()
      
      // Resolve the promise
      resolvePromise(mockTrack)
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
      })
    })
  })

  describe('successful track retrieval', () => {
    it('should display track information after successful retrieval', async () => {
      const mockTrack = {
        name: 'Test Song',
        artistName: 'Test Artist',
        albumName: 'Test Album',
        playbackSeconds: 180,
        isExplicit: false
      }
      
      vi.spyOn(apiClient, 'getTrackMetadata').mockResolvedValue(mockTrack)
      vi.spyOn(apiClient, 'getCoverUrl').mockReturnValue('https://example.com/cover.jpg')
      
      renderRetrievePage()
      
      const isrcInput = screen.getByRole('textbox')
      const submitButton = screen.getByRole('button', { name: 'Get Metadata' })
      
      await user.type(isrcInput, 'USRC17607839')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText('Test Song')).toBeInTheDocument()
        expect(screen.getByText('Test Artist')).toBeInTheDocument()
        expect(screen.getByText('Album: Test Album')).toBeInTheDocument()
        expect(screen.getByText('Seconds: 180')).toBeInTheDocument()
      })
    })

    it('should display cover image when available', async () => {
      const mockTrack = {
        name: 'Test Song',
        artistName: 'Test Artist',
        albumName: 'Test Album',
        playbackSeconds: 180,
        isExplicit: false
      }
      
      vi.spyOn(apiClient, 'getTrackMetadata').mockResolvedValue(mockTrack)
      vi.spyOn(apiClient, 'getCoverUrl').mockReturnValue('https://example.com/cover.jpg')
      
      renderRetrievePage()
      
      const isrcInput = screen.getByRole('textbox')
      const submitButton = screen.getByRole('button', { name: 'Get Metadata' })
      
      await user.type(isrcInput, 'USRC17607839')
      await user.click(submitButton)
      
      await waitFor(() => {
        const coverImage = screen.getByAltText('Test Song')
        expect(coverImage).toBeInTheDocument()
        expect(coverImage).toHaveAttribute('src', 'https://example.com/cover.jpg')
      })
    })

    it('should display explicit chip for explicit tracks', async () => {
      const mockTrack = {
        name: 'Explicit Song',
        artistName: 'Explicit Artist',
        albumName: 'Explicit Album',
        playbackSeconds: 180,
        isExplicit: true
      }
      
      vi.spyOn(apiClient, 'getTrackMetadata').mockResolvedValue(mockTrack)
      vi.spyOn(apiClient, 'getCoverUrl').mockReturnValue('https://example.com/cover.jpg')
      
      renderRetrievePage()
      
      const isrcInput = screen.getByRole('textbox')
      const submitButton = screen.getByRole('button', { name: 'Get Metadata' })
      
      await user.type(isrcInput, 'USRC17607839')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText('Explicit')).toBeInTheDocument()
      })
    })
  })

  describe('form validation', () => {
    it('should require ISRC input', () => {
      renderRetrievePage()
      
      const isrcInput = screen.getByRole('textbox')
      expect(isrcInput).toBeRequired()
    })
  })
})
