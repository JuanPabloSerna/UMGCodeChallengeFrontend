import { Container, CssBaseline, AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { Routes, Route, Link } from 'react-router-dom'
import SearchPage from './pages/SearchPage.jsx'
import RetrievePage from './pages/RetrievePage.jsx'
import { useThemeStore } from './store/theme.js'
import ErrorBoundary from './components/ErrorBoundary.jsx'

export default function App() {
  const mode = useThemeStore(s => s.mode)
  const toggle = useThemeStore(s => s.toggle)
  const theme = createTheme({ palette: { mode } })
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>Universal Music Group Code Challenge</Typography>
            <Link to="/" style={{ color: 'white', marginRight: 16 }}>Create</Link>
            <Link to="/retrieve" style={{ color: 'white' }}>Retrieve</Link>
            <IconButton color="inherit" onClick={toggle} sx={{ ml: 1 }} aria-label="toggle theme">
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/retrieve" element={<RetrievePage />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
