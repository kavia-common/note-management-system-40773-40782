# Migration Notes: React to Angular

This app was migrated from a lightweight React template to an Angular application while preserving functionality and improving structure, theming, and environment variable handling.

## How to run

- Install dependencies:
  npm install

- Start dev server (port 3000, same as before):
  npm start
Open http://localhost:3000

- Build:
  npm run build

## Environment mapping

At build/start, `tools/generate-env.mjs` reads `.env` and maps the following variables into Angular `src/environments` files:

- REACT_APP_API_BASE or REACT_APP_BACKEND_URL → environment.apiBaseUrl
- REACT_APP_FRONTEND_URL → environment.frontendUrl
- REACT_APP_WS_URL → environment.wsUrl
- REACT_APP_NODE_ENV → environment.nodeEnv
- REACT_APP_ENABLE_SOURCE_MAPS → use via logs; production source maps are disabled in angular.json by default
- REACT_APP_PORT → dev server remains on 3000 via angular.json
- REACT_APP_LOG_LEVEL → environment.logLevel
- REACT_APP_HEALTHCHECK_PATH → environment.healthcheckPath
- REACT_APP_FEATURE_FLAGS → environment.featureFlags (parsed as JSON)
- REACT_APP_EXPERIMENTS_ENABLED → environment.experimentsEnabled (boolean)

These files are generated:
- src/environments/environment.ts
- src/environments/environment.prod.ts

## Features

- Notes CRUD:
  - List with search/filter (client-side)
  - Create, view, edit, delete
  - API integration if `environment.apiBaseUrl` is set (expects REST at /notes)
  - In-memory fallback when no backend URL is provided

- Accessibility:
  - Keyboard navigation (Enter to open note)
  - Focus styles, ARIA labels on interactive elements
  - Confirm dialog for deletions

- Ocean Professional theme:
  - Colors: primary #2563EB, secondary/success #F59E0B, error #EF4444
  - Background #f9fafb, surface #ffffff, text #111827
  - Subtle gradient header (blue-500/10 to gray-50)
  - Rounded corners, shadows, transitions
  - Implemented in `src/theme/ocean-pro.scss` and consumed globally

## Notes

- Preview continues to run on port 3000.
- React dependencies and files have been replaced by Angular equivalents.
- If backend is not available, the in-memory store keeps the app functional for preview.
