import mongoose from 'mongoose';

let isConnected = false; // track the connection status

export async function connectMongoDB() {
    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        throw new Error('Could not connect to MongoDB');
    }
}
