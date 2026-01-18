# Me API Playground

A full-stack "Me API" with interactive Profile Editing and Search features.

## Features
- **Profile API**: GET, POST, PUT, SEARCH endpoints.
- **Frontend**: React (Vite) with Edit Form and Project Filtering.
- **Database**: MongoDB (Mongoose).

## Setup
### Backend
```bash
cd backend
npm install
npm run seed  # Seeding is CRITICAL for initial data
npm start     # Runs on port 5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev   # Runs on port 5173/5174
```

## API usage
- `GET /api/profile`: Fetch data.
- `PUT /api/profile`: Update data (JSON body).
- `GET /api/search?q=react`: Search.

## Schema
See [schema.md](schema.md) for field definitions.
