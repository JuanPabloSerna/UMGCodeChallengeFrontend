import axios from 'axios'

// axios instance configured to talk to the backend API with HTTP Basic auth.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
const BASIC_USER = import.meta.env.VITE_BASIC_USER || 'admin'
const BASIC_PASS = import.meta.env.VITE_BASIC_PASS || 'admin123'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: 'Basic ' + btoa(`${BASIC_USER}:${BASIC_PASS}`)
  }
})

// simple logging utilities
const logger = {
  logRequest: (method, url, data = null) => {
    console.log(`API Request: ${method} ${url}`, data)
  },
  
  logResponse: (method, url, response, duration = null) => {
    const message = `API Response: ${method} ${url}`
    if (duration) {
      console.log(`${message} (${duration}ms)`, response)
    } else {
      console.log(message, response)
    }
  },
  
  logError: (method, url, error) => {
    console.error(`API Error: ${method} ${url}`, {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    })
  }
}

export async function createTrack(isrc) {
  const startTime = Date.now()
  
  logger.logRequest('POST', '/api/v1/tracks', { isrc })
  
  try {
    const res = await api.post(`/api/v1/tracks`, null, { params: { isrc } })
    
    const duration = Date.now() - startTime
    logger.logResponse('POST', '/api/v1/tracks', res.data, duration)
    
    return res.data
  } catch (error) {
    logger.logError('POST', '/api/v1/tracks', error)
    throw error
  }
}

export async function getTrackMetadata(isrc) {
  const startTime = Date.now()
  
  logger.logRequest('GET', '/api/v1/tracks', { isrc })
  
  try {
    const res = await api.get(`/api/v1/tracks`, { params: { isrc } })
    
    const duration = Date.now() - startTime
    logger.logResponse('GET', '/api/v1/tracks', res.data, duration)
    
    return res.data
  } catch (error) {
    logger.logError('GET', '/api/v1/tracks', error)
    throw error
  }
}

// builds the cover image URL for a given ISRC to use in <img src>.
export function getCoverUrl(isrc) {
  const url = `${BASE_URL}/api/v1/tracks/cover?isrc=${encodeURIComponent(isrc)}`
  console.log(`Cover URL generated: ${url}`)
  return url
}
