# Nova Dhruv Portfolio

Full-stack developer portfolio for Dhruvendra P. Singh / Nova Dhruv.

The project includes a cinematic React frontend, an Express API, and MongoDB storage for contact leads and visitor sessions.

## Stack

- React + Vite
- Framer Motion
- Chart.js
- Howler.js
- React Icons
- Node.js + Express
- MongoDB + Mongoose

## Setup

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Set your MongoDB connection string in `.env`:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/nova_dhruv_portfolio
MONGODB_DB_NAME=nova_dhruv_portfolio
PORT=5000
CLIENT_ORIGIN=http://127.0.0.1:5173
```

You can use a local MongoDB server or a MongoDB Atlas URI.

## Development

Run only the frontend:

```bash
npm run dev
```

Run only the backend API:

```bash
npm run server
```

Run frontend and backend together:

```bash
npm run dev:full
```

The Vite dev server proxies `/api` requests to `http://127.0.0.1:5000`.

## API

Health check:

```http
GET /api/health
```

Save a contact message:

```http
POST /api/messages
```

Body:

```json
{
  "name": "Client Name",
  "email": "client@example.com",
  "phone": "+91...",
  "service": "Portfolio / Landing Page",
  "budget": "Optional",
  "message": "Project details..."
}
```

List latest messages:

```http
GET /api/messages
```

Track a visitor session:

```http
POST /api/visitors
```

View visitor/message summary:

```http
GET /api/visitors/summary
```

## Production

Build the frontend:

```bash
npm run build
```

Start the API:

```bash
NODE_ENV=production npm run server
```

In production mode, Express serves the built `dist` frontend and the API from the same server.
