import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to MongoDB")
    } catch (e) {
        console.log("Unable to connect to MongoDB")
        console.log(e)
    }
}