import { Request, Response } from "express";
import mongoose from "mongoose";
import * as blogService from "../services/blog.service";

function isValidId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function createBlog(req: Request, res: Response) {
  try {
    const title = String(req.body.title ?? "").trim();
    const body = String(req.body.body ?? "").trim();
    const author = String(req.body.author ?? "").trim();

    if (!title || !body) {
      return res.status(400).json({ 
        message: "title and body are required" 
      });
    }

    const created = await blogService.createBlog({
      title,
      body,
      author: author || undefined
    });

    return res.status(201).json(created);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: "Failed to create blog" 
    });
  }
}

export async function getBlogs(_req: Request, res: Response) {
  try {
    const blogs = await blogService.getBlogs();
    return res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: "Failed to fetch blogs"
    });
  }
}

export async function getBlogById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    if (!isValidId(id)) {
      return res.status(400).json({ 
        message: "Invalid id" 
      });
    }

    const blog = await blogService.getBlogById(id);
    if (!blog) {
      return res.status(404).json({ 
        message: "Blog not found" 
      });
    }

    return res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: "Failed to fetch blog"
     });
  }
}

export async function updateBlog(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    if (!isValidId(id)) {
      return res.status(400).json({
         message: "Invalid id" 
        });
    }

    const title = String(req.body.title ?? "").trim();
    const body = String(req.body.body ?? "").trim();
    const author = String(req.body.author ?? "").trim();

    if (!title || !body) {
      return res.status(400).json({ message: "title and body are required" });
    }

    const updated = await blogService.updateBlog(id, {
      title,
      body,
      author: author || undefined
    });

    if (!updated) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update blog" });
  }
}

export async function deleteBlog(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    if (!isValidId(id)) {
      return res.status(400).json({ 
        message: "Invalid id" 
      });
    }

    const deleted = await blogService.deleteBlog(id);
    if (!deleted) {
      return res.status(404).json({ 
        message: "Blog not found" 
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: "Failed to delete blog" 
    });
  }
}
