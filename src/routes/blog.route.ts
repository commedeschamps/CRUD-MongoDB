import { Router } from "express";
import * as blogController from "../controllers/blog.controller";

const router = Router();

router.post("/", blogController.createBlog);
router.get("/", blogController.getBlogs);
router.get("/:id", blogController.getBlogById);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

export default router;