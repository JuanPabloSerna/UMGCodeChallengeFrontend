import { useState } from 'react'
import { Alert, Box, Button, Stack, TextField } from '@mui/material'
import { createTrack, getCoverUrl } from '../api/client.js'
import TrackCard from '../components/TrackCard.jsx'

/**
 * Page to create a track by ISRC (POST), then displays stored metadata and cover.
 */
export default function SearchPage() {
  const [isrc, setIsrc] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [track, setTrack] = useState(null)
  const [coverUrl, setCoverUrl] = useState()

  async function onSubmit(e) {
    e.preventDefault()
    
    // Validar ISRC
    if (!isrc.trim()) {
      setError('Please enter a valid ISRC')
      return
    }
    
    setError(null)
    setTrack(null)
    setCoverUrl(undefined)
    setLoading(true)
    
    console.log('Starting track creation for ISRC:', isrc)
    
    try {
      const data = await createTrack(isrc.trim())
      console.log('Track created successfully:', data)
      
      setTrack(data)
      setCoverUrl(getCoverUrl(isrc.trim()))
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err.message || 'Error creating track'
      console.error('Track creation failed:', {
        isrc,
        error: err,
        message: errorMessage
      })
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }
  
  const handleClear = () => {
    setIsrc('')
    setError(null)
    setTrack(null)
    setCoverUrl(undefined)
    console.log('SearchPage cleared')
  }

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField 
          label="ISRC" 
          value={isrc} 
          onChange={e => setIsrc(e.target.value)} 
          required 
          fullWidth
          error={!!error}
          helperText={error || 'Enter a valid ISRC code'}
          disabled={loading}
        />
        <Button 
          type="submit" 
          variant="contained" 
          disabled={loading || !isrc.trim()}
          sx={{ minWidth: 140 }}
        >
          {loading ? 'Creating...' : 'Create Track'}
        </Button>
        <Button 
          variant="outlined" 
          onClick={handleClear}
          disabled={loading}
        >
          Clear
        </Button>
      </Stack>
      
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      
      {track && (
        <Box sx={{ mt: 3 }}>
          <TrackCard track={track} coverUrl={coverUrl} />
        </Box>
      )}
    </Box>
  )
}
