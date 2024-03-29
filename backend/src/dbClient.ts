import mongoose from 'mongoose';
import { MongoClientOptions } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();


export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI!, {
        } as MongoClientOptions);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};