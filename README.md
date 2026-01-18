Resume link "https://drive.google.com/file/d/1iGLmWWNDc80Wc10j1F6sQGGypMuYQjiJ/view?usp=sharing"

Me API Playground

A full-stack Me-API that stores your personal profile, projects, skills, and social links with a clean UI and fully queryable backend.

This project follows the Predusk Backend Assessment requirements:

Real database

CRUD APIs

Query endpoints

Minimal UI

Deployment ready

 Features
 Backend (Node.js + Express + MongoDB)

Full Profile CRUD: name, email, education, skills[], projects[], work[], links

Query APIs:

GET /api/projects?skill=python

GET /api/search?q=react

GET /api/skills/top

Health Check:

GET /health → returns 200 OK

Database Schema via Mongoose

Seed script that loads personal data (required before running)

 Frontend (React + Vite)

View full profile

Update profile fields

Add/edit skills, projects, work experience, and social links

Search bar for querying backend data

Project filtering by skill

Fully connected to backend REST API (no mock data)

📁 Project Structure
root
├── backend
│   ├── src
│   │   ├── models
│   │   ├── routes
│   │   └── controllers
│   ├── seed.js
│   └── server.js
├── frontend
│   ├── src
│   │   ├── components
│   │   └── pages
└── README.md

⚙️ Setup Instructions
1. Backend Setup
cd backend
npm install
npm run seed     # IMPORTANT — seeds the database with your real data
npm start        # Server starts on http://localhost:5000

2. Frontend Setup
cd frontend
npm install
npm run dev      # Runs on http://localhost:5173 or 5174

 API Endpoints
Profile
Method	Endpoint	Description
GET	/api/profile	Fetch full profile
POST	/api/profile	Create profile (used for seeding)
PUT	/api/profile	Update profile
Query Endpoints
Method	Endpoint	Description
GET	/api/projects?skill=<skill>	Filter projects by a skill
GET	/api/search?q=<query>	Search across skills, projects, work
GET	/api/skills/top	Get top/most relevant skills
Health Check

GET /health → returns 200 OK
Used for verifying deployment liveness.

🗂 Database Schema

Full schema details are documented here:
📄 schema.md

This includes:

Field descriptions

Projects structure

Skills array

Work experience object format

Social links format

 Deployment Info

Backend deployed URL: [add your link here]

Frontend deployed URL: [add your link here]

Repo link: [add your GitHub repo link]

Resume: [add link]

Make sure to add these before submission.

 Notes

All data is your real profile, not dummy values.

All filtering and searching happens in the backend, not the frontend.

CORS is configured for frontend access.

📄 License

Free to use for interviews, assessments, or learning.
