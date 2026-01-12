import mongoose from 'mongoose';

//mongoDB connection
export async function connectDB() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error
        ("Mongo DB URI is not defined in environment variables");
    }
    await
    mongoose.connect(uri ?? "");
    console.log("MongoDB connected");
}