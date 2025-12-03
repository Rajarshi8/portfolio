# Portfolio Website - Copilot Instructions

## Project Overview
Full-stack portfolio website for Rajarshi Bhowmik with two implementations:
1. **Legacy Static Site** - Bootstrap 5 + jQuery (root files: `index.html`, `css/`, `js/`)
2. **Modern Full-Stack** - React frontend + Node/Express backend (`frontend/`, `backend/`)

---

## Full-Stack Architecture (Recommended)

### Tech Stack
- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express, TypeScript, MongoDB (Mongoose)
- **Deployment:** Docker, Vercel (frontend), Render/Railway (backend)

### Directory Structure
```
frontend/           # React SPA
├── src/
│   ├── components/ # Hero, Projects, Experience, Skills, Contact, Header, Footer
│   ├── hooks/      # useTheme, useFetch, useInView
│   ├── lib/        # Framer Motion animation presets
│   ├── pages/      # Home, ProjectDetail
│   ├── types/      # TypeScript interfaces
│   └── utils/      # API client (axios)
backend/            # Express REST API
├── src/
│   ├── models/     # Mongoose schemas: Project, Experience, Site, Contact
│   ├── routes/     # /api/site, /api/projects, /api/experience, /api/contact
│   ├── middleware/ # Auth, validation, error handling
│   ├── services/   # Email service (Nodemailer)
│   └── scripts/    # Database seeding
```

### Quick Start (Full-Stack)
```bash
# Backend
cd backend && npm install && cp .env.example .env
npm run seed  # Populate MongoDB with sample data
npm run dev   # http://localhost:5000

# Frontend (separate terminal)
cd frontend && npm install && cp .env.example .env
npm run dev   # http://localhost:5173
```

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/site` | Site settings (hero, social links, skills) |
| GET | `/api/projects` | All projects (`?featured=true` supported) |
| GET | `/api/projects/:slug` | Single project details |
| GET | `/api/experience` | Work, education, achievements |
| POST | `/api/contact` | Contact form (rate-limited, honeypot) |
| `*` | `/api/admin/*` | Admin CRUD (Basic Auth required) |

### Environment Variables
**Backend** (`.env`):
- `MONGODB_URI` - MongoDB connection string
- `CORS_ORIGIN` - Frontend URL for CORS
- `SMTP_*` - Email configuration for contact form
- `ADMIN_USERNAME/PASSWORD` - Admin authentication

**Frontend** (`.env`):
- `VITE_API_URL` - Backend API URL

### Docker Development
```bash
docker-compose -f docker-compose.dev.yml up  # Full stack with hot reload
docker-compose up --build                     # Production build
```

---

## Legacy Static Site

### File Structure
- `index.html` - Single-page with all sections
- `css/style.css` - CSS variables for theming (~788 lines)
- `js/main.js` - jQuery interactions (~211 lines)
- `lib/` - Third-party libraries

### Theming System (CSS Variables)
```css
:root {
    --primary: #6244C5;    /* Purple accent */
    --secondary: #FFC448;  /* Gold accent */
    --bg-color: #FFFFFF;
    --text-color: #12141D;
}

[data-theme="dark"] {
    --primary: #7B68EE;
    --bg-color: #121212;
    --text-color: #FFFFFF;
}
```

**Critical:** Update BOTH `:root` and `[data-theme="dark"]` when modifying colors.

### Section Pattern
```html
<div class="container-xxl py-6" id="section-name">
    <div class="container">
        <div class="row g-5 wow fadeInUp" data-wow-delay="0.1s">
            <!-- content -->
        </div>
    </div>
</div>
```

### Animation Pattern (WOW.js)
```html
<div class="wow fadeInUp" data-wow-delay="0.1s">
```
Delay increments: 0.1s, 0.2s, 0.3s for staggered effects.

---

## Common Tasks

### Adding a Project (Full-Stack)
1. Use admin API: `POST /api/admin/projects` with Basic Auth
2. Or add to seed script in `backend/src/scripts/seed.ts`

### Adding a Project (Legacy)
1. Add video to `videos/` folder
2. Copy `.project-item-vertical` block in `#project` section
3. Update video source, title, description, link

### Modifying Theme Colors
- **Full-Stack:** Edit `frontend/tailwind.config.js` and `frontend/src/styles/global.css`
- **Legacy:** Edit CSS variables in `css/style.css` (both `:root` and `[data-theme="dark"]`)

### Running Tests
```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

---

## CI/CD Pipeline
GitHub Actions workflow (`.github/workflows/ci.yml`):
- Lint & type check on PR
- Run tests with MongoDB service
- Build artifacts
- Deploy to Vercel (frontend) / Render (backend) on main branch push
