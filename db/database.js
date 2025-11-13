

import mongoose from "mongoose";
import dotenv from 'dotenv'


dotenv.config();

export const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected succesfully"); 
    } catch (error) {
        console.log("Error in DB connection", error);
    }
}