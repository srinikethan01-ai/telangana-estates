# Telangana Estates

A full-stack real estate platform for Telangana, India — built with:

- **Frontend**: React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Express 5 + MongoDB + Mongoose
- **Monorepo**: pnpm workspaces
- **API**: OpenAPI 3.1 spec with generated Zod schemas and React Query hooks

## Project Structure

```
telangana-estates/
├── artifacts/
│   ├── api-server/          # Express 5 API server (MongoDB + Mongoose)
│   │   ├── src/
│   │   │   ├── lib/         # MongoDB connection, logger
│   │   │   ├── middlewares/ # Express middlewares
│   │   │   ├── models/      # Mongoose models (User, Property, Lead)
│   │   │   └── routes/      # API routes (auth, properties, leads, plans)
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── telangana-estates/   # React + Vite frontend
│       ├── src/
│       │   ├── components/
│       │   │   ├── layout/  # Navbar, Footer
│       │   │   └── ui/      # shadcn/ui components
│       │   ├── hooks/       # Custom hooks (use-auth, use-toast, use-mobile)
│       │   ├── pages/       # Landing, Login, Signup, Dashboard, 404
│       │   ├── lib/         # Utilities
│       │   └── index.css    # Global styles
│       ├── public/          # Static assets (favicon, hero image, og image)
│       ├── index.html
│       ├── vite.config.ts
│       └── tsconfig.json
├── lib/
│   ├── api-spec/            # OpenAPI 3.1 spec (source of truth)
│   ├── api-client-react/    # Generated React Query hooks
│   └── api-zod/             # Generated Zod validation schemas
├── package.json             # Root workspace config
├── pnpm-workspace.yaml      # pnpm workspace definition
├── tsconfig.json            # TypeScript project references
└── tsconfig.base.json       # Shared TypeScript base config
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- MongoDB (local or Atlas)

### Installation

```bash
pnpm install
```

### Environment Variables

Create a `.env` file in `artifacts/api-server/`:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/telangana-estates
JWT_SECRET=your-secret-key
```

### Development

```bash
# Start the API server
pnpm --filter @workspace/api-server run dev

# Start the frontend
pnpm --filter @workspace/telangana-estates run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/healthz | Health check |
| POST   | /api/auth/signup | User registration |
| POST   | /api/auth/login | User login |
| GET    | /api/properties | List properties |
| POST   | /api/properties | Create property |
| GET    | /api/leads | List leads |
| POST   | /api/leads | Create lead |
| GET    | /api/plans | List plans |

## Models

- **User** — Authentication and profile
- **Property** — Real estate listings with location, price, type
- **Lead** — Buyer/renter inquiry tracking
