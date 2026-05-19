# me-shelf

Personal bookshelf management app built with Next.js, PostgreSQL, and Prisma.

## Features

- Browse books with alphabetical sorting
- Search by title, author, or publisher
- Filter by category
- Edit book details (title, author, publisher, categories)
- Delete books with confirmation
- Light/dark mode support
- CSV backup export

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: PostgreSQL via Prisma 7
- **Deployment**: Vercel

## Setup

```bash
npm install
npx prisma generate
npm run dev
```

## Environment Variables

```
PRISMA_DATABASE_URL=your_postgres_connection_string
```

## API

- `GET /api/books` - Fetch all books
- `POST /api/books` - Create, update, or delete books