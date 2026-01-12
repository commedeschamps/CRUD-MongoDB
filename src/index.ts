
import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { createServer } from "http";
import path from "path";
import { connectDB } from "./config/db";
import blogRouter from "./routes/blog.route";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(compression());

app.use(
  cors({
    credentials: true,
    origin: true
  })
);

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
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

void start();

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

