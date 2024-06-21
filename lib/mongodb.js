import mongoose from "mongoose";

export const connectMongoDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB")

}