# Portfolio Frontend

React SPA for the portfolio website, built with Vite, TypeScript, and Tailwind CSS.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **React Router** - Client-side routing
- **Axios** - API client
- **Lucide React** - Icons

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |
| `npm run typecheck` | TypeScript check |

## Project Structure

```
src/
├── components/       # UI Components
│   ├── Header.tsx    # Navigation bar
│   ├── Hero.tsx      # Hero section
│   ├── Projects.tsx  # Projects grid
│   ├── Experience.tsx # Timeline
│   ├── Skills.tsx    # Skills display
│   ├── Contact.tsx   # Contact form
│   └── Footer.tsx    # Footer
├── hooks/            # Custom hooks
│   ├── useTheme.tsx  # Dark/light mode
│   └── useFetch.ts   # Data fetching
├── lib/
│   └── animations.ts # Framer Motion variants
├── pages/
│   ├── Home.tsx      # Main page
│   └── ProjectDetail.tsx
├── types/
│   └── index.ts      # TypeScript interfaces
├── utils/
│   └── api.ts        # API client
└── styles/
    └── global.css    # Global styles + Tailwind
```

## Environment Variables

```env
VITE_API_URL=http://localhost:5000/api
```

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

Build settings:
- Build Command: `npm run build`
- Output Directory: `dist`

## Customization

### Colors
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: { DEFAULT: '#6244C5' },
      secondary: { DEFAULT: '#FFC448' },
    }
  }
}
```

### Animations
Edit `src/lib/animations.ts` for Framer Motion variants.
