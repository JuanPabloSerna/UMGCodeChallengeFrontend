import { Card, CardContent, Typography, CardMedia, Stack, Chip, Alert, Skeleton } from '@mui/material'
import { useState } from 'react'

/**
 * Displays basic track metadata and its cover image when available.
 * Enhanced with error handling and validation.
 */
export default function TrackCard({ track, coverUrl }) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(!!coverUrl)
  
  // Validación de props
  if (!track) {
    console.error('TrackCard: track prop is required')
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error: No track data provided
      </Alert>
    )
  }
  
  if (!track.name || !track.artistName) {
    console.error('TrackCard: incomplete track data', track)
    return (
      <Alert severity="warning" sx={{ mt: 2 }}>
        Error: Incomplete track data. Missing required fields.
      </Alert>
    )
  }
  
  const handleImageLoad = () => {
    setImageLoading(false)
    setImageError(false)
  }
  
  const handleImageError = () => {
    setImageLoading(false)
    setImageError(true)
    console.error('TrackCard: Image failed to load:', coverUrl)
  }
  
  return (
    <Card sx={{ mt: 2 }}>
      
      {coverUrl && !imageError && (
        <CardMedia 
          component="img" 
          height="500" 
          image={coverUrl} 
          alt={track.name}
          onLoad={handleImageLoad}
          onError={handleImageError}
          sx={{
            display: imageLoading ? 'none' : 'block'
          }}
        />
      )}
      

      {imageLoading && (
        <Skeleton 
          variant="rectangular" 
          height={500} 
          animation="wave"
        />
      )}
      

      {imageError && (
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body2" color="text.secondary">
            🖼️ Cover image unavailable
          </Typography>
        </CardContent>
      )}
      
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {track.name || 'Unknown Track'}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {track.artistName || 'Unknown Artist'}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Album: {track.albumName || 'Unknown Album'}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Chip 
            label={`Seconds: ${track.playbackSeconds || 0}`} 
            size="small"
            color="primary"
            variant="outlined"
          />
          {track.isExplicit && (
            <Chip 
              color="error" 
              label="Explicit" 
              size="small"
            />
          )}
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Chip 
            label={`Duration: ${Math.floor((track.playbackSeconds || 0) / 60)}:${String((track.playbackSeconds || 0) % 60).padStart(2, '0')}`}
            size="small"
            variant="outlined"
          />
        </Stack>
      </CardContent>
    </Card>
  )
}
