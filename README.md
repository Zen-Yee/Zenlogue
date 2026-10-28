# Zenlogue

A full-stack blog application built with React, Express, and PostgreSQL. This project is my primary learning vehicle for full-stack and AI-integrated web development.

🔗 **Live site:** To be updated

## Tech Stack

**Frontend**
- React (with React Router nested layouts)
- Axios for API requests
- TipTap rich text editor

**Backend**
- Node.js / Express
- PostgreSQL (with `jsonb` columns for rich text storage)
- JWT authentication via HTTP-only cookies

## Features

- **Rich text editing** — TipTap editor with JSON content stored in PostgreSQL `jsonb` columns, rendered via a read-only editor instance or `generateHTML`
- **Authentication** — JWT-based auth using HTTP-only cookies, with a tri-state `AuthContext` and `PrivateRoute` for protected routes
- **Ownership-based authorization** — `requireOwnership` middleware factory to guard update/delete actions
- **Comments** — Cursor-based pagination with infinite scroll via Intersection Observer
- **Reactions** — Like/dislike system using a `post_reactions` junction table and PostgreSQL upsert patterns
- **Full CRUD** — Posts managed through a layered service/controller/middleware backend architecture
- **Theming** — Dark/light theme support via `ThemeContext`

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── api/              # Axios-based API layer (api.js)
│   │   ├── context/          # AuthContext, ThemeContext
│   │   ├── layouts/          # SidebarLayout, FullPageLayout, RootLayout
│   │   ├── components/
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── middleware/           # requireOwnership, auth, etc.
│   ├── routes/
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL (local instance or hosted)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Zen-Yee/Zenlogue.git
cd Zenlogue

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/zenlogue
JWT_SECRET=your-secret-key
PORT=5000
```

### Database Setup

Run the schema migrations/seed scripts (adjust path to match your setup):

```bash
cd server
npm run migrate
```

### Running Locally

```bash
# Start the backend (from /backend)
npm run dev

# Start the frontend (from /frontend)
npm run dev
```

The frontend will be available at `http://localhost:5173` and the API at `http://localhost:3000` by default.

## Deployment

- **Frontend:** deployed on Vercel
- **Backend:** deployed on Render

Update environment variables on each platform to match your production database and secrets before deploying.

## Roadmap

- Ship an AI-integrated feature (planned)
- Continued UI/theming polish
- Expand test coverage

## Contact

- **Email:** qhui.yee@gmail.com
- **GitHub:** [Zen-Yee](https://github.com/Zen-Yee)
- **LinkedIn:** [Qian Hui Yee](https://www.linkedin.com/in/qian-hui-yee-66a394205/)

---

Built with ⚛️ React, Express, and PostgreSQL by Zen.
