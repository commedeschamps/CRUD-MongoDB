import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";

import blogRouter from "./src/routes/blog.route";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(cors({ 
    origin: true, 
    credentials: true 
}));

app.use("/blogs", blogRouter);

app.use(express.json());
app.use("/blogs", blogRouter);

export default app;
