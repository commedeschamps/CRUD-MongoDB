/**
 * Blog Controller
 * Handles HTTP requests for blog operations
 * Uses blog service for business logic
 * Implements error handling and input validation
 */

import { Request, Response } from "express";
import mongoose from "mongoose";
import * as blogService from "../services/blog.service";
import {HttpError} from "../middleware/error.middleware";
function isValidId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function createBlog(req: Request, res: Response) {
  try {
    const title = String(req.body.title ?? "").trim();
    const body = String(req.body.body ?? "").trim();
    const author = String(req.body.author ?? "").trim();

    if (!title || !body) {
      throw new HttpError("title and body are required", 400);
    }

    const created = await blogService.createBlog({
      title,
      body,
      author: author || undefined
    });

    return res.status(201).json(created);
  } catch (error) {
    console.error(error);
    throw new HttpError("Failed to create blog", 500);
  }
}

export async function getBlogs(req: Request, res: Response) {
  try {
    const filter = {
      author: req.query.author as string | undefined,
      title: req.query.title as string | undefined,
      body: req.query.body as string | undefined,
    };
    const blogs = await blogService.getBlogs(filter);
    return res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    throw new HttpError("Failed to fetch blogs", 500);
  }
}

export async function getBlogById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    if (!isValidId(id)) {
      throw new HttpError("Invalid id", 400);
    }

    const blog = await blogService.getBlogById(id);
    if (!blog) {
      throw new HttpError("Blog not found", 404);
    }

    return res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    throw new HttpError("Failed to fetch blog", 500);
  }
}

export async function getBlogByBody(req:Request, res: Response) {
  try {
    const body = req.params.body as string;
    
    const blog = await blogService.getBlogById(body);
    if (!blog) {
      throw new HttpError("Blog not found", 404);
    }
    
    return res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    throw new HttpError("Failed to fetch blog", 500);
  }
}

export async function getBlogByTitle(req: Request, res: Response) {
  try {
    const title = req.params.title as string;

    const blog = await blogService.getBlogById(title);
    if (!blog) {
      throw new HttpError("Blog not found", 404);
    }
    
    return res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    throw new HttpError("Failed to fetch blog", 500);
  }
}

export async function updateBlog(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    if (!isValidId(id)) {
      throw new HttpError("Invalid id", 400);
    }

    const title = String(req.body.title ?? "").trim();
    const body = String(req.body.body ?? "").trim();
    const author = String(req.body.author ?? "").trim();

    if (!title || !body) {
      throw new HttpError("title and body are required", 400);
    }

    const updated = await blogService.updateBlog(id, {
      title,
      body,
      author: author || undefined
    });

    if (!updated) {
      throw new HttpError("Blog not found", 404);
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    throw new HttpError("Failed to update blog", 500);
  }
}

export async function deleteBlog(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    if (!isValidId(id)) {
      throw new HttpError("Invalid id", 400);
    }

    const deleted = await blogService.deleteBlog(id);
    if (!deleted) {
      throw new HttpError("Blog not found", 404);
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    throw new HttpError("Failed to delete blog", 500);
  }
}
