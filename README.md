# Rajarshi Bhowmik - Portfolio

Personal portfolio website showcasing projects, skills, and professional experience.

**Live Site:** [rajarshibhowmik.me](https://rajarshibhowmik.me)

---

## Overview

This is a full-stack portfolio application with a React frontend and Node.js/Express backend. The architecture separates concerns between presentation and data management, allowing for dynamic content updates without redeploying the frontend.

The frontend is a single-page application that fetches all content from the backend API. The backend includes a fallback data system, meaning it works without a database by serving static JSON data when MongoDB is unavailable.

---

## Architecture

### Frontend (React SPA)

Built with modern React tooling for optimal developer experience and performance:

- **React 18** with functional components and hooks
- **TypeScript** for type safety and better IDE support
- **Vite** as the build tool (faster than Create React App)
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **React Router** for client-side navigation

The frontend consumes the backend API and renders six main sections:
1. Hero - Introduction with typed text animation
2. Projects - Featured work with live demos and source links
3. Experience - Work history, education, achievements, hackathons
4. Skills - Technical competencies grouped by category
5. Contact - Form submission with validation
6. Footer - Social links and navigation

### Backend (Express API)

RESTful API designed for simplicity and reliability:

- **Express.js** with TypeScript
- **MongoDB/Mongoose** for data persistence (optional)
- **Fallback Data System** - Serves static data when database unavailable
- **Rate Limiting** on contact form to prevent spam
- **CORS** configured for frontend origin

The backend exposes these endpoints:

| Endpoint | Purpose |
|----------|---------|
| `GET /api/site` | Site metadata, hero content, social links |
| `GET /api/projects` | All projects with descriptions and links |
| `GET /api/experience` | Work, education, achievements, hackathons |
| `POST /api/contact` | Contact form submission |
| `GET /health` | Server health check |

---

## Project Structure

```
portfolio/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # UI components (Header, Hero, Projects, etc.)
│   │   ├── hooks/            # Custom hooks (useTheme, useFetch)
│   │   ├── lib/              # Animation configurations
│   │   ├── pages/            # Route components
│   │   ├── types/            # TypeScript interfaces
│   │   └── utils/            # API client
│   ├── public/               # Static assets (resume, favicon)
│   └── dist/                 # Production build output
│
├── backend/                  # Express API
│   ├── src/
│   │   ├── data/             # Fallback static data
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API route handlers
│   │   ├── middleware/       # Auth, validation, error handling
│   │   └── services/         # Email service
│   └── dist/                 # Compiled JavaScript
│
├── index.html                # Legacy static site (Bootstrap)
├── css/                      # Legacy styles
├── js/                       # Legacy scripts
└── docker-compose.yml        # Container orchestration
```

---

## Local Development

### Prerequisites

- Node.js 18 or higher
- npm or pnpm
- MongoDB (optional - backend works without it)

### Running the Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The API starts at `http://localhost:5001`. Without MongoDB configured, it automatically serves fallback data.

### Running the Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The app starts at `http://localhost:5173` and proxies API requests to the backend.

### Environment Variables

**Backend** (`.env`):
- `PORT` - Server port (default: 5001)
- `MONGODB_URI` - Database connection string (optional)
- `CORS_ORIGIN` - Allowed frontend origin
- `SMTP_*` - Email configuration for contact form

**Frontend** (`.env`):
- `VITE_API_URL` - Backend API URL

---

## Deployment

### Frontend (Vercel)

The frontend is deployed to Vercel as a static site:

1. Build produces static files in `frontend/dist/`
2. Vercel serves these with proper SPA routing
3. Custom domain configured via Vercel dashboard

Build command: `npm run build`
Output directory: `dist`

### Backend Options

The backend can be deployed to any Node.js hosting:

- **Render** - Free tier available, auto-deploys from GitHub
- **Railway** - Simple deployment with database add-ons
- **Fly.io** - Global edge deployment

For a purely static deployment, the frontend can be built with embedded data, eliminating the need for a running backend.

---

## Customization

### Modifying Content

All portfolio content is defined in `backend/src/data/fallback.ts`:

- **Site Info** - Name, title, bio, social links
- **Projects** - Title, description, tech stack, links
- **Experience** - Work history, education, achievements, hackathons
- **Skills** - Technical skills list

Update this file and rebuild to change content.

### Styling

Theme colors are configured in `frontend/tailwind.config.js`:

```javascript
colors: {
  primary: '#6244C5',    // Purple accent
  secondary: '#FFC448',  // Gold accent
}
```

The site supports dark/light mode with system preference detection.

---

## Tech Stack Summary

| Layer | Technology |
|-------|------------|
| Frontend Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Language | TypeScript |
| Backend | Express.js |
| Database | MongoDB (optional) |
| Deployment | Vercel |

---

## License

MIT License - Feel free to use this as a template for your own portfolio.

---

**Author:** Rajarshi Bhowmik  
**Contact:** [rajarshibhowmik.me](https://rajarshibhowmik.me)
