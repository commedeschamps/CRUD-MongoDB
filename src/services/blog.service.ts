/**
 * Blog Service
 * Provides business logic for blog operations
 * Interacts with the Blog model for database access
 */

import { Blog } from "../model/blog";

export type BlogInput = {
  title: string;
  body: string;
  author?: string;
};

export async function createBlog(data: BlogInput) {
  return Blog.create(data);
}

export type BlogFilter = {
  author?: string;
  title?: string;
  body?: string;
};

export async function getBlogs(filter?: BlogFilter) {
  const query: Record<string, unknown> = {};
  
  if (filter?.author) {
    query.author = { $regex: filter.author, $options: 'i' };
  }
  if (filter?.title) {
    query.title = { $regex: filter.title, $options: 'i' };
  }
  if (filter?.body) {
    query.body = { $regex: filter.body, $options: 'i' };
  }
  
  return Blog.find(query).sort({ createdAt: -1 });
}

export async function getBlogById(id: string) {
  return Blog.findById(id);
}

export async function updateBlog(id: string, data: BlogInput) {
  return Blog.findByIdAndUpdate(id, data, { 
    new: true, runValidators: true 
  });
}

export async function deleteBlog(id: string) {
  return Blog.findByIdAndDelete(id);
}
