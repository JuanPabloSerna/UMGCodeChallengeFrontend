import React from 'react'
import { Box, Typography, Button, Paper } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    const errorId = Date.now().toString()
    this.setState({
      error: error,
      errorInfo: errorInfo,
      errorId: errorId
    })
    
    // Log error for debugging
    console.error('Error Boundary caught an error:', {
      errorId,
      error: error.toString(),
      errorInfo,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    })
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null
    })
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box 
          sx={{ 
            p: 3, 
            textAlign: 'center',
            minHeight: '50vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              maxWidth: 600, 
              width: '100%',
              backgroundColor: 'error.light',
              color: 'error.contrastText'
            }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 64, mb: 2, color: 'error.main' }} />
            
            <Typography variant="h4" gutterBottom>
              ¡Ups! Something went wrong.
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 3 }}>
              An unexpected error has occurred. Please try to reload the page again.
            </Typography>

            {this.state.errorId && (
              <Typography variant="caption" sx={{ mb: 2, display: 'block' }}>
                Error ID: {this.state.errorId}
              </Typography>
            )}

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button 
                variant="contained" 
                onClick={this.handleRetry}
                sx={{ backgroundColor: 'error.main' }}
              >
                Try Again
              </Button>
              
              <Button 
                variant="outlined" 
                onClick={this.handleReload}
                sx={{ borderColor: 'error.main', color: 'error.main' }}
              >
                Reload Page
              </Button>
            </Box>
          </Paper>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
