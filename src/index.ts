/**
 * Entry Point for Blog Application
 * Sets up Express server with middleware and routes
 * Connects to MongoDB and starts listening on specified port
 */
import express from "express";
import compression from "compression";
import dotenv from "dotenv";
import { createServer } from "http";
import path from "path";
import { connectDB } from "./config/db";
import blogRouter from "./routes/blog.route";
import { HttpError } from "./middleware/error.middleware";
import { notFoundMiddleware, errorMiddleware } from "./middleware/error.middleware";

dotenv.config();

const app = express();

app.use(express.json());
app.use(compression());

app.use("/blogs", blogRouter);

const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

app.get("/", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

const server = createServer(app);

const PORT = Number(process.env.PORT) || 5000;


const start = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

app.use(notFoundMiddleware);
app.use(errorMiddleware);

void start();


