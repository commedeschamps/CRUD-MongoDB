import {Schema, model} from 'mongoose';

const blogSchema = new Schema(
    {
    title: {type: String, required: true, trim: true},

    body: {type: String, required: true, trim: true},

    author: {type: String, default: "Anonymous", trim: true},

    },
    {timestamps: true}
);

export const Blog = model('Blog', blogSchema);
