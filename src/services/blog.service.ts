import { Blog } from "../model/blog";

export type BlogInput = {
  title: string;
  body: string;
  author?: string;
};

export async function createBlog(data: BlogInput) {
  return Blog.create(data);
}

export async function getBlogs() {
  return Blog.find().sort({ createdAt: -1 });
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
