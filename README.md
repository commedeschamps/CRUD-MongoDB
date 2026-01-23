# CRUD Blog API 

A clean, minimal CRUD API for a blogging platform built with Node.js, Express, TypeScript, and MongoDB. Includes a lightweight frontend UI for creating, editing, and deleting posts.

> **Live Demo:** [https://crud.commedeschamps.dev/](https://crud.commedeschamps.dev/)

My first TypeScript project, and I'm genuinely excited!

## Features 
- Full CRUD endpoints for blog posts
- MongoDB + Mongoose persistence
- Required field validation (title, body)
- Error handling with clear HTTP status codes
- Custom error middleware for consistent JSON responses
- Simple web UI at `/`

## Tech Stack 

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=white)

## Architecture

```
Request → Routes → Controller → Service → MongoDB
                       ↓
Response ← Controller ← Service ← MongoDB
```

| Layer | Responsibility |
|-------|----------------|
| **Routes** | Map HTTP methods to controllers |
| **Controllers** | Handle HTTP requests, validate input, send responses |
| **Services** | Database operations (data access layer) |
| **Model** | Mongoose schema definition |
| **Middleware** | Error handling, request processing |

## Project Structure 
```
src/
├── config/          # MongoDB connection
├── controllers/     # Route handlers (HTTP logic)
├── middleware/      # Error handling middleware
├── model/           # Mongoose schemas
├── routes/          # Express route definitions
├── services/        # Data access layer (DB operations)
└── public/          # Frontend UI (HTML/CSS/JS)
```

## Getting Started 

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1) Clone the repository
```bash
git clone https://github.com/commedeschamps/CRUD-MongoDB.git
cd CRUD-MongoDB
```

### 2) Install dependencies
```bash
npm install
```

### 3) Configure environment
Create a `.env` file in the project root:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/crud_blog
PORT=5000
```

### 4) Run the server

**Development** (with hot reload):
```bash
npm run dev
```

**Production**:
```bash
npm run build
npm start
```

The API will be available at `http://localhost:5000` and the UI at `/`.

## API Endpoints 

Base URL: `/blogs`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/blogs` | Create a new blog post | `{title, body, author?}` |
| `GET` | `/blogs` | Get all blog posts | - |
| `GET` | `/blogs/:id` | Get a single blog post | - |
| `PUT` | `/blogs/:id` | Update a blog post | `{title, body, author?}` |
| `DELETE` | `/blogs/:id` | Delete a blog post | - |

### Request/Response Examples

**Create a blog post:**
```bash
curl -X POST https://blog-application-h9wy.onrender.com/blogs \
  -H "Content-Type: application/json" \
  -d '{"title": "My First Post", "body": "Hello, world!", "author": "John"}'
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "My First Post",
  "body": "Hello, world!",
  "author": "John",
  "createdAt": "2026-01-15T12:00:00.000Z",
  "updatedAt": "2026-01-15T12:00:00.000Z"
}
```

### Status Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `201` | Created successfully |
| `204` | Deleted successfully (no content) |
| `400` | Bad request (validation error) |
| `404` | Resource not found |
| `500` | Internal server error |

## Blog Schema

| Field | Type | Required | Default |
|-------|------|----------|---------|
| `title` | String | Yes | - |
| `body` | String | Yes | - |
| `author` | String | No | `"Anonymous"` |
| `createdAt` | Date | Auto | - |
| `updatedAt` | Date | Auto | - |

## Deployment

This app is deployed on **Render**.

### Deploy your own:

1. Fork this repository
2. Create a [Render](https://render.com) account
3. Create a new **Web Service** connected to your repo
4. Configure:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Add environment variable:
   - `MONGODB_URI` = your MongoDB Atlas connection string
6. Deploy!

### MongoDB Atlas Setup
1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Go to **Network Access** → Add `0.0.0.0/0` (allow from anywhere)
3. Go to **Database Access** → Create a user
4. Get your connection string and add it to Render environment variables

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with nodemon |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run production server |

## License 
MIT
