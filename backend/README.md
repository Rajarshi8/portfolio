# Portfolio Backend API

Express.js REST API for the portfolio website with MongoDB.

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your values

# Seed the database
npm run seed

# Start development server
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/site` | Site settings (hero, social links) |
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/:id` | Single project by ID/slug |
| GET | `/api/experience` | All experience entries |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/admin/login` | Admin login |
| POST/PUT/DELETE | `/api/admin/*` | Admin CRUD operations |

## Environment Variables

See `.env.example` for all required variables.

## Testing

```bash
npm test
npm run test:watch
```
