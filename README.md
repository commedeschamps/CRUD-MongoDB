# CRUD Blog API 

A clean, minimal CRUD API for a blogging platform built with Node.js, Express, TypeScript, and MongoDB. Includes a lightweight frontend UI for creating, editing, and deleting posts.
My first TypeScript project, and i'm kinda excited

## Features 
- Full CRUD endpoints for blog posts
- MongoDB + Mongoose persistence
- Required field validation (title, body)
- Error handling with clear HTTP status codes
- Simple web UI at `/`

## Tech Stack 
- ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
- ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)

## Project Structure 
```
src/
  config/          MongoDB connection
  controllers/     Route handlers
  model/           Mongoose schemas
  routes/          Express routes
  services/        Data access layer
  public/          Frontend UI (HTML/CSS/JS)
```

## Getting Started 

### 1) Install dependencies
```
npm install
```

### 2) Configure environment
Create a `.env` file in the project root:
```
MONGODB_URI=mongodb://127.0.0.1:27017/crud_blog
PORT=whatever you want(for example, i used 5000)
```

### 3) Run the server
```
npm start
```

The API will be available at `http://localhost:5000` and the UI at `/`.

## API Endpoints 

Base: `/blogs`

| Method | Endpoint     | Description              |
|--------|--------------|--------------------------|
| POST   | /blogs        | Create a new blog post   |
| GET    | /blogs        | Get all blog posts       |
| GET    | /blogs/:id    | Get a single blog post   |
| PUT    | /blogs/:id    | Update a blog post       |
| DELETE | /blogs/:id    | Delete a blog post       |

### Example Payload
```
{
  "title": "My first post",
  "body": "Hello, world!",
  "author": "Anonymous"
}
```

## Frontend UI 

Open `http://localhost:5000/` to use the built-in UI:
- Create posts
- Edit existing posts
- Delete posts

## Notes 
- `author` defaults to `"Anonymous"` if not provided.
- Validation errors return `400` with a clear message.

## License 
MIT
