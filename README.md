## Universal Music Group Code Challenge - Frontend

## Project Functionalities
- Create track metadata by ISRC, consuming the Spring Boot backend.
- Retrieve track metadata by ISRC, consuming the Spring Boot backend.
- Displays the stored cover image.

### Usage
1) Create: enter ISRC on the home page and submit. If found in Spotify, it stores and shows metadata + cover.
2) Retrieve: go to Retrieve tab, enter ISRC, fetch stored metadata + cover.

### Topic - Stack
- Serve & Build App: Vite + React 18 (JavaScript)
- App Routing: React Router v6
- Http Request For The Backend: Axios
- UI Components: Material UI
- Dependencies Management: Node.js 18+
- Global State Management: Zustand
- Testing: Vitest for unit tests, Cypress for end-to-end tests, @testing-library/react for component testing

### Setup
```bash
cd frontend
npm install
# optional: copy env and adjust
copy .env.example .env
```

### Run locally
```bash
npm run dev
# open http://localhost:5173
```

## Testing

### Running Tests

#### Unit Tests (Vitest)

```bash
# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests once with coverage (CI mode)
npm run test:coverage
# After running tests with coverage, you can view detailed reports: View HTML coverage report: open coverage/index.html

```

#### End-to-End Tests (Cypress)

```bash
# Open Cypress Test Runner (interactive)
npm run cypress:open

# Run E2E tests headlessly
npm run test:e2e
```

#### Run All Tests

You can run it in CI/CD pipelines:

```bash
# runs all unit tests with coverage and e2e
npm run test:all
```

### Notes
- Backend is protected by HTTP Basic; credentials are sent via Axios Authorization header.
- Adjust `VITE_API_BASE_URL` or backend CORS settings if needed.

Env vars:
- `VITE_API_BASE_URL` (default `http://localhost:8080`)
- `VITE_BASIC_USER` (default `admin`)
- `VITE_BASIC_PASS` (default `admin123`)

## Support
- (GMAIL) juanpablosernaservices@gmail.com (Colombia)