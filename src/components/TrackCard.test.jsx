import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TrackCard from './TrackCard.jsx'

describe('TrackCard', () => {
  const mockTrack = {
    name: 'Test Song',
    artistName: 'Test Artist',
    albumName: 'Test Album',
    playbackSeconds: 180,
    isExplicit: false
  }

  const mockExplicitTrack = {
    ...mockTrack,
    isExplicit: true
  }

  describe('rendering', () => {
    it('should render track information correctly', () => {
      render(<TrackCard track={mockTrack} />)
      
      expect(screen.getByText('Test Song')).toBeInTheDocument()
      expect(screen.getByText('Test Artist')).toBeInTheDocument()
      expect(screen.getByText('Album: Test Album')).toBeInTheDocument()
      expect(screen.getByText('Seconds: 180')).toBeInTheDocument()
    })

    it('should render with cover image when coverUrl is provided', () => {
      const coverUrl = 'https://example.com/cover.jpg'
      render(<TrackCard track={mockTrack} coverUrl={coverUrl} />)
      
      const image = screen.getByAltText('Test Song')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', coverUrl)
      expect(image).toHaveAttribute('height', '500')
    })

    it('should not render cover image when coverUrl is not provided', () => {
      render(<TrackCard track={mockTrack} />)
      
      const image = screen.queryByAltText('Test Song')
      expect(image).not.toBeInTheDocument()
    })

    it('should not render cover image when coverUrl is null', () => {
      render(<TrackCard track={mockTrack} coverUrl={null} />)
      
      const image = screen.queryByAltText('Test Song')
      expect(image).not.toBeInTheDocument()
    })

    it('should not render cover image when coverUrl is undefined', () => {
      render(<TrackCard track={mockTrack} coverUrl={undefined} />)
      
      const image = screen.queryByAltText('Test Song')
      expect(image).not.toBeInTheDocument()
    })
  })

  describe('explicit content', () => {
    it('should show explicit chip when track is explicit', () => {
      render(<TrackCard track={mockExplicitTrack} />)
      
      expect(screen.getByText('Explicit')).toBeInTheDocument()
    })

    it('should not show explicit chip when track is not explicit', () => {
      render(<TrackCard track={mockTrack} />)
      
      expect(screen.queryByText('Explicit')).not.toBeInTheDocument()
    })
  })

  describe('playback seconds', () => {
    it('should display playback seconds correctly', () => {
      render(<TrackCard track={mockTrack} />)
      
      expect(screen.getByText('Seconds: 180')).toBeInTheDocument()
    })

    it('should handle zero playback seconds', () => {
      const trackWithZeroSeconds = { ...mockTrack, playbackSeconds: 0 }
      render(<TrackCard track={trackWithZeroSeconds} />)
      
      expect(screen.getByText('Seconds: 0')).toBeInTheDocument()
    })

    it('should handle large playback seconds', () => {
      const trackWithLargeSeconds = { ...mockTrack, playbackSeconds: 3600 }
      render(<TrackCard track={trackWithLargeSeconds} />)
      
      expect(screen.getByText('Seconds: 3600')).toBeInTheDocument()
    })
  })

  describe('validation and error handling', () => {
    it('should show error when track is null', () => {
      render(<TrackCard track={null} />)
      
      expect(screen.getByText('Error: No track data provided')).toBeInTheDocument()
    })

    it('should show error when track is undefined', () => {
      render(<TrackCard track={undefined} />)
      
      expect(screen.getByText('Error: No track data provided')).toBeInTheDocument()
    })
  })

  describe('image error handling', () => {
    it('should show error message when image fails to load', async () => {
      const coverUrl = 'https://example.com/invalid.jpg'
      render(<TrackCard track={mockTrack} coverUrl={coverUrl} />)
      
      // Simulate image error
      const image = screen.getByAltText('Test Song')
      fireEvent.error(image)
      
      await waitFor(() => {
        expect(screen.getByText('🖼️ Cover image unavailable')).toBeInTheDocument()
      })
    })
  })
})